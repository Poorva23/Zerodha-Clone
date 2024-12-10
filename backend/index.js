require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken

// Import database connection and models
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URI;

// Middleware setup
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  })
);

// Authentication Middleware
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use process.env.JWT_SECRET
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Routes
app.use('/api', userRoutes);

// Basic route for health check
app.get("/", (req, res) => {
  res.send("Welcome to the Zerodha Clone API!");
});

// Get all holdings
app.get("/allHoldings", async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching holdings", error: error.message });
  }
});

// Get all positions
app.get("/allPositions", async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching positions", error: error.message });
  }
});

// Create a new order
app.post("/newOrder", authenticate, async (req, res) => {
  const { name, stockName, qty, price, mode } = req.body;

  if (!name || !qty || !price || !mode || !stockName) {
    return res.status(400).json({ message: "Missing required fields: name, qty, price, mode, stockName" });
  }

  if (qty <= 0 || price <= 0) {
    return res.status(400).json({ message: "Quantity and price must be greater than zero." });
  }

  const session = await mongoose.startSession(); // Start a session for transaction
  session.startTransaction();

  try {
    if (mode === 'sell') {
      // Check if the user has enough stock to sell
      const userHoldings = await HoldingsModel.findOne({ userName: name, stockName: stockName });

      if (!userHoldings) {
        return res.status(400).json({ message: `No holdings found for ${stockName}` });
      }

      // Check if the user is trying to sell more than they have
      if (userHoldings.quantity < qty) {
        return res.status(400).json({ message: `You can only sell up to ${userHoldings.quantity} stocks of ${stockName}.` });
      }
    }

    // Create a new order and save it to the database
    let newOrder = new OrdersModel({
      userName: name,
      stockName: stockName,
      quantity: qty,
      price: price,
      mode: mode,  // 'buy' or 'sell'
      date: new Date(),
      totalCost: qty * price, // Calculate total cost
    });

    await newOrder.save();

    if (mode === 'buy') {
      // If it's a buy order, update holdings
      let existingHolding = await HoldingsModel.findOne({ userName: name, stockName: stockName });

      if (existingHolding) {
        // Update the quantity and total value of the stock
        existingHolding.quantity += qty;
        existingHolding.totalValue = existingHolding.quantity * existingHolding.averagePrice;
        await existingHolding.save();
      } else {
        // Create new holdings entry if the stock doesn't exist in holdings
        let newHolding = new HoldingsModel({
          userName: name,
          stockName: stockName,
          quantity: qty,
          averagePrice: price,
          currentPrice: price,  // Initial price is the current buy price
          totalValue: qty * price,
        });
        await newHolding.save();
      }
    } else if (mode === 'sell') {
      // If it's a sell order, update holdings
      let existingHolding = await HoldingsModel.findOne({ userName: name, stockName: stockName });

      if (existingHolding) {
        existingHolding.quantity -= qty;
        existingHolding.totalValue = existingHolding.quantity * existingHolding.averagePrice;
        if (existingHolding.quantity === 0) {
          await HoldingsModel.deleteOne({ userName: name, stockName: stockName });
        } else {
          await existingHolding.save();
        }
      }
    }

    res.status(201).json({ message: "Order saved!" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Error saving order", error: error.message });
  }
});

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("Closing MongoDB connection...");
  await mongoose.connection.close();
  process.exit(0);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${3002}`);
});
