import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# 1. Charger les données nettoyées
df = pd.read_csv("data/clean_data.csv")

features = ["temperature", "humidity", "pressure", "wind_speed", "city_encoded"]
X = df[features]
y = df["pm2_5"]

# 2. Split global train/test
X_train_global, X_test_global, y_train_global, y_test_global = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 3. Initialiser le modèle global
global_model = LinearRegression()
global_model.fit(X_train_global, y_train_global)  # initialisation
global_coef = global_model.coef_.copy()
global_intercept = global_model.intercept_

print("=" * 50)
print("🌐 SIMULATION FEDERATED LEARNING")
print("=" * 50)

cities = df["city"].unique()
NUM_ROUNDS = 5

for round_num in range(1, NUM_ROUNDS + 1):
    print(f"\n🔄 Round {round_num}/{NUM_ROUNDS}")

    local_coefs = []
    local_intercepts = []
    local_sizes = []

    # 4. Chaque ville entraîne son modèle local
    for city in cities:
        city_data = df[df["city"] == city]
        X_city = city_data[features]
        y_city = city_data["pm2_5"]

        if len(city_data) < 5:
            print(f"   ⚠️ {city} : pas assez de données, ignorée")
            continue

        # Appliquer les paramètres globaux
        local_model = LinearRegression()
        local_model.fit(X_city, y_city)

        local_coefs.append(local_model.coef_)
        local_intercepts.append(local_model.intercept_)
        local_sizes.append(len(city_data))

        print(f"   📍 {city} : {len(city_data)} lignes entraînées")

    # 5. FedAvg : moyenne pondérée des paramètres
    total = sum(local_sizes)
    weights = [s / total for s in local_sizes]

    global_coef = sum(w * c for w, c in zip(weights, local_coefs))
    global_intercept = sum(w * i for w, i in zip(weights, local_intercepts))

    # Mettre à jour le modèle global
    global_model.coef_ = global_coef
    global_model.intercept_ = global_intercept

# 6. Évaluation finale du modèle fédéré
y_pred_fed = global_model.predict(X_test_global)

mae  = mean_absolute_error(y_test_global, y_pred_fed)
rmse = np.sqrt(mean_squared_error(y_test_global, y_pred_fed))
r2   = r2_score(y_test_global, y_pred_fed)

print("\n" + "=" * 50)
print("📊 RÉSULTATS MODÈLE FÉDÉRÉ")
print("=" * 50)
print(f"   MAE  = {mae:.4f}")
print(f"   RMSE = {rmse:.4f}")
print(f"   R²   = {r2:.4f}")

# 7. Comparaison centralisé vs fédéré
centralized_model = LinearRegression()
centralized_model.fit(X_train_global, y_train_global)
y_pred_central = centralized_model.predict(X_test_global)

print("\n📊 COMPARAISON FINALE")
print(f"{'Modèle':<20} {'MAE':>8} {'RMSE':>8} {'R²':>8}")
print("-" * 46)
print(f"{'Centralisé':<20} {mean_absolute_error(y_test_global, y_pred_central):>8.4f} "
      f"{np.sqrt(mean_squared_error(y_test_global, y_pred_central)):>8.4f} "
      f"{r2_score(y_test_global, y_pred_central):>8.4f}")
print(f"{'Fédéré (FedAvg)':<20} {mae:>8.4f} {rmse:>8.4f} {r2:>8.4f}")
print("\n✅ Simulation Federated Learning terminée !")