import pandas as pd
import numpy as np
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import joblib

nltk.download('stopwords')
nltk.download('punkt')

df = pd.read_csv('chatbot/data.csv')
stop_words = set(stopwords.words('english'))

def preprocess(text):
    tokens = word_tokenize(text.lower())
    tokens = [token for token in tokens if token not in stop_words]
    return ' '.join(tokens)

df['text'] = df['text'].apply(preprocess)
vectorizer = CountVectorizer(ngram_range=(1, 2)) 

X = vectorizer.fit_transform(df['text'])
X = X.toarray()
y = pd.get_dummies(df['category']).values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
num_classes = y.shape[1]

model = Sequential()
model.add(Dense(128, activation='relu', input_shape=(X_train.shape[1],)))
model.add(Dense(64, activation='relu'))
model.add(Dense(num_classes, activation='softmax'))

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=200, batch_size=12, validation_data=(X_test, y_test))

model.save('chatbot/deep_learning_model.h5')
joblib.dump(vectorizer, 'chatbot/vectorizer.pkl')
