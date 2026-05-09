import pandas as pd
from sklearn.preprocessing import LabelEncoder, MinMaxScaler

# 1. Charger les données
df = pd.read_csv("data/raw_data.csv")

print(f"Lignes avant nettoyage : {len(df)}")
print("Dataset brut :")
print(df.head())

# 2. Supprimer les doublons
df = df.drop_duplicates()

# 3. Supprimer les valeurs manquantes
df = df.dropna()

print(f"Lignes après nettoyage : {len(df)}")

# 4. Encoder la colonne "city"
encoder = LabelEncoder()
df["city_encoded"] = encoder.fit_transform(df["city"])
print(f"\nEncodage villes : {dict(zip(encoder.classes_, encoder.transform(encoder.classes_)))}")

# 5. Normaliser les features numériques  ← MANQUAIT
scaler = MinMaxScaler()
features = ["temperature", "humidity", "pressure", "wind_speed"]
df[features] = scaler.fit_transform(df[features])

# 6. Sauvegarder
df.to_csv("data/clean_data.csv", index=False)

print("\nDataset nettoyé :")
print(df.head())
print("\nPrétraitement terminé ✅")