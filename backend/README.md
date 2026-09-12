# Backend — Big Mart Sales Prediction API

Flask API that takes product/outlet details and returns a predicted sales
figure. Built by KaveeN. Model, scaler and encoder are from Ahasna
(`ml/eda_and_model.ipynb`) — verified against her actual notebook and
report, not just assumed to match.

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Server runs at `http://localhost:5000`. On startup it should print:
`All 3 model files loaded — /predict will return real predictions.`
If it instead prints a "not all model files" message, check that all three
`.joblib` files are actually inside `backend/model/`.

## Endpoints

### GET /
Health check.
```json
{ "status": "Backend is running", "model_loaded": true }
```

### POST /predict

**Request body:**
```json
{
  "Item_Weight": 12.5,
  "Item_Fat_Content": "Low Fat",
  "Item_Visibility": 0.05,
  "Item_Type": "Dairy",
  "Item_MRP": 141.6,
  "Outlet_Establishment_Year": 1999,
  "Outlet_Size": "Medium",
  "Outlet_Location_Type": "Tier 1",
  "Outlet_Type": "Supermarket Type1"
}
```

**Response:**
```json
{ "predicted_sales": 2181.75 }
```

**Response, if a field is missing:**
```json
{ "error": "Missing fields: Item_MRP" }
```

**Response, if a category isn't one of the values the model was trained
on** (e.g. a typo, or a value not in the dropdown lists below):
```json
{ "error": "Could not process input: y contains previously unseen labels: '...'" }
```

## Valid category values

These are the exact values the encoder was trained on — the frontend's
dropdowns must only send these:

- **Item_Fat_Content:** Low Fat, Regular
- **Item_Type:** Baking Goods, Breads, Breakfast, Canned, Dairy, Frozen Foods,
  Fruits and Vegetables, Hard Drinks, Health and Hygiene, Household, Meat,
  Others, Seafood, Snack Foods, Soft Drinks, Starchy Foods
- **Outlet_Size:** Small, Medium, High
- **Outlet_Location_Type:** Tier 1, Tier 2, Tier 3
- **Outlet_Type:** Grocery Store, Supermarket Type1, Supermarket Type2, Supermarket Type3

(`Item_Fat_Content` also accepts the messy raw labels `low fat`, `LF` and
`reg` — `app.py` cleans those up automatically before encoding, same as
the notebook does.)

## Quick test

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"Item_Weight":12.5,"Item_Fat_Content":"Low Fat","Item_Visibility":0.05,"Item_Type":"Dairy","Item_MRP":141.6,"Outlet_Establishment_Year":1999,"Outlet_Size":"Medium","Outlet_Location_Type":"Tier 1","Outlet_Type":"Supermarket Type1"}'
```

Expect a real number back (not 0.0) — that confirms the model is
genuinely connected and working, not just running the placeholder path.

## Model files

`model.joblib`, `scaler.joblib` and `encoder.joblib` in `backend/model/`
are Ahasna's real trained files (RandomForestRegressor, RMSE ≈ 1086,
R² ≈ 0.566 on her test split — see `docs/Ahasna_ML_Report_Section.pdf`).
Verified independently against `ml/eda_and_model.ipynb` and real rows
from `data/train.csv` before being committed here — predictions matched
a manual, from-scratch recomputation exactly, and landed close to the
true sales values on sample rows. See `model/README.md` for the exact
format if these ever need to be regenerated.
