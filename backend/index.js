const express = require("express");
const mongoose = require("mongoose");
const app = express();
const blogRoutes = require("./router/blogRoutes");

app.use(express.json());

async function ServerStart() {
  try {
    let connect = await mongoose.connect(
      "mongodb+srv://user123:tD4rUzrOZ0UwlGUI@cluster0.g0omesd.mongodb.net/blog-app?retryWrites=true&w=majority&appName=Cluster0"
    );
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
