import React, { useContext, useState, useEffect } from "react";
import { Tooltip, Grow } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp, MoreHoriz, BarChartOutlined } from "@mui/icons-material";
import { DoughnutChart } from "./DoughnoutChart";
import GeneralContext from "./GeneralContext";
import axios from 'axios';

const WatchList = () => {
  const { openBuyWindow } = useContext(GeneralContext);
  const [stockData, setStockData] = useState({
    topGainers: [],
    topLosers: []
  });

  const options = {
    method: 'GET',
    url: 'https://stock.indianapi.in/trending',
    headers: {'X-Api-Key': 'sk-live-nQkwudffGaiKpHGZmXaEZucRi5ITDW8pzoWd63Q2'}
  };

  const getStockData = async () => {
    try {
      const { data } = await axios.request(options);
      setStockData({
        topGainers: data.trending_stocks.top_gainers,
        topLosers: data.trending_stocks.top_losers
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getStockData();
  }, []);

  const combinedStocks = [...stockData.topGainers, ...stockData.topLosers];

  const chartData = {
    labels: combinedStocks.map((stock) => stock.company_name),
    datasets: [
      {
        label: "Price",
        data: combinedStocks.map((stock) => parseFloat(stock.price)),
        backgroundColor: combinedStocks.map((stock, index) => 
          stock.percent_change.startsWith('-') 
            ? "rgba(255, 99, 132, 0.5)" 
            : "rgba(75, 192, 192, 0.5)"
        ),
        borderColor: combinedStocks.map((stock, index) => 
          stock.percent_change.startsWith('-') 
            ? "rgba(255, 99, 132, 1)" 
            : "rgba(75, 192, 192, 1)"
        ),
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
        <span className="counts">{combinedStocks.length} / 50</span>
      </div>

      <ul className="list">
        {combinedStocks.map((stock, index) => (
          <WatchListItem 
            key={stock.ticker_id} 
            stock={{
              name: stock.company_name,
              price: stock.price,
              percent: stock.percent_change,
              isDown: stock.percent_change.startsWith('-')
            }} 
            openBuyWindow={openBuyWindow} 
          />
        ))}
      </ul>

      <DoughnutChart data={chartData} />
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
          <span className="percent">{stock.percent}%</span>
          {stock.isDown ? <KeyboardArrowDown className="down" /> : <KeyboardArrowUp className="up" />}
          <span className="price">₹{stock.price}</span>
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