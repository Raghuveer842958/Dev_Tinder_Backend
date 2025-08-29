require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http=require("http");

app.use(express.json({
  limit:"20mb"
}));
app.use(cookieParser());

const allowedOrigins = [
  "https://dev-tinder-web-eight.vercel.app",
  "https://devtinder-web-8dlo.onrender.com",
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

const authRouter = require("./src/routes/auth");
const profileRouter = require("./src/routes/profile");
const requestRouter = require("./src/routes/request");
const userRouter = require("./src/routes/user");
const paymentRouter=require("./src/routes/payment");
const chatRouter=require("./src/routes/chat");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/",paymentRouter);
app.use("/",chatRouter);

const server=http.createServer(app);
const initilizeSocket=require('./src/utils/socket');
initilizeSocket(server);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    server.listen(process.env.PORT, () => {
      console.log("Server is successfully listening on port... ",process.env.PORT);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!", err);
    console.log("Error in Database connections");
  });


// // 5.SignUp by google









// require("dotenv").config();
// const express = require("express");
// const connectDB = require("./src/config/database");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// const app = express();

// app.use(express.json({ limit: "20mb" }));
// app.use(cookieParser());

// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://dev-tinder-web-eight.vercel.app",
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// // Routers
// const authRouter = require("./src/routes/auth");
// const profileRouter = require("./src/routes/profile");
// const requestRouter = require("./src/routes/request");
// const userRouter = require("./src/routes/user");
// const paymentRouter = require("./src/routes/payment");
// const chatRouter = require("./src/routes/chat");

// app.use("/", authRouter);
// app.use("/", profileRouter);
// app.use("/", requestRouter);
// app.use("/", userRouter);
// app.use("/", paymentRouter);
// app.use("/", chatRouter);

// // DB connect
// connectDB()
//   .then(() => console.log("DB connected successfully"))
//   .catch((err) => {
//     console.error("Failed to connect DB:", err);
//   });

// // ✅ No app.listen() here — Vercel will handle it
// // module.exports = app;
