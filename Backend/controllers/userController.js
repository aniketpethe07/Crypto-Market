const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const app = express();

app.use(express.json());



const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are mandatory!" });
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      return res.status(400).json({ error: "User already registered!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hashed Password: ", hashedPassword);
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ _id: user.id, email: user.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return res.status(400).json({ error: "Password doesn't match" });
    }

    req.session.email = user.email;
    res.json({ message: `Welcome! ${req.session.email}` });
    // console.log({ message: `Welcome! ${req.session.email}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const homePageApi = async (req, res) => {
  console.log("Session email in homePageApi:", req.session.email);
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
    );
    const data = await response.json();
    res.json({data, email: req.session.email});
    // console.log({message: `Welcome! ${req.session.email}`});
    // console.log(data);
  } catch (error) {
    console.error("Error fetching crypto data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const infoPageApi = async (req, res) => {
  try {
    const id = req.query.id;
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    const data = await response.json();
    // res.json(data);
    res.json({data, email: req.session.email});
    console.log({message: `Welcome! ${req.session.email}`});
  } catch (error) {
    console.error("Error fetching crypto data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser, homePageApi, infoPageApi };
