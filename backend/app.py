"""
Big Mart Sales Prediction — Backend API
Owner: KaveeN

Run with:
    python app.py

This starts working immediately with a placeholder prediction, so Prasadi
can build and test the frontend connection before the real model is ready.
Once Ahasna sends model.joblib / scaler.joblib / encoder.joblib, drop them
into backend/model/ and follow the three TODOs below.
"""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allows the frontend (a different port/origin) to call this API

MODEL_DIR = os.path.join(os.path.dirname(__file__), "model")

# TODO 1: Once the model files are in backend/model/, load them here:
# import joblib
# model = joblib.load(os.path.join(MODEL_DIR, "model.joblib"))
# scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.joblib"))
# encoder = joblib.load(os.path.join(MODEL_DIR, "encoder.joblib"))


@app.route("/", methods=["GET"])
def health_check():
    """Quick check that the server is alive: visit http://localhost:5000/"""
    return jsonify({"status": "Backend is running"})


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No input data received"}), 400

    # TODO 2: Turn `data` into the same shape/order of columns the model
    #         was trained on, e.g.:
    #   import pandas as pd
    #   row = pd.DataFrame([data])

    # TODO 3: Apply the EXACT SAME encoding + scaling steps Ahasna used
    #         during training, then predict:
    #   row_encoded = encoder.transform(row[categorical_cols])
    #   row_scaled  = scaler.transform(row[numeric_cols])
    #   prepared    = ...combine them in the same order used for training...
    #   prediction  = model.predict(prepared)
    #   return jsonify({"predicted_sales": float(prediction[0])})

    # --- Placeholder response (remove once the real model is connected) ---
    return jsonify({
        "predicted_sales": 0.0,
        "note": "Model not connected yet — this is a placeholder from app.py",
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
