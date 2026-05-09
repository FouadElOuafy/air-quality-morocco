import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import matplotlib.pyplot as plt
import numpy as np

# 1. Charger les données nettoyées
df = pd.read_csv("data/clean_data.csv")

# 2. Définir les features (X) et la cible (y)
features = ["temperature", "humidity", "pressure", "wind_speed", "city_encoded"]
X = df[features]
y = df["pm2_5"]  # ce qu'on veut prédire

# 3. Découper en 80% train / 20% test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"Train : {len(X_train)} lignes | Test : {len(X_test)} lignes")

# 4. Modèle 1 : Linear Regression
lr = LinearRegression()
lr.fit(X_train, y_train)
y_pred_lr = lr.predict(X_test)

# 5. Modèle 2 : Random Forest
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
y_pred_rf = rf.predict(X_test)

# 6. Évaluation des deux modèles
def evaluate(name, y_test, y_pred):
    mae  = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2   = r2_score(y_test, y_pred)
    print(f"\n📊 {name}")
    print(f"   MAE  = {mae:.4f}")
    print(f"   RMSE = {rmse:.4f}")
    print(f"   R²   = {r2:.4f}")

evaluate("Linear Regression", y_test, y_pred_lr)
evaluate("Random Forest",     y_test, y_pred_rf)

# 7. Graphique : valeurs réelles vs prédites
plt.figure(figsize=(10, 4))

plt.subplot(1, 2, 1)
plt.scatter(y_test, y_pred_lr, color="blue", alpha=0.7)
plt.plot([y.min(), y.max()], [y.min(), y.max()], 'r--')
plt.title("Linear Regression")
plt.xlabel("Réel")
plt.ylabel("Prédit")

plt.subplot(1, 2, 2)
plt.scatter(y_test, y_pred_rf, color="green", alpha=0.7)
plt.plot([y.min(), y.max()], [y.min(), y.max()], 'r--')
plt.title("Random Forest")
plt.xlabel("Réel")
plt.ylabel("Prédit")

plt.tight_layout()
plt.savefig("results/graphs.png")
print("\n✅ Graphique sauvegardé dans results/graphs.png")

import joblib
import os
os.makedirs("models", exist_ok=True)
joblib.dump(rf, 'models/random_forest.pkl')
joblib.dump(lr, 'models/linear_regression.pkl')
print("✅ Modèles sauvegardés !")

plt.show()