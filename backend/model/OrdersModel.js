const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  userName: String,
  stockName: String,
  quantity: String,
  price: String,
  mode: String, // "buy" or "sell"
  date: Date,
  totalCost: String, // Total cost of the transaction (quantity * price)
});

const OrdersModel = mongoose.model("Orders", ordersSchema);

module.exports = { OrdersModel };
