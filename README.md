# 🌍 Air Quality Prediction in Moroccan Cities

![Python](https://img.shields.io/badge/Python-3.11-blue)
![Flask](https://img.shields.io/badge/Flask-API-green)
![React](https://img.shields.io/badge/React-Vite-61dafb)
![ML](https://img.shields.io/badge/ML-scikit--learn-orange)

## 📋 Description

Application web Full Stack de prédiction de la qualité de l'air (PM2.5)
dans les villes marocaines, utilisant le Machine Learning et des données
météo réelles collectées via l'API OpenWeatherMap.

## 🏗️ Architecture
Frontend (React) ←→ Backend (Flask API) ←→ Modèles ML (.pkl)
↕
OpenWeatherMap API

## 🛠️ Technologies

| Composant | Technologie |
|-----------|-------------|
| Frontend | React + Vite + Recharts |
| Backend | Flask + Flask-CORS |
| ML | scikit-learn (Random Forest, Linear Regression) |
| Data | pandas, numpy, MinMaxScaler |
| API | OpenWeatherMap |

## 📊 Modèles ML

| Modèle | MAE | RMSE | R² |
|--------|-----|------|----|
| Random Forest | 1.09 | 1.62 | 0.45 |
| Linear Regression | 1.09 | 1.62 | 0.46 |

## 🗂️ Structure du projet
air-quality-project/
├── data/
│   ├── raw_data.csv        # Données brutes (480 lignes)
│   └── clean_data.csv      # Données nettoyées
├── models/
│   ├── random_forest.pkl
│   └── linear_regression.pkl
├── notebooks/
│   └── analysis.ipynb      # Analyse exploratoire
├── results/
│   └── graphs.png
├── src/
│   ├── collect_data.py     # Collecte API OpenWeatherMap
│   ├── preprocess.py       # Nettoyage et normalisation
│   ├── train_model.py      # Entraînement ML
│   ├── federated.py        # Simulation Federated Learning
│   └── app.py              # API Flask
├── frontend/
│   └── src/
│       ├── App.jsx
│       └── components/
│           ├── PredictionForm.jsx
│           ├── ResultCard.jsx
│           └── Dashboard.jsx
└── README.md

## 🚀 Installation et lancement

### Prérequis
- Python 3.11+
- Node.js 18+

### Backend (Flask)
```bash
# Créer environnement virtuel
python -m venv venv
.\venv\Scripts\Activate.ps1  # Windows
source venv/bin/activate      # Linux/Mac

# Installer dépendances
pip install flask flask-cors scikit-learn pandas numpy joblib requests

# Lancer l'API
python src/app.py
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

### Accès
- 🌐 Application : http://localhost:5173
- 🔌 API Flask : http://localhost:5000

## 📡 API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/predict` | Prédire PM2.5 |
| GET | `/cities` | Stats par ville |
| GET | `/health` | Statut API |

### Exemple de requête
```json
POST /predict
{
  "city": "Marrakech",
  "temperature": 21,
  "humidity": 52,
  "pressure": 1008,
  "wind_speed": 1.54
}
```

### Réponse
```json
{
  "city": "Marrakech",
  "pm2_5_random_forest": 5.82,
  "pm2_5_linear_regression": 5.92,
  "level": "Mauvais",
  "status": "success"
}
```

## 🏙️ Villes supportées

| Ville | Moyenne PM2.5 | Niveau |
|-------|--------------|--------|
| Fès | 3.27 µg/m³ | 🟡 Modéré |
| Casablanca | 3.44 µg/m³ | 🟡 Modéré |
| Rabat | 3.37 µg/m³ | 🟡 Modéré |
| Marrakech | 6.09 µg/m³ | 🟠 Mauvais |

## 👤 Auteur

**Fouad El-Ouafy**
🔗 [GitHub](https://github.com/FouadElOuafy)

---

## 📄 Licence

Ce projet est open source — [MIT License](LICENSE)

Projet réalisé dans le cadre d'un cours de Machine Learning.