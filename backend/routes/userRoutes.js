// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { User } = require("../model/User"); // Import your User model

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Use a secure key for JWT

// // Signup Route
// router.post("/signup", async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists!" });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(201).json({
//       message: "Signup successful! You can now log in.",
//       user: {
//         name: newUser.name,
//         email: newUser.email,
//       },
//     });
//   } catch (error) {
//     console.error("Error during signup:", error);
//     res.status(500).json({ message: "Server error during signup", error: error.message });
//   }
// });

// // Login Route
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Check if the user exists
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ message: "User not found! Please sign up first." });
//     }

//     // Validate the password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
//       expiresIn: "1h", // Token validity
//     });

//     res.status(200).json({
//       message: "Login successful!",
//       token,
//       user: { id: user._id, username: user.username, email: user.email },
//    });
//   //res.status(200).send("Login successful");
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Server error during login", error: error.message });
//   }
// });

// module.exports = router;

// userRoutes.js (updated with stock order logic)
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../model/User");
const { HoldingsModel } = require("../models/holdings"); // Import the Holdings model

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Use a secure key for JWT

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful! You can now log in.",
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error during signup", error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found! Please sign up first." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: "1h", // Token validity
    });

    res.status(200).json({
      message: "Login successful!",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error during login", error: error.message });
  }
});

// Add stock holdings or update existing holdings
router.post("/order", async (req, res) => {
  const { userName, stockName, quantity, price, mode } = req.body;

  try {
    const existingHolding = await HoldingsModel.findOne({ userName, stockName });

    if (existingHolding) {
      // If stock already exists, update the quantity and average price
      const totalQuantity = existingHolding.quantity + quantity;
      const totalCost = (existingHolding.averagePrice * existingHolding.quantity) + (price * quantity);
      const newAveragePrice = totalCost / totalQuantity;

      existingHolding.quantity = totalQuantity;
      existingHolding.averagePrice = newAveragePrice;
      existingHolding.totalValue = totalQuantity * existingHolding.currentPrice;

      await existingHolding.save();
      return res.status(200).json({ message: 'Holding updated successfully' });
    } else {
      // Create a new holding record
      const newHolding = new HoldingsModel({
        userName,
        stockName,
        quantity,
        averagePrice: price,
        currentPrice: price, // Set current price initially
        totalValue: quantity * price,
      });

      await newHolding.save();
      return res.status(201).json({ message: 'New holding created successfully' });
    }
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
});

module.exports = router;
