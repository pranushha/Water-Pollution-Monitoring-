import streamlit as st  
import numpy as np 
import pandas as pd 
import plotly.graph_objects as go 
import plotly.express as px 
from datetime import datetime, timedelta 
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.seasonal import seasonal_decompose 
import matplotlib.pyplot as plt
import pydeck as pdk  
import requests
from streamlit_autorefresh import st_autorefresh
import cohere

# Page Configuration
st.set_page_config(
    layout="wide",
    page_title="Water Quality Dashboard",
    page_icon="💧",
    initial_sidebar_state="expanded"
)
st.markdown(
    """
    <style>
        [data-testid="stToolbar"] {visibility: hidden;}
        header {visibility: hidden;}
    </style>
    """,
    unsafe_allow_html=True
)

# Left Column - Select Location
st.markdown("### 📍 Select Location") 
selected_location = st.selectbox('Choose Location', ['Delhi', 'Varanasi', 'Kolkata'])

# Generate sample water quality data (for live simulation)
date_range = pd.date_range(start="2024-01-01", periods=365, freq='D')
#np.random.seed(42)
temp = np.random.normal(25, 3, len(date_range))  
do = np.random.normal(7, 1, len(date_range))  
ph = np.random.normal(7, 0.5, len(date_range))  
turbidity = np.random.normal(3, 1, len(date_range))  
default_filtered_data = pd.DataFrame({
    'Date': date_range,
    'Temperature (˚C)': temp,
    'D.O. (mg/l)': do,
    'pH': ph,
    'Turbidity (NTU)': turbidity,
}).set_index('Date')

metrics_keys = ['pH', 'Turbidity (NTU)', 'D.O. (mg/l)', 'Temperature (˚C)']

# Tabs: Past, Current, Map
tab_current, tab_past, tab_map = st.tabs(["🟢 Current", "📁 Past", "🗺 Map"])

# -------- PAST TAB --------
with tab_past:
    #np.random.seed(42) 
    st.markdown("### Upload CSV Data")
    uploaded_file = st.file_uploader("Your file", type=["csv"])
    
    if uploaded_file:
        filtered_data = pd.read_csv(uploaded_file, parse_dates=['Date']).set_index('Date')
    else:
        filtered_data = default_filtered_data.copy()

    st.markdown("## 📈 Trend Over Time")
    selected_metric = st.selectbox('Choose Metric for Line Chart', metrics_keys, key="line_chart")
    line_fig = px.line(filtered_data, x=filtered_data.index, y=selected_metric, title=f"{selected_metric} Over Time", height=300)
    st.plotly_chart(line_fig)

    st.markdown("## 🔍 ETS Decomposition")
    decomposition = seasonal_decompose(filtered_data[selected_metric], model='additive', period=30)
    fig, ax = plt.subplots(4, 1, figsize=(6, 6))
    decomposition.observed.plot(ax=ax[0], title='Observed')
    decomposition.trend.plot(ax=ax[1], title='Trend')
    decomposition.seasonal.plot(ax=ax[2], title='Seasonal')
    decomposition.resid.plot(ax=ax[3], title='Residual')
    plt.tight_layout(pad=1.0)
    st.pyplot(fig)

    # ARIMA Predictions function
    def arima_predictions(data, metric, days=7):
        model = ARIMA(data[metric], order=(1, 1, 1))
        model_fit = model.fit()
        forecast = model_fit.forecast(steps=days)
        return forecast

    st.markdown("## 🗓 7-Day Predictions")

    # Empty table placeholder
    predictions_placeholder = st.empty()

    if st.button("Predict", key="predict_button"):
        # Generate predictions
        predictions = {metric: arima_predictions(filtered_data, metric) for metric in metrics_keys}
        prediction_dates = [filtered_data.index[-1] + timedelta(days=i) for i in range(1, 8)]
        predictions_df = pd.DataFrame(predictions, index=prediction_dates)
        predictions_placeholder.table(predictions_df)
    else:
        # Show empty table initially
        predictions_placeholder.table(pd.DataFrame(columns=metrics_keys))


# Report Button
if st.button("Generate Report"):
    report = f"""
    ## Water Quality Report for {selected_location}
    **Latest Metrics:**
    - Temperature: {filtered_data['Temperature (˚C)'].iloc[-1]:.2f}˚C
    - D.O.: {filtered_data['D.O. (mg/l)'].iloc[-1]:.2f} mg/l
    - pH: {filtered_data['pH'].iloc[-1]:.2f}
    - Turbidity: {filtered_data['Turbidity (NTU)'].iloc[-1]:.2f} NTU
    """
    st.download_button(label="Download Report", data=report, file_name="water_quality_report.txt", mime="text/plain")
    st.success("Report generated successfully!")
      

