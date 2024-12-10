import React, { useContext, useState } from "react";
import { Tooltip, Grow } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp, MoreHoriz, BarChartOutlined } from "@mui/icons-material";
import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";
import GeneralContext from "./GeneralContext";

const WatchList = () => {
  const { openBuyWindow } = useContext(GeneralContext); // Open buy/sell window from context

  const data = {
    labels: watchlist.map((stock) => stock.name),
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts">{watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => (
          <WatchListItem stock={stock} key={index} openBuyWindow={openBuyWindow} />
        ))}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, openBuyWindow }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = () => setShowWatchlistActions(true);
  const handleMouseLeave = () => setShowWatchlistActions(false);

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? <KeyboardArrowDown className="down" /> : <KeyboardArrowUp className="up" />}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions stock={stock} openBuyWindow={openBuyWindow} />}
    </li>
  );
};

const WatchListActions = ({ stock, openBuyWindow }) => {
  return (
    <span className="actions">
      <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
        <button className="buy" onClick={() => openBuyWindow(stock)}>
          Buy
        </button>
      </Tooltip>
      <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
        <button className="sell" onClick={() => openBuyWindow(stock)}>
          Sell
        </button>
      </Tooltip>
      <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
        <button className="action">
          <BarChartOutlined className="icon" />
        </button>
      </Tooltip>
      <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
        <button className="action">
          <MoreHoriz className="icon" />
        </button>
      </Tooltip>
    </span>
  );
};
