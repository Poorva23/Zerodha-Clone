import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [loading, setLoading] = useState(false); 

  const { closeBuyWindow } = useContext(GeneralContext); 

  const handleBuyClick = async () => {
    setLoading(true);  

    try {
      const response = await fetch("http://localhost:3002/newOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "NIFTY",
          qty: stockQuantity,
          price: stockPrice,
          mode: "BUY",
        }),
      });
      console.log("Response:", response.body);

      console.log("Order placed successfully:", response.data);
      alert("Order placed successfully!");

    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order, please try again.");
    }

    setLoading(false); 
    closeBuyWindow();  // Close the window after placing the order
  };

  return (
    <div className="buy-action-window">
      <h3>{isBuy ? "Buy" : "Sell"} {stock.name}</h3>
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
        <button onClick={handleSubmit}>Confirm</button>
        <button onClick={closeWindow}>Cancel</button>
      </div>
    </div>
  );
};

export default BuyActionWindow;
