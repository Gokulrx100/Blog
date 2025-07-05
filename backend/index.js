require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const blogRoutes = require("./router/blogRoutes");
const cors=require("cors");
app.use(cors());
app.use(express.json());

async function ServerStart() {
  try {
    let connect = await mongoose.connect(process.env.MONGODB_URI);
    if (!connect) {
      console.log("Cannot connect to DB");
    } else {
      app.listen(3000, () => {
        console.log("server listening at port 3000");
      });
    }
  } catch (err) {
    console.log(err);
  }
}

app.use("/", blogRoutes);

ServerStart();
