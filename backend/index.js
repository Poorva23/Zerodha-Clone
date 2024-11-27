require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes'); // Import user routes
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URI;

// Middleware
//app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST'],
  credentials: true // Allow cookies if needed
}));

app.use(bodyParser.json());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  })
);


app.use('/api', userRoutes);
// Routes
// app.use("/api/users", userRoutes); // Add the user routes

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
  try {
    let newOrder = new OrdersModel(req.body);
    await newOrder.save();
    res.status(201).send("Order saved!");
  } catch (error) {
    res.status(500).json({ message: "Error saving order", error: error.message });
  }
});

// MongoDB Connection
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("Closing MongoDB connection...");
  await mongoose.connection.close();
  process.exit(0);
});

// Start Server
// app.listen(PORT, () => {
//   console.log(`App running on http://localhost:${PORT}`);
// });
app.listen(3002, () => {
  console.log('Server is running on http://localhost:3002');
});

