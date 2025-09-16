# models/arima.py
from statsmodels.tsa.arima.model import ARIMA

def forecast_arima(data, metric, days=7):
    model = ARIMA(data[metric], order=(1,1,1))
    model_fit = model.fit()
    forecast = model_fit.forecast(steps=days)
    return forecast