# -------- MAP TAB --------
with tab_map:
    st.markdown("### 🗺 Location Map")
    locations = {'Delhi': [28.7041, 77.1025], 'Varanasi': [25.3176, 82.9739], 'Kolkata': [22.5726, 88.3639]}
    view_state = pdk.ViewState(
        latitude=locations[selected_location][0],
        longitude=locations[selected_location][1],
        zoom=10,
        pitch=30
    )
    layer = pdk.Layer(
        "ScatterplotLayer",
        data=pd.DataFrame([{"latitude": locations[selected_location][0], "longitude": locations[selected_location][1]}]),
        get_position='[longitude, latitude]',
        get_color='[200, 30, 0, 160]',
        get_radius=50000
    )
    r = pdk.Deck(layers=[layer], initial_view_state=view_state, map_style='mapbox://styles/mapbox/light-v10')
    st.pydeck_chart(r)

# -------- CURRENT TAB --------
# -------- CURRENT TAB --------
with tab_current:
    # Initialize live feed state
    if "live_feed_on" not in st.session_state:
        st.session_state.live_feed_on = True

    # Start/Stop button
    if st.button("⏸️ Stop Live Feed" if st.session_state.live_feed_on else "▶️ Start Live Feed"):
        st.session_state.live_feed_on = not st.session_state.live_feed_on

    # Only refresh if live feed is on
    if st.session_state.live_feed_on:
        st_autorefresh(interval=3000, key="live_feed")  # refresh every 3s

    st.markdown("### 📊 Live Water Quality Metrics")

    # Create placeholders for each metric
    cols = st.columns(2)
    gauge_placeholders = {}
    for idx, metric in enumerate(metrics_keys):
        gauge_placeholders[metric] = cols[idx % 2].empty()

    # Update each placeholder with new random values
    for metric in metrics_keys:
        if metric == 'pH':
            value = np.random.normal(7, 0.5)
            max_val = 14
        elif metric == 'Temperature (˚C)':
            value = np.random.normal(25, 3)
            max_val = 40
        elif metric == 'D.O. (mg/l)':
            value = np.random.normal(7, 1)
            max_val = 14
        else:  # Turbidity
            value = np.random.normal(3, 1)
            max_val = 10

        fig = go.Figure(go.Indicator(
            mode="gauge+number",
            value=value,
            number={'font': {'size': 40}},
            gauge={
                'axis': {'range': [0, max_val]},
                'steps': [
                    {'range': [0, max_val*0.5], 'color': '#99d98c'},
                    {'range': [max_val*0.5, max_val*0.75], 'color': '#fcbf49'},
                    {'range': [max_val*0.75, max_val], 'color': '#d62828'}
                ],
            },
            title={'text': f"{metric}", 'font': {'size': 14}},
        ))
        fig.update_layout(height=200, margin=dict(t=40, b=10, l=10, r=10))
        gauge_placeholders[metric].plotly_chart(fig, use_container_width=True)

# Chatbot Integration
st.markdown("### 🤖 AI Chatbot for Water Pollution Awareness")

# Single text input with a unique key
user_query = st.text_input("Ask me anything about water pollution:", key="chatbot_input")

# Initialize Cohere client
COHERE_API_KEY = "2LogJN5ScpiJFslWug0XV9E5TEGVjcfNSgtGeZ35"
co = cohere.Client(COHERE_API_KEY)

# Button to trigger the AI response
if st.button("Ask Chatbot", key="ask_chatbot_button"):
    if user_query:
        try:
            # Use chat_messages (latest SDK)
            chat_messages = [
                {"role": "system", "content": "You are an environmental scientist helping people understand water pollution and its effects."},
                {"role": "user", "content": user_query}
            ]
            
            response = co.chat(
                model="command-xlarge-nightly",
                chat_messages=chat_messages,
                max_output_tokens=150
            )

            # Extract AI reply
            answer = response.choices[0].message["content"]
            st.markdown(f"**Chatbot:** {answer}")

        except Exception as e:
            st.error(f"An error occurred: {e}")


    # Twilio Alerts UI Element
    st.markdown("### 🚨 Twilio Alerts")
    st.markdown(
        "<div style='background-color: #ffffff; border: 1px solid #e0e0e0; "
        "box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); padding: 10px; border-radius: 8px;'>"
        "<strong style='color: black;'>Stay Informed!</strong> "
        "<span style='color: black;'>Receive real-time water quality alerts on your phone.</span>"
        "</div>",
        unsafe_allow_html=True
    )

    # Report Button (for Current tab as well)
    if st.button("Generate Report", key="report_current"):
        report = f"""
        ## Water Quality Report for {selected_location}
        **Latest Metrics:**
        - Temperature: {filtered_data['Temperature (˚C)'].iloc[-1]:.2f}˚C
        - D.O.: {filtered_data['D.O. (mg/l)'].iloc[-1]:.2f} mg/l
        - pH: {filtered_data['pH'].iloc[-1]:.2f}
        - Turbidity: {filtered_data['Turbidity (NTU)'].iloc[-1]:.2f} NTU
        """
        st.download_button(label="Download Report", data=report, file_name="water_quality_report.txt", mime="text/plain")
        st.success("Report generated successfully!")