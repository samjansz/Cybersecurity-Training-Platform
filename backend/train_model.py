import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import pickle

# Load the data
data = pd.read_csv("./data/vulnerability_scores.csv")

# Features (X) and target (y)
X = data[["module_score", "test_score"]]  # Add relevant features here
y = data["vulnerability_score"]

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train the regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluate the model
predictions = model.predict(X_test)
mse = mean_squared_error(y_test, predictions)
print(f"Model Mean Squared Error: {mse}")

# Save the trained model to a file
with open("vulnerability_model.pkl", "wb") as file:
    pickle.dump(model, file)
print("Model saved as vulnerability_model.pkl")
