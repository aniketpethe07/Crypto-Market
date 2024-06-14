require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const connectDB = require('./db');
const route = require('./routes/userRoutes');

const app = express();

// Session setup
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE",
  credentials: true // Allows cookies to be sent with requests
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", route);

const port = process.env.PORT || 4000;

connectDB().then(() => 
  app.listen(port, () => {
      console.log(`Server running at ${port}`);
  })
);
