require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken

const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes'); // Import user routes
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/Zerodha_Clone";
const JWT_SECRET = process.env.JWT_SECRET || "This is secret key";

// Middleware
app.use(cors({
  origin: '*', 
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

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
const checkAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, JWT_SECRET);
    
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    
    console.error("Error during authentication:", error);
    return res.status(500).json({ message: "Authentication error" });
  }
};

app.get('/authcheck', checkAuthenticate, (req, res) => {
  res.status(200).json({ 
    message: "Authorized", 
    user: req.user 
  });
});

app.use('/api', userRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Zerodha Clone API!");
});

app.get("/allHoldings", async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching holdings", error: error.message });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching positions", error: error.message });
  }
});


app.post("/newOrder", async (req, res) => {
  const { name, qty, price, mode } = req.body;
  if (!name || !qty || !price || !mode) {
    return res.status(400).json({ message: "Missing required fields: name, qty, price, mode" });
  }

  try {
    let newOrder = new OrdersModel({
      userName: name,
      quantity: qty,
      price: price,
      mode: mode,
      date: new Date(),
    });
    await newOrder.save();
    res.status(201).send("Order saved!");
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Error saving order", error: error.message });
  }
});


mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });


process.on("SIGINT", async () => {
  console.log("Closing MongoDB connection...");
  await mongoose.connection.close();
  process.exit(0);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});