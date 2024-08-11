from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
from tensorflow.keras.models import load_model
from sklearn.feature_extraction.text import CountVectorizer
import nltk
from nltk.corpus import stopwords

# Ensure NLTK stopwords are downloaded
nltk.download('stopwords')
nltk.download('punkt')

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Load the model and CountVectorizer
model = load_model('chatbot/deep_learning_model.h5')
vectorizer = joblib.load('chatbot/vectorizer.pkl')

# Define responses
responses = {
    0: "To apply for an agricultural loan, visit our website or contact your local bank.",
    1: "Eligibility criteria include having a stable income and owning agricultural land.",
    2: "Interest rates for machinery loans vary based on the type of machinery.",
    3: "Yes, loans are available for organic farming initiatives.",
    4: "Repayment can be done through monthly installments or as a lump sum."
}

def preprocess(text):
    tokens = nltk.word_tokenize(text.lower())
    lemmatizer = nltk.WordNetLemmatizer()
    stop_words = set(stopwords.words('english'))
    tokens = [lemmatizer.lemmatize(token) for token in tokens if token not in stop_words]
    return ' '.join(tokens)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    
    if not user_input:
        return jsonify({'response': "Sorry, I didn't understand your question."})
    
    # Preprocess and vectorize user input
    processed_input = preprocess(user_input)
    
    if not processed_input.strip():
        return jsonify({'response': "Sorry, I didn't understand your question."})
    
    # Transform text using CountVectorizer
    try:
        input_vector = vectorizer.transform([processed_input])
    except Exception as e:
        return jsonify({'response': f"Error in vectorizing input: {e}"})
    
    # Ensure the input_vector is in the right shape
    input_vector = input_vector.toarray()
    
    # Predict the category
    try:
        prediction = model.predict(input_vector)
        predicted_category = np.argmax(prediction, axis=1)[0]
    except Exception as e:
        return jsonify({'response': f"Error in model prediction: {e}"})
    
    # Provide the response based on prediction
    response_message = responses.get(predicted_category, "Sorry, I didn't understand your question.")
    
    return jsonify({'response': response_message})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
