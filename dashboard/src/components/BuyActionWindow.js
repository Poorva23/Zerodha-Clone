import React, { useState } from "react";

const BuyActionWindow = ({ stock, closeWindow, addOrder }) => {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(stock.price);
  const [isBuy, setIsBuy] = useState(true); // Default to Buy action

  const handleSubmit = () => {
    const order = {
      stockName: stock.name,
      pricePerStock: price,
      quantityBought: isBuy ? quantity : 0,
      quantitySold: isBuy ? 0 : quantity,
      totalBought: isBuy ? quantity * price : 0,
      totalSold: isBuy ? 0 : quantity * price,
      totalCost: quantity * price,
    };
    addOrder(order); // Add order globally
    closeWindow(); // Close the buy/sell window
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