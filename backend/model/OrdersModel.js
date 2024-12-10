const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  userName: String,
  stockName: String,
  quantity: Number,
  price: Number,
  mode: String, // "buy" or "sell"
  date: Date,
  totalCost: Number, // Total cost of the transaction (quantity * price)
});

const OrdersModel = mongoose.model("Orders", ordersSchema);

module.exports = { OrdersModel };
