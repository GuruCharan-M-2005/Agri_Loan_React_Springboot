from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
from tensorflow.keras.models import load_model
from sklearn.feature_extraction.text import CountVectorizer
import nltk
from nltk.corpus import stopwords

nltk.download('stopwords')
nltk.download('punkt')

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

model = load_model('chatbot/deep_learning_model.h5')
vectorizer = joblib.load('chatbot/vectorizer.pkl')

responses = {
    0: "To apply for an agricultural loan, visit our website or contact your local bank.",
    1: "Eligibility criteria include having a stable income and owning agricultural land.",
    2: "Interest rates for machinery loans vary based on the type of machinery.",
    3: "Yes, loans are available for organic farming initiatives.",
    4: "Repayment can be done through monthly installments or as a lump sum.",
    5: "Crop loans are designed to finance various crop-related expenses, such as seeds, fertilizers, and irrigation.",
    6: "To apply for a gold loan, visit our website or contact your local bank. Ensure you have your gold and necessary documents ready.",
    7: "Credit loans offer flexible repayment options and can be used for various purposes, including personal and business needs.",
    8: "Machinery loans help you purchase or upgrade agricultural machinery. Interest rates vary based on the type of machinery.",
    9: "You can track your repayment schedule through the loan tracker in your account dashboard. It will show upcoming and past payments.",
    10: "Your profile information includes your email, username, mobile number, and the date and time of joining.",
    11: "You can view your current loan applications in the 'My Applications' section, including their status and details.",
    12: "To edit a user's details, go to the Users tab, select the user, click 'Edit', and update the information. Save the changes when you're done.",
    13: "To delete a user account, go to the Users tab, select the user you wish to delete, click 'Delete', and confirm the action.",
    14: "To view all user applications, go to the Application tab where you can see a list of all applications submitted by users.",
    15: "To see the repayment schedule for all applications, go to the Repayment Schedule tab where you will find a detailed schedule for every application."
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
    
    processed_input = preprocess(user_input)
    
    if not processed_input.strip():
        return jsonify({'response': "Sorry, I didn't understand your question."})
    
    try:
        input_vector = vectorizer.transform([processed_input])
    except Exception as e:
        return jsonify({'response': f"Error in vectorizing input: {e}"})

    input_vector = input_vector.toarray()

    try:
        prediction = model.predict(input_vector)
        predicted_category = np.argmax(prediction, axis=1)[0]
    except Exception as e:
        return jsonify({'response': f"Error in model prediction: {e}"})
    
    response_message = responses.get(predicted_category, "Sorry, I didn't understand your question.")
    
    return jsonify({'response': response_message})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
