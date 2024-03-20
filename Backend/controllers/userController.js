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

    res.json({ message: `Welcome! ${email}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
