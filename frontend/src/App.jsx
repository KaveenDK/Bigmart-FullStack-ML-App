import { useState } from 'react';

import { 
  ShoppingCart, 
  Weight, 
  Eye, 
  Tag, 
  DollarSign, 
  Calendar, 
  Maximize, 
  MapPin, 
  Store,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import './index.css';

function App() {
  const [formData, setFormData] = useState({
    Item_Weight: '',
    Item_Fat_Content: 'Low Fat',
    Item_Visibility: '',
    Item_Type: 'Dairy',
    Item_MRP: '',
    Outlet_Establishment_Year: '1999',
    Outlet_Size: 'Medium',
    Outlet_Location_Type: 'Tier 1',
    Outlet_Type: 'Supermarket Type1'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const categories = {
    Item_Fat_Content: ['Low Fat', 'Regular'],
    Item_Type: ['Dairy', 'Soft Drinks', 'Meat', 'Fruits and Vegetables', 'Household', 'Baking Goods', 'Snack Foods', 'Frozen Foods', 'Breakfast', 'Health and Hygiene', 'Hard Drinks', 'Canned', 'Breads', 'Starchy Foods', 'Others', 'Seafood'],
    Outlet_Establishment_Year: ['1985', '1987', '1997', '1998', '1999', '2002', '2004', '2007', '2009'],
    Outlet_Size: ['Small', 'Medium', 'High'],
    Outlet_Location_Type: ['Tier 1', 'Tier 2', 'Tier 3'],
    Outlet_Type: ['Supermarket Type1', 'Supermarket Type2', 'Supermarket Type3', 'Grocery Store']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      setResult(data.predicted_sales);
    } catch (err) {
      setError(err.message || "Failed to connect to the backend server. Make sure it's running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <div className="glass-panel">
        <div className="app-header">
          <h1 className="app-title">Big Mart <span>Sales Predictor</span></h1>
          <p className="app-subtitle">AI-Powered insights for your retail products</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            
            {/* Item Weight */}
            <div className="input-group">
              <label><Weight /> Item Weight</label>
              <input 
                type="number" 
                step="0.01" 
                name="Item_Weight"
                value={formData.Item_Weight}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g. 9.3"
                required
              />
            </div>

            {/* Item Fat Content */}
            <div className="input-group">
              <label><ShoppingCart /> Fat Content</label>
              <select 
                name="Item_Fat_Content"
                value={formData.Item_Fat_Content}
                onChange={handleChange}
                className="input-field"
              >
                {categories.Item_Fat_Content.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Item Visibility */}
            <div className="input-group">
              <label><Eye /> Item Visibility</label>
              <input 
                type="number" 
                step="0.000001" 
                name="Item_Visibility"
                value={formData.Item_Visibility}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g. 0.016"
                required
              />
            </div>

            {/* Item Type */}
            <div className="input-group">
              <label><Tag /> Item Type</label>
              <select 
                name="Item_Type"
                value={formData.Item_Type}
                onChange={handleChange}
                className="input-field"
              >
                {categories.Item_Type.sort().map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Item MRP */}
            <div className="input-group">
              <label><DollarSign /> Item MRP</label>
              <input 
                type="number" 
                step="0.01" 
                name="Item_MRP"
                value={formData.Item_MRP}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g. 249.80"
                required
              />
            </div>

            {/* Outlet Establishment Year */}
            <div className="input-group">
              <label><Calendar /> Establishment Year</label>
              <select 
                name="Outlet_Establishment_Year"
                value={formData.Outlet_Establishment_Year}
                onChange={handleChange}
                className="input-field"
              >
                {categories.Outlet_Establishment_Year.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Outlet Size */}
            <div className="input-group">
              <label><Maximize /> Outlet Size</label>
              <select 
                name="Outlet_Size"
                value={formData.Outlet_Size}
                onChange={handleChange}
                className="input-field"
              >
                {categories.Outlet_Size.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Outlet Location Type */}
            <div className="input-group">
              <label><MapPin /> Location Type</label>
              <select 
                name="Outlet_Location_Type"
                value={formData.Outlet_Location_Type}
                onChange={handleChange}
                className="input-field"
              >
                {categories.Outlet_Location_Type.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Outlet Type */}
            <div className="input-group">
              <label><Store /> Outlet Type</label>
              <select 
                name="Outlet_Type"
                value={formData.Outlet_Type}
                onChange={handleChange}
                className="input-field"
              >
                {categories.Outlet_Type.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <div className="loader"></div>
            ) : (
              <>
                <Sparkles size={20} /> Predict Sales
              </>
            )}
          </button>
        </form>

        {result !== null && (
          <div className="result-card">
            <h3>Predicted Outlet Sales</h3>
            <div className="amount">${result.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
          </div>
        )}

        {error && (
          <div className="error-card">
            <AlertCircle size={24} style={{ margin: '0 auto 0.5rem', display: 'block' }} />
            <p>{error}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default App;
