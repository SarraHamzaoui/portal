const express = require("express");
const cors = require("cors");
const { server, app } = require("./socketServer");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const actualityRoute = require("./routes/actuality");
const userRoute = require("./routes/user");

require("./config/connect");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/actuality", actualityRoute);
app.use("/user", userRoute);

app.use("/getimage", express.static("./uploads"));

server.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
