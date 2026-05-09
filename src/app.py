from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)
CORS(app)

# Charger les modèles
rf_model = joblib.load("models/random_forest.pkl")
lr_model = joblib.load("models/linear_regression.pkl")

# Recréer le scaler avec les données d'entraînement
df = pd.read_csv("data/raw_data.csv")
scaler = MinMaxScaler()
scaler.fit(df[["temperature", "humidity", "pressure", "wind_speed"]])

CITY_ENCODING = {
    "Casablanca": 0,
    "Fes":        1,
    "Marrakech":  2,
    "Rabat":      3
}

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    city     = data["city"]
    temp     = float(data["temperature"])
    hum      = float(data["humidity"])
    pres     = float(data["pressure"])
    wind     = float(data["wind_speed"])
    city_enc = CITY_ENCODING.get(city, 0)

    # Normaliser exactement comme dans preprocess.py
    scaled = scaler.transform([[temp, hum, pres, wind]])[0]

    features = np.array([[scaled[0], scaled[1], scaled[2], scaled[3], city_enc]])

    pred_rf = rf_model.predict(features)[0]
    pred_lr = lr_model.predict(features)[0]

    # Niveau de qualité
    def get_level(pm25):
        if pm25 <= 2:  return "Bon"
        if pm25 <= 4:  return "Modéré"
        if pm25 <= 7:  return "Mauvais"
        return "Dangereux"

    return jsonify({
        "city":                    city,
        "pm2_5_random_forest":     round(float(pred_rf), 2),
        "pm2_5_linear_regression": round(float(pred_lr), 2),
        "level":                   get_level(pred_rf),
        "status":                  "success"
    })

@app.route("/cities", methods=["GET"])
def cities():
    # Retourne les stats réelles de chaque ville
    df_clean = pd.read_csv("data/clean_data.csv")
    result = []
    for city in ["Fes", "Casablanca", "Rabat", "Marrakech"]:
        city_data = df_clean[df_clean["city"] == city]["pm2_5"]
        result.append({
            "city":    city,
            "avg":     round(city_data.mean(), 2),
            "min":     round(city_data.min(), 2),
            "max":     round(city_data.max(), 2),
        })
    return jsonify(result)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "API is running"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)