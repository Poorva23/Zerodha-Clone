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
      <div>
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      </div>
      <div>
        <label>Action:</label>
        <button onClick={() => setIsBuy(true)} className={isBuy ? "active" : ""}>Buy</button>
        <button onClick={() => setIsBuy(false)} className={!isBuy ? "active" : ""}>Sell</button>
      </div>
      <button onClick={handleSubmit}>Confirm</button>
      <button onClick={closeWindow}>Cancel</button>
    </div>
  );
};

export default BuyActionWindow;
