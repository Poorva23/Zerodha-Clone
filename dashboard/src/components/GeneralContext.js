import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";
import "./styles.css";

const GeneralContext = React.createContext({
  openBuyWindow: (stock) => {},
  closeBuyWindow: () => {},
  addOrder: (order) => {},
  orders: [],
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [orders, setOrders] = useState([]);

  const handleOpenBuyWindow = (stock) => {
    setIsBuyWindowOpen(true);
    setSelectedStock(stock);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStock(null);
  };

  const handleAddOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, { ...order, id: prevOrders.length + 1 }]);
    handleCloseBuyWindow();
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        addOrder: handleAddOrder,
        orders: orders,
      }}
    >
      {props.children}
      {isBuyWindowOpen && selectedStock && (
        <BuyActionWindow stock={selectedStock} closeWindow={handleCloseBuyWindow} addOrder={handleAddOrder} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
