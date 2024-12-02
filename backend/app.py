from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import pandas as pd
import os
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://cs_admin:cs_admin123@cybersecurity-db.cj4ussik8asd.eu-north-1.rds.amazonaws.com:5432/cybersecurity_platform"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


@app.route("/api/vulnerability-scores", methods=["GET"])
def get_vulnerability_scores():
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        csv_path = os.path.join(base_dir, "data", "sample_vulnerability_results.csv")

        df = pd.read_csv(csv_path)
        print(df)
        data = df.to_dict(orient="records")
        return jsonify({"status": "success", "data": data}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# Load the trained ML model
with open("vulnerability_model.pkl", "rb") as file:
    model = pickle.load(file)


@app.route("/api/predict-vulnerability", methods=["POST"])
def predict_vulnerability():
    try:
        # Parse input JSON
        data = request.json
        module_score = data.get("module_score")
        test_score = data.get("test_score")

        # Ensure the input values are provided
        if module_score is None or test_score is None:
            return jsonify(
                {"error": "Missing required fields: module_score, test_score"}
            ), 400

        # Prepare the input for prediction
        input_data = np.array([[module_score, test_score]])

        # Make the prediction
        predicted_score = model.predict(input_data)[0]

        return jsonify({"vulnerability_score": predicted_score}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=8000)
