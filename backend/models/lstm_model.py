import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler

def lstm_forecast(series, n_days=30):
    series = np.array(series).reshape(-1, 1)
    scaler = MinMaxScaler()
    series_scaled = scaler.fit_transform(series)

    X, y = [], []
    for i in range(len(series_scaled) - 10):
        X.append(series_scaled[i:i+10])
        y.append(series_scaled[i+10])
    X, y = np.array(X), np.array(y)

    model = Sequential([
        LSTM(50, activation='relu', return_sequences=True, input_shape=(10, 1)),
        LSTM(50, activation='relu'),
        Dense(1)
    ])
    model.compile(optimizer='adam', loss='mse')
    model.fit(X, y, epochs=10, verbose=0)

    predictions = []
    input_seq = series_scaled[-10:]
    for _ in range(n_days):
        pred = model.predict(input_seq.reshape(1, 10, 1), verbose=0)
        predictions.append(pred[0, 0])
        input_seq = np.append(input_seq[1:], pred).reshape(-1, 1)

    return scaler.inverse_transform(np.array(predictions).reshape(-1, 1)).flatten()
