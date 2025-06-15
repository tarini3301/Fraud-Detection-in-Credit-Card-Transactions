from flask import Flask, render_template, request
import pickle
import numpy as np

app = Flask(__name__)
model = pickle.load(open('fraud_xgb_model.pkl', 'rb'))
scaler = pickle.load(open('scaler.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    values = [float(request.form[f'V{i}']) for i in range(1, 29)]
    amount = float(request.form['Amount'])
    amount_scaled = scaler.transform([[amount]])[0][0]
    final_features = np.array(values + [amount_scaled]).reshape(1, -1)
    prediction = model.predict(final_features)
    return render_template('index.html', prediction_text='Fraud' if prediction[0] == 1 else 'Legit')

if __name__ == "__main__":
    app.run(debug=True)
