from flask import Flask, request, jsonify
from flask_cors import CORS 
import pickle
import os

app = Flask(__name__)
CORS(app)

# Load trained pipeline (model + vectorizer inside)
model_path = os.path.join(os.path.dirname(__file__), 'spam_classifier.pkl')
with open(model_path, 'rb') as f:
    model = pickle.load(f)

@app.route('/api/spam-detect', methods=['POST'])
def detect_spam():
    data = request.get_json()
    sms_text = data.get('message', '')

    if not sms_text:
        return jsonify({'error': 'No message provided'}), 400

    # Direct prediction using pipeline
    prediction = model.predict([sms_text])[0]

    result = {
        'result': 'Spam' if prediction == 1 else 'Not Spam',
        'hinglish': 'Ye Spam hai!' if prediction == 1 else 'Ye spam nahi hai!'
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5001, debug=True)
