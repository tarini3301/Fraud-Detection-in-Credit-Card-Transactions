# app.py (Streamlit)
import streamlit as st
import pandas as pd
import joblib

model = joblib.load("fraud_model.pkl")

st.title("💳 Credit Card Fraud Detector")

amount = st.number_input("Transaction Amount")
oldbalanceOrg = st.number_input("Old Balance (Sender)")
newbalanceOrig = st.number_input("New Balance (Sender)")
oldbalanceDest = st.number_input("Old Balance (Receiver)")
newbalanceDest = st.number_input("New Balance (Receiver)")
type = st.selectbox("Transaction Type", ["CASH_OUT", "TRANSFER", "PAYMENT", "DEBIT", "CASH_IN"])

# One-hot encode
transaction_type = {
    "type_CASH_OUT": int(type == "CASH_OUT"),
    "type_TRANSFER": int(type == "TRANSFER"),
    "type_PAYMENT": int(type == "PAYMENT"),
    "type_DEBIT": int(type == "DEBIT"),
    "type_CASH_IN": int(type == "CASH_IN"),
}

input_data = pd.DataFrame([{
    "amount": amount,
    "oldbalanceOrg": oldbalanceOrg,
    "newbalanceOrig": newbalanceOrig,
    "oldbalanceDest": oldbalanceDest,
    "newbalanceDest": newbalanceDest,
    **transaction_type
}])

if st.button("Check Transaction"):
    result = model.predict(input_data)[0]
    st.success("🚨 Fraudulent!" if result else "✅ Legit Transaction")

import joblib

# Load the trained model
model = joblib.load('fraud_model.pkl')
