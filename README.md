# Big Mart Sales Prediction System

A Machine Learning web app that predicts how much a product will sell at a
Big Mart store, based on details about the product and the outlet.

## Team

| Member  | Role                                                  |
|---------|-------------------------------------------------------|
| Ahasna  | Data & Machine Learning Engineer                      |
| KaveeN  | Backend Developer, ML Integration & GitHub Lead        |
| Prasadi | Frontend Developer & Documentation Lead                |

## Dataset

[Big Mart Sales Prediction](https://www.kaggle.com/datasets/shivan118/big-mart-sales-prediction-datasets) (Kaggle)
Target variable: `Item_Outlet_Sales`

## Architecture

```
User -> Frontend -> Backend REST API -> ML Prediction Service -> Trained ML Model -> Prediction Result -> Frontend
```

## Project Structure

```
big-mart-sales-prediction/
├── data/         Train.csv / Test.csv go here (see data/README.md)
├── ml/           EDA + model training notebook          (Ahasna)
├── backend/      Flask API that serves predictions       (KaveeN)
├── frontend/     HTML / CSS / JS user interface          (Prasadi)
└── docs/         Final project report
```

## How to Run

### 1. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The API starts at `http://localhost:5000`. It works with a placeholder
prediction even before the real model is added, so the frontend can be
tested from Day 1.

### 2. Frontend

Open `frontend/index.html` in your browser (or use an extension like VS
Code's "Live Server"). Make sure the backend is running first.

## Status

- [ ] Dataset explored (EDA)
- [ ] Feature engineering complete (5–6 techniques)
- [ ] Models trained & compared
- [ ] Best model saved (`model.joblib`)
- [ ] Backend `/predict` endpoint connected to the real model
- [ ] Frontend connected to backend
- [ ] Report written

## Deadline

**18th September** — no extensions.
