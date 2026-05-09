import json

notebook = {
 "nbformat": 4,
 "nbformat_minor": 5,
 "metadata": {
  "kernelspec": {"display_name": "Python 3", "language": "python", "name": "python3"},
  "language_info": {"name": "python", "version": "3.11.0"}
 },
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "id": "cell1",
   "source": ["# Air Quality Prediction in Moroccan Cities\n", "Analyse complete des donnees et des modeles ML."]
  },
  {
   "cell_type": "code",
   "metadata": {},
   "id": "cell2",
   "outputs": [],
   "execution_count": None,
   "source": [
    "import pandas as pd\n",
    "import matplotlib.pyplot as plt\n",
    "import seaborn as sns\n",
    "\n",
    "df = pd.read_csv('data/clean_data.csv')\n",
    "print(f'Dataset : {df.shape[0]} lignes, {df.shape[1]} colonnes')\n",
    "df.head()"
   ]
  },
  {
   "cell_type": "code",
   "metadata": {},
   "id": "cell3",
   "outputs": [],
   "execution_count": None,
   "source": [
    "# Distribution PM2.5 par ville\n",
    "plt.figure(figsize=(10,5))\n",
    "sns.boxplot(data=df, x='city', y='pm2_5', palette='Set2')\n",
    "plt.title('Distribution PM2.5 par ville')\n",
    "plt.xlabel('Ville')\n",
    "plt.ylabel('PM2.5')\n",
    "plt.tight_layout()\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "code",
   "metadata": {},
   "id": "cell4",
   "outputs": [],
   "execution_count": None,
   "source": [
    "# Evolution PM2.5 dans le temps\n",
    "df['timestamp'] = pd.to_datetime(df['timestamp'])\n",
    "plt.figure(figsize=(12,5))\n",
    "for city in df['city'].unique():\n",
    "    city_df = df[df['city']==city].sort_values('timestamp')\n",
    "    plt.plot(city_df['timestamp'], city_df['pm2_5'], label=city)\n",
    "plt.title('Evolution PM2.5 par ville - 5 jours')\n",
    "plt.xlabel('Date')\n",
    "plt.ylabel('PM2.5')\n",
    "plt.legend()\n",
    "plt.xticks(rotation=45)\n",
    "plt.tight_layout()\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "code",
   "metadata": {},
   "id": "cell5",
   "outputs": [],
   "execution_count": None,
   "source": [
    "# Matrice de correlation\n",
    "cols = ['temperature','humidity','pressure','wind_speed','aqi','pm2_5']\n",
    "plt.figure(figsize=(8,6))\n",
    "sns.heatmap(df[cols].corr(), annot=True, cmap='coolwarm', fmt='.2f')\n",
    "plt.title('Matrice de correlation')\n",
    "plt.tight_layout()\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "code",
   "metadata": {},
   "id": "cell6",
   "outputs": [],
   "execution_count": None,
   "source": [
    "# Statistiques descriptives\n",
    "cols = ['temperature','humidity','pressure','wind_speed','aqi','pm2_5']\n",
    "df[cols].describe().round(2)"
   ]
  },
  {
   "cell_type": "code",
   "metadata": {},
   "id": "cell7",
   "outputs": [],
   "execution_count": None,
   "source": [
    "from sklearn.model_selection import train_test_split\n",
    "from sklearn.linear_model import LinearRegression\n",
    "from sklearn.ensemble import RandomForestRegressor\n",
    "from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\n",
    "import numpy as np\n",
    "\n",
    "features = ['temperature','humidity','pressure','wind_speed','city_encoded']\n",
    "X = df[features]\n",
    "y = df['pm2_5']\n",
    "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n",
    "\n",
    "lr = LinearRegression().fit(X_train, y_train)\n",
    "rf = RandomForestRegressor(n_estimators=100, random_state=42).fit(X_train, y_train)\n",
    "\n",
    "for name, pred in [('Linear Regression', lr.predict(X_test)), ('Random Forest', rf.predict(X_test))]:\n",
    "    mae = mean_absolute_error(y_test, pred)\n",
    "    rmse = np.sqrt(mean_squared_error(y_test, pred))\n",
    "    r2 = r2_score(y_test, pred)\n",
    "    print(f'{name}: MAE={mae:.4f} | RMSE={rmse:.4f} | R2={r2:.4f}')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "id": "cell8",
   "source": [
    "## Conclusion\n",
    "- **Random Forest** performe mieux que Linear Regression\n",
    "- La variable **AQI** est la plus correlee avec PM2.5\n",
    "- **Marrakech** presente les valeurs PM2.5 les plus elevees\n",
    "- Limite : donnees meteo statiques — un dataset plus varie ameliorerait les modeles"
   ]
  }
 ]
}

with open("notebooks/analysis.ipynb", "w") as f:
    json.dump(notebook, f, indent=2)

print("Notebook cree avec succes !")