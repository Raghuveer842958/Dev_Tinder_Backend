require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "https://devtinder-web-8dlo.onrender.com", // Add as many origins as needed
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        // Allow requests with no origin (like mobile apps, Postman, etc.)
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies and credentials
  })
);


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(process.env.PORT, () => {
      console.log("Server is successfully listening on port... ",process.env.PORT);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!", err);
    console.log("Error in Database connections");
  });

// mongodb+srv://raghuveerchauhan7787:<db_password>@namastenodejs.88ivh.mongodb.net/?retryWrites=true&w=majority&appName=namasteNodejs

// Raghuveer__M001M

// node src/app.js
