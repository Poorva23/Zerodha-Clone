// const mongoose = require("mongoose");

// const holdingsSchema = new mongoose.Schema({
//   userName: String,
//   stockName: String,
//   quantity: { type: Number, default: 0 },
//   averagePrice: { type: Number, default: 0 },  // Average price at which the stock was bought
//   currentPrice: { type: Number, default: 0 },  // Current market price (optional, can be updated periodically)
//   totalValue: { type: Number, default: 0 },    // Total value of the stock (quantity * current price)
// });

// // Before saving a document, ensure the `totalValue` is calculated
// holdingsSchema.pre('save', function (next) {
//   this.totalValue = this.quantity * this.currentPrice;
//   next();
// });

// const HoldingsModel = mongoose.model("Holdings", holdingsSchema);

// module.exports = { HoldingsModel };

// models/holdings.js
const mongoose = require('mongoose');

// Schema definition for Holdings
const holdingsSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  stockName: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  averagePrice: { type: Number, default: 0 },
  currentPrice: { type: Number, default: 0 },
  totalValue: { type: Number, default: 0 },
});

// Pre-save middleware to update total value before saving
holdingsSchema.pre('save', function (next) {
  this.totalValue = this.quantity * this.currentPrice;
  next();
});

// Define the model
const HoldingsModel = mongoose.model('Holdings', holdingsSchema);

module.exports = { HoldingsModel };
