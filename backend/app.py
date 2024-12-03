from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import pandas as pd
import os

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


if __name__ == "__main__":
    app.run(debug=True, port=8000)
