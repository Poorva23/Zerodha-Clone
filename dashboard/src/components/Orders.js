import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const { orders } = useContext(GeneralContext);

  return (
    <div className="orders">
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders placed yet</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Stock Name</th>
              <th>1 Stock Cost</th>
              <th>Quantity Bought</th>
              <th>Quantity Sold</th>
              <th>Total Bought</th>
              <th>Total Sold</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.stockName}</td>
                <td>{order.pricePerStock}</td>
                <td>{order.quantityBought}</td>
                <td>{order.quantitySold}</td>
                <td>{order.totalBought}</td>
                <td>{order.totalSold}</td>
                <td>{order.totalCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
