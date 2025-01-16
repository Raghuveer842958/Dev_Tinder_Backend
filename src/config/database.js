const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/devTinder01");
};

// "mongodb+srv://raghuveerchauhan7787:q5DRcxyO954WNNqb@cluster0.kmiue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

module.exports = connectDB;


