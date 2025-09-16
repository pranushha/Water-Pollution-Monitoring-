import pickle
import matplotlib.pyplot as plt
import streamlit as st

# Load trained Prophet model
def load_model():
    with open("prophet_pH_model.pkl", "rb") as f:
        return pickle.load(f)

model = load_model()

# Generate predictions
def predict_pH():
    future = model.make_future_dataframe(periods=7, freq="D")
    forecast = model.predict(future)
    return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(7)

# Streamlit Button
if st.button("🔮 Predict pH for Next 7 Days"):
    forecast_data = predict_pH()
    st.subheader("📋 Forecasted pH Levels")
    st.dataframe(
        forecast_data.style.format({"yhat": "{:.2f}", "yhat_lower": "{:.2f}", "yhat_upper": "{:.2f}"})
    )

    st.subheader("📈 pH Level Forecast Graph")
    fig, ax = plt.subplots(figsize=(10, 5))
    ax.plot(forecast_data["ds"], forecast_data["yhat"], label="Predicted pH", color="blue")
    ax.fill_between(
        forecast_data["ds"], forecast_data["yhat_lower"], forecast_data["yhat_upper"],
        color="skyblue", alpha=0.4, label="Confidence Interval"
    )
    ax.set_xlabel("Date")
    ax.set_ylabel("pH Level")
    ax.legend()
    st.pyplot(fig)
