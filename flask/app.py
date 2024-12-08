from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LinearRegression
import joblib

# Initialize Flask app
app = Flask(__name__)

# Load trained model
model = joblib.load('temperature_model.pkl')
# Define LabelEncoders and fit with the categories used during training
label_encoder_summary = LabelEncoder()
label_encoder_summary.fit([
   "Partly Cloudy",
    "Mostly Cloudy",
    "Overcast",
    "Foggy",
    "Breezy and Mostly Cloudy",
    "Clear",
    "Breezy and Partly Cloudy",
    "Breezy and Overcast",
    "Humid and Mostly Cloudy",
    "Humid and Partly Cloudy",
    "Windy and Foggy",
    "Windy and Overcast",
    "Breezy and Foggy",
    "Windy and Partly Cloudy",
    "Breezy",
    "Dry and Partly Cloudy",
    "Windy and Mostly Cloudy",
    "Dangerously Windy and Partly Cloudy",
    "Dry",
    "Windy",
    "Humid and Overcast",
    "Light Rain",
    "Drizzle",
    "Windy and Dry",
    "Dry and Mostly Cloudy",
    "Breezy and Dry",
    "Rain",
    ])  # Replace with your actual categories

label_encoder_precipType = LabelEncoder()
label_encoder_precipType.fit(["rain", "snow"])  # Replace with your actual categories

@app.route('/predict', methods=['POST'])
def predict():
    # Get input data from frontend
    input_data = request.json
    print("Data received from Node.js:", input_data)

    features = pd.DataFrame([input_data])
    
    try:
        features.rename(columns={
            'apparentTemperature': 'Apparent Temperature (C)',
            'humidity': 'Humidity',
            'windSpeed': 'Wind Speed (km/h)',
            'windBearing': 'Wind Bearing (degrees)',
            'visibility': 'Visibility (km)',
            'pressure': 'Pressure (millibars)',
            'summary': 'Summary',
            'precipType': 'Precip Type'
        }, inplace=True)


        # Ensure correct data types
        features['Apparent Temperature (C)'] = features['Apparent Temperature (C)'].astype(float)
        features['Humidity'] = features['Humidity'].astype(float)
        features['Wind Speed (km/h)'] = features['Wind Speed (km/h)'].astype(float)
        features['Wind Bearing (degrees)'] = features['Wind Bearing (degrees)'].astype(float)
        features['Visibility (km)'] = features['Visibility (km)'].astype(float)
        features['Pressure (millibars)'] = features['Pressure (millibars)'].astype(float)

        # Encode categorical variables
        features['Summary'] = label_encoder_summary.transform(features['Summary'])
        features['Precip Type'] = label_encoder_precipType.transform(features['Precip Type'])

        
        # Make prediction
        prediction = model.predict(features)
        print(prediction[0])

        return jsonify({'predicted_temperature': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
