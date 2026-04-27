# spam_api.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os
from langdetect import detect, DetectorFactory

# Make langdetect deterministic
DetectorFactory.seed = 0

app = Flask(__name__)

# Keep Flask CORS simple in production so a bad env value cannot break startup.
# The frontend sends bearer tokens and JSON bodies, so credentials are not required here.
CORS(app, resources={r"/*": {"origins": "*"}})

# Load trained pipeline (assumes pipeline: vectorizer + model)
model_path = os.path.join(os.path.dirname(__file__), "spam_classifier.pkl")
with open(model_path, "rb") as f:
    model = pickle.load(f)


@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "service": "spam-api"}), 200

def safe_detect_language(text):
    """
    Detect language of short text. Returns language code like 'en', 'hi', 'es'.
    If detection fails, returns 'unknown'.
    """
    try:
        lang = detect(text)
        return lang
    except Exception:
        return "unknown"

def translate_to_english(text, src_lang):
    """
    Translate text to English if src_lang != 'en' and not 'unknown'.
    Uses deep_translator.GoogleTranslator; on failure returns original text.
    """
    if not text:
        return text
    if src_lang == "en" or src_lang == "unknown":
        return text

    try:
        from deep_translator import GoogleTranslator
        translated = GoogleTranslator(source=src_lang, target="en").translate(text)
        return translated
    except Exception as e:
        # Translation failed (rate limit, network, unsupported lang, etc.)
        app.logger.warning(f"Translation failed ({e}). Returning original text.")
        return text

@app.route("/api/spam-detect", methods=["POST"])
def detect_spam():
    data = request.get_json(force=True, silent=True) or {}
    sms_text = data.get("message", "")
    if not sms_text:
        return jsonify({"error": "No message provided"}), 400

    # 1) Detect language
    lang = safe_detect_language(sms_text)

    # 2) Translate if needed
    text_for_model = translate_to_english(sms_text, lang)

    # 3) Predict using your pipeline
    try:
        prediction_raw = model.predict([text_for_model])[0]
    except Exception as e:
        app.logger.error(f"Prediction failed: {e}")
        return jsonify({"error": "Prediction failed", "details": str(e)}), 500

    # 4) Try to get probability/confidence if available
    prob = None
    try:
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba([text_for_model])
            # maximum class probability
            prob = float(max(probs[0]))
    except Exception as e:
        app.logger.warning(f"predict_proba failed or not available: {e}")
        prob = None

    # Map label (assume model uses numeric labels 1=spam, 0=ham). Adjust if different.
    try:
        if isinstance(prediction_raw, (int, float)):
            label = "Spam" if int(prediction_raw) == 1 else "Not Spam"
        else:
            # If model returns string labels like 'spam'/'ham'
            p_lower = str(prediction_raw).lower()
            if p_lower in ("spam", "1", "true", "yes"):
                label = "Spam"
            else:
                label = "Not Spam"
    except Exception:
        label = str(prediction_raw)

    result = {
        "original_text": sms_text,
        "language": lang,
        "translated_text": text_for_model,
        "prediction": label,
        "probability": prob,
        # a quick localized message for hinglish/hindi convenience
        "hinglish": "Ye Spam hai!" if label == "Spam" else "Ye spam nahi hai!"
    }

    return jsonify(result), 200

if __name__ == "__main__":
    port = int(os.getenv("PORT", "5001"))
    debug = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    app.run(host="0.0.0.0", port=port, debug=debug)
