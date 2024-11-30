from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)


@app.route("/api/vulnerability-scores", methods=["GET"])
def get_vulnerability_scores():
    try:
        # Dynamically construct the absolute file path
        base_dir = os.path.dirname(
            os.path.abspath(__file__)
        )  # Get the directory of the current script
        csv_path = os.path.join(base_dir, "data", "sample_vulnerability_results.csv")

        # Read the CSV file
        df = pd.read_csv(csv_path)
        print(df)
        # Process data and return response
        data = df.to_dict(orient="records")
        return jsonify({"status": "success", "data": data}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=8000)
