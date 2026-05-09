import requests
import pandas as pd
from datetime import datetime, timedelta
import time

API_KEY = "e920ecf82bea3964fada7d832f3de97e"

cities = {
    "Fes":        (34.0331, -5.0003),
    "Casablanca": (33.5731, -7.5898),
    "Rabat":      (34.0209, -6.8416),
    "Marrakech":  (31.6295, -7.9811)
}

# Générer les timestamps des 5 derniers jours (toutes les heures)
now = datetime.now()
timestamps = []
for hours_ago in range(0, 120, 1):  # 120 heures = 5 jours
    ts = now - timedelta(hours=hours_ago)
    timestamps.append(int(ts.timestamp()))

data = []
total = len(cities) * len(timestamps)
count = 0

for city, (lat, lon) in cities.items():
    print(f"\n📍 Collecte historique pour {city}...")
    
    for ts in timestamps:
        count += 1
        
        # Météo historique
        weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
        
        # Pollution historique
        pollution_url = f"https://api.openweathermap.org/data/2.5/air_pollution/history?lat={lat}&lon={lon}&start={ts}&end={ts+3600}&appid={API_KEY}"
        
        try:
            weather   = requests.get(weather_url).json()
            pollution = requests.get(pollution_url).json()
            
            if "list" in pollution and len(pollution["list"]) > 0:
                row = {
                    "timestamp":   datetime.fromtimestamp(ts),
                    "city":        city,
                    "temperature": weather["main"]["temp"],
                    "humidity":    weather["main"]["humidity"],
                    "pressure":    weather["main"]["pressure"],
                    "wind_speed":  weather["wind"]["speed"],
                    "aqi":         pollution["list"][0]["main"]["aqi"],
                    "pm2_5":       pollution["list"][0]["components"]["pm2_5"]
                }
                data.append(row)
                
                if count % 20 == 0:
                    print(f"   ✅ {count}/{total} collectés...")
                    
        except Exception as e:
            print(f"   ⚠️ Erreur : {e}")
        
        time.sleep(0.2)  # éviter de surcharger l'API

# Sauvegarder
df = pd.DataFrame(data)
df = df.drop_duplicates()
df.to_csv("data/raw_data.csv", index=False)
print(f"\n✅ Terminé ! {len(df)} lignes sauvegardées dans raw_data.csv")
print(df.head(10))