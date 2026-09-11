// Points at KaveeN's local Flask server. Update this if the backend
// is deployed somewhere else later.
const API_URL = "http://localhost:5000/predict";

const form = document.getElementById("predict-form");
const statusEl = document.getElementById("status");
const resultBox = document.getElementById("result");
const resultValue = document.getElementById("result-value");
const btn = document.getElementById("predict-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    Item_Weight: parseFloat(document.getElementById("item_weight").value),
    Item_Fat_Content: document.getElementById("item_fat_content").value,
    Item_Visibility: parseFloat(document.getElementById("item_visibility").value),
    Item_Type: document.getElementById("item_type").value,
    Item_MRP: parseFloat(document.getElementById("item_mrp").value),
    Outlet_Establishment_Year: parseInt(document.getElementById("outlet_establishment_year").value, 10),
    Outlet_Size: document.getElementById("outlet_size").value,
    Outlet_Location_Type: document.getElementById("outlet_location_type").value,
    Outlet_Type: document.getElementById("outlet_type").value,
  };

  btn.disabled = true;
  statusEl.textContent = "Predicting...";
  resultBox.classList.add("hidden");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Server returned " + response.status);

    const data = await response.json();
    resultValue.textContent = "Rs. " + Number(data.predicted_sales).toFixed(2);
    resultBox.classList.remove("hidden");
    statusEl.textContent = data.note ? data.note : "";
  } catch (err) {
    statusEl.textContent = "Couldn't reach the backend — make sure app.py is running on port 5000.";
    console.error(err);
  } finally {
    btn.disabled = false;
  }
});
