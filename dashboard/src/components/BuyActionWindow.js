import React, { useState, useContext } from "react";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ stock, closeWindow }) => {
  const [isBuy, setIsBuy] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0.0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3002/newOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: stock.name,
          qty: quantity,
          price: price,
          mode: isBuy ? "BUY" : "SELL",
        }),
      });

      const data = await response.json();
      console.log("Order placed successfully:", data);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order, please try again.");
    }

    setLoading(false);
    closeWindow(); // Close the window after placing the order
  };

  return (
    <div className="buy-action-window">
      <h3>{isBuy ? "Buy" : "Sell"} {stock?.name || "Stock"}</h3>
      <table className="form-table">
        <tbody>
          <tr>
            <td><label>Quantity:</label></td>
            <td>
              <input
                type="number"
                value={quantity}
                min="0"
                onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
              />
            </td>
          </tr>
          <tr>
            <td><label>Price:</label></td>
            <td>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </td>
          </tr>
          <tr>
            <td><label>Action:</label></td>
            <td>
              <button
                onClick={() => setIsBuy(true)}
                className={isBuy ? "active" : ""}
              >
                Buy
              </button>
              <button
                onClick={() => setIsBuy(false)}
                className={!isBuy ? "active" : ""}
              >
                Sell
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="action-buttons">
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Confirm"}
        </button>
        <button onClick={closeWindow}>Cancel</button>
      </div>
    </div>
  );
};

export default BuyActionWindow;
