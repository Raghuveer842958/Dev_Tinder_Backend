const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://raghuveerchauhan7787:q5DRcxyO954WNNqb@cluster0.kmiue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
};

module.exports = connectDB;


