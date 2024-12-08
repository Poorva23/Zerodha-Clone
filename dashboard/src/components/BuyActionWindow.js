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
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
              min="1" // Prevents negative quantities
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
              min="0" // Prevents negative price
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button
            className="btn btn-blue"
            onClick={handleBuyClick}
            disabled={loading} // Disable button when request is loading
          >
            {loading ? "Placing Order..." : "Buy"}
          </button>
          <button className="btn btn-grey" onClick={closeBuyWindow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
