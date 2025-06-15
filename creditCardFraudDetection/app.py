import streamlit as st
import numpy as np
import pickle

# Load model and scaler
model = pickle.load(open("fraud_xgb_model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))

st.title("💳 Credit Card Fraud Detection")

amount = st.number_input("Transaction Amount", min_value=0.01, step=0.01)
hour = st.slider("Hour of the Day", 0, 23)
# Generate dummy values for 28 anonymized features (V1 to V28)
v_features = [st.slider(f"V{i}", -10.0, 10.0, 0.0) for i in range(1, 29)]

if st.button("Check for Fraud"):
    data = np.array(v_features + [scaler.transform([[amount]])[0][0]]).reshape(1, -1)
    prediction = model.predict(data)[0]
    result = "🚨 Fraudulent Transaction" if prediction == 1 else "✅ Legitimate Transaction"
    st.subheader(result)
