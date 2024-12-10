import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  // Function to add an order to the orders state
  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList addOrder={addOrder} />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Summary />} />
            <Route path="/orders" element={<Orders orders={orders} />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/apps" element={<Apps />} />
          </Routes>
        </div>
      </GeneralContextProvider>
    </div>
  );
};

export default Dashboard;
