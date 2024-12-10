const mongoose = require("mongoose");

const positionsSchema = new mongoose.Schema({
  userName: String,
  stockName: String,
  quantity: Number,
  buyPrice: Number,
  currentPrice: Number,
  profitLoss: Number,
});

const PositionsModel = mongoose.model("Positions", positionsSchema);

module.exports = { PositionsModel };
