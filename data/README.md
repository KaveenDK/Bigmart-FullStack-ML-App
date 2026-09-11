# Data Folder — Big Mart Sales Prediction

This folder contains the raw dataset used for the Big Mart Sales Prediction project.

## Files

| File | Description |
|---|---|
| `Train.csv` | Training data — 8,523 rows, used to build and evaluate the model. Contains `Item_Outlet_Sales` (the target variable). |
| `Test.csv` | Test data — does not contain `Item_Outlet_Sales`. Not used during model training/evaluation; kept for reference only. |

## Source

Big Mart Sales Prediction dataset, from Kaggle:
https://www.kaggle.com/datasets/shivan118/big-mart-sales-prediction-datasets

## Dataset Details

- **Records:** 8,523 (training set)
- **Features:** 11 input features + 1 target variable (`Item_Outlet_Sales`)
- **Target variable:** `Item_Outlet_Sales` — the sales amount of a product at a specific outlet
- **Problem type:** Regression
- **Year collected:** 2013 (used in the notebook to calculate `Outlet_Age` from `Outlet_Establishment_Year`)

## Column Reference

| Column | Description |
|---|---|
| `Item_Identifier` | Unique product ID |
| `Item_Weight` | Weight of the product (has missing values) |
| `Item_Fat_Content` | Low Fat / Regular (raw data has inconsistent labels — cleaned in notebook) |
| `Item_Visibility` | % of display area allocated to the product |
| `Item_Type` | Product category (e.g. Dairy, Meat, Household) |
| `Item_MRP` | Maximum Retail Price |
| `Outlet_Identifier` | Unique store ID |
| `Outlet_Establishment_Year` | Year the outlet was established |
| `Outlet_Size` | Small / Medium / High (has missing values) |
| `Outlet_Location_Type` | Tier of area the outlet is located in |
| `Outlet_Type` | Grocery Store / Supermarket Type 1/2/3 |
| `Item_Outlet_Sales` | **Target** — sales amount (Train.csv only) |

## Known Data Quality Issues

- `Item_Weight`: 1,463 missing values (filled with mean in the notebook)
- `Outlet_Size`: 2,410 missing values (filled with mode in the notebook)
- `Item_Fat_Content`: inconsistent category labels (`Low Fat`, `LF`, `low fat`, `Regular`, `reg`) — standardised to `Low Fat` / `Regular` in the notebook

See `ml/eda_and_model.ipynb` for the full cleaning, feature engineering, and model training process.