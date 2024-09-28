# import pandas as pd
# import numpy as np
# import nltk
# from nltk.tokenize import word_tokenize
# from nltk.stem import PorterStemmer
# from nltk.corpus import stopwords
# from sklearn.feature_extraction.text import CountVectorizer
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import LabelEncoder
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Dense, Dropout
# import joblib
# import string 

# nltk.download('stopwords')
# nltk.download('punkt')

# df = pd.read_csv('data.csv')
# stop_words = set(stopwords.words('english'))
# lemmatizer = nltk.WordNetLemmatizer()

# def preprocess(text):
#     tokens = nltk.word_tokenize(text)
#     tokens = [lemmatizer.lemmatize(token) for token in tokens if token not in stop_words]
#     return ' '.join(tokens)

# df['text'] = df['text'].apply(preprocess)
# vectorizer = CountVectorizer(ngram_range=(1, 3))
# X = vectorizer.fit_transform(df['text']).toarray()
# label_encoder = LabelEncoder()
# y = label_encoder.fit_transform(df['category'])
# y = np.eye(len(np.unique(y)))[y]  # One-hot encode the labels
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=42)

# model = Sequential()
# model.add(Dense(128, input_shape=(X_train.shape[1],), activation='relu'))
# model.add(Dropout(0.3))
# model.add(Dense(64, activation='relu'))
# model.add(Dropout(0.3))
# model.add(Dense(32, activation='relu'))
# model.add(Dropout(0.3))
# model.add(Dense(16, activation='relu'))
# model.add(Dropout(0.3))
# model.add(Dense(y.shape[1], activation='softmax'))

# model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
# model.fit(
#     X_train, y_train,
#     epochs=100,
#     batch_size=20,
#     validation_data=(X_test, y_test)
# )

# model.save('deep_learning_model.h5')
# joblib.dump(vectorizer, 'vectorizer.pkl')
# joblib.dump(label_encoder, 'label_encoder.pkl')




import pandas as pd
import numpy as np
import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import string

nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')

# Load the data
df = pd.read_csv('data.csv')

# Set up the stopwords and lemmatizer
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

# Preprocessing function
def preprocess(text):
    tokens = word_tokenize(text.lower())  # Tokenize and convert to lower case
    tokens = [lemmatizer.lemmatize(token) for token in tokens if token not in stop_words and token not in string.punctuation]
    return ' '.join(tokens)

# Apply preprocessing
df['text'] = df['text'].apply(preprocess)

# Feature extraction using TfidfVectorizer
vectorizer = TfidfVectorizer(ngram_range=(1, 3))
X = vectorizer.fit_transform(df['text']).toarray()

# Label encoding
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(df['category'])
y = np.eye(len(np.unique(y)))[y]  # One-hot encode the labels

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=42)

# Approaches

# Approach 1: Naive Bayes (commented out)
"""
nb_model = MultinomialNB()
nb_model.fit(X_train, np.argmax(y_train, axis=1))
y_pred = nb_model.predict(X_test)
print("Naive Bayes Accuracy: ", accuracy_score(np.argmax(y_test, axis=1), y_pred))

joblib.dump(nb_model, 'naive_bayes_model.pkl')
"""

# Approach 2: Support Vector Machine (commented out)
"""
svm_model = SVC(kernel='linear', probability=True)
svm_model.fit(X_train, np.argmax(y_train, axis=1))
y_pred = svm_model.predict(X_test)
print("SVM Accuracy: ", accuracy_score(np.argmax(y_test, axis=1), y_pred))

joblib.dump(svm_model, 'svm_model.pkl')
"""

# Approach 3: Random Forest (active)
# """
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, np.argmax(y_train, axis=1))
y_pred = rf_model.predict(X_test)
print("Random Forest Accuracy: ", accuracy_score(np.argmax(y_test, axis=1), y_pred))
joblib.dump(rf_model, 'random_forest_model.pkl')
# """

joblib.dump(vectorizer, 'vectorizer.pkl')
joblib.dump(label_encoder, 'label_encoder.pkl')
