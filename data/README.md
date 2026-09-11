# Data folder

Download these two files from Kaggle and place them directly in this folder:

- `Train.csv`
- `Test.csv`

**Dataset:** https://www.kaggle.com/datasets/shivan118/big-mart-sales-prediction-datasets

**Backup dataset (only if needed):** https://www.kaggle.com/datasets/divyajeetthakur/walmart-sales-prediction

Once the files are here, the notebook in `../ml/` can load them with:

```python
df = pd.read_csv('../data/Train.csv')
```
