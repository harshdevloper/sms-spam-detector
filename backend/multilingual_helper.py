# multilingual_helper.py
from langdetect import detect, DetectorFactory
DetectorFactory.seed = 0  # deterministic results for langdetect

def detect_language(text):
    try:
        lang = detect(text)
    except Exception:
        lang = "unknown"
    return lang

def translate_to_english(text, src_lang):
    # if already english or unknown, return original text
    if src_lang == "en" or src_lang == "unknown":
        return text
    try:
        from deep_translator import GoogleTranslator
        translated = GoogleTranslator(source=src_lang, target='en').translate(text)
        return translated
    except Exception as e:
        # fallback: agar translation fail ho to original text use karo
        print("Translation failed:", e)
        return text
