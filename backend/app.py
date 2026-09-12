import os
import joblib
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allows the frontend to call this API

MODEL_DIR = os.path.join(os.path.dirname(__file__), "model")
DATASET_YEAR = 2013

FEATURE_ORDER = [
    "Item_Weight", "Item_Fat_Content", "Item_Visibility", "Item_Type",
    "Item_MRP", "Outlet_Size", "Outlet_Location_Type", "Outlet_Type",
    "Outlet_Age",
]
SCALED_COLS = ["Item_Weight", "Item_Visibility", "Item_MRP"]
ENCODED_COLS = ["Item_Fat_Content", "Item_Type", "Outlet_Size",
                "Outlet_Location_Type", "Outlet_Type"]
REQUIRED_FIELDS = [
    "Item_Weight", "Item_Fat_Content", "Item_Visibility", "Item_Type",
    "Item_MRP", "Outlet_Establishment_Year", "Outlet_Size",
    "Outlet_Location_Type", "Outlet_Type",
]

# Load the model, scaler, and encoders if they exist. If not, the /predict endpoint will return a placeholder.
model = scaler = encoders = None
try:
    _model = joblib.load(os.path.join(MODEL_DIR, "model.joblib"))
    _scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.joblib"))
    _encoders = joblib.load(os.path.join(MODEL_DIR, "encoder.joblib"))
    model, scaler, encoders = _model, _scaler, _encoders
    print("All 3 model files loaded — /predict will return real predictions.")
except FileNotFoundError as e:
    print(f"Not all model files are in backend/model/ yet (missing: "
          f"{os.path.basename(e.filename)}) — /predict will return a "
          f"placeholder until model.joblib, scaler.joblib AND encoder.joblib "
          f"are all present.")


def clean_fat_content(value):
    """Same cleanup as the notebook: collapse messy labels into one."""
    mapping = {"low fat": "Low Fat", "LF": "Low Fat", "reg": "Regular"}
    return mapping.get(value, value)


def prepare_row(data):
    """Turn raw form JSON into the exact row shape the model expects."""
    row = {
        "Item_Weight": float(data["Item_Weight"]),
        "Item_Fat_Content": clean_fat_content(data["Item_Fat_Content"]),
        "Item_Visibility": float(data["Item_Visibility"]),
        "Item_Type": data["Item_Type"],
        "Item_MRP": float(data["Item_MRP"]),
        "Outlet_Size": data["Outlet_Size"],
        "Outlet_Location_Type": data["Outlet_Location_Type"],
        "Outlet_Type": data["Outlet_Type"],
        "Outlet_Age": DATASET_YEAR - int(data["Outlet_Establishment_Year"]),
    }
    df = pd.DataFrame([row])

    for col in ENCODED_COLS:
        df[col] = encoders[col].transform(df[col])

    df[SCALED_COLS] = scaler.transform(df[SCALED_COLS])

    return df[FEATURE_ORDER]


@app.route("/", methods=["GET"])
def health_check():
    """Quick check that the server is alive: visit http://localhost:5000/"""
    return jsonify({
        "status": "Backend is running",
        "model_loaded": model is not None,
    })


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "No input data received"}), 400

    missing = [f for f in REQUIRED_FIELDS if f not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    if model is None:
        return jsonify({
            "predicted_sales": 0.0,
            "note": "Model not connected yet — drop model.joblib, "
                    "scaler.joblib and encoder.joblib into backend/model/",
        })

    try:
        prepared = prepare_row(data)
        prediction = model.predict(prepared)
        return jsonify({"predicted_sales": round(float(prediction[0]), 2)})
    except (KeyError, ValueError) as e:
        return jsonify({"error": f"Could not process input: {e}"}), 400


if __name__ == "__main__":
    app.run(debug=True, port=5000)
