const express = require("express");

const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  data = req.body;
  const usr = new User(data);
  salt = bcrypt.genSaltSync(10);
  cryptedPass = bcrypt.hashSync(data.password, salt);

  usr.password = cryptedPass;
  usr
    .save()
    .then((saved) => {
      res.status(200).send(saved);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/login", async (req, res) => {
  data = req.body;
  const user = await User.findOne({ email: data.email });
  if (!user) {
    res.status(404).send("email or password invalid!");
  } else {
    validPass = bcrypt.compareSync(data.password, user.password);
    if (!validPass) {
      res.status(401).send("email or password invalid!");
    } else {
      payload = {
        _id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        status: user.status,
      };
      token = jwt.sign(payload, "1234567");

      res.status(200).send({
        mytoken: token,
        role: user.role,
        status: user.status,
      });
    }
  }
});

router.post("/create", async (req, res) => {
  try {
    const data = req.body;
    const usr = new User(data);

    const savedUser = await usr.save();
    res.send(savedUser);
  } catch (error) {
    res.send(error);
  }
});

router.get("/getall", (req, res) => {
  User.find() //njib les uer m database
    .then((users) => {
      //tekhou users ili jeyin database mil user.find
      res.send(users);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/all", async (req, res) => {
  try {
    users = await User.find();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

router.get("/getbyid/:id", (req, res) => {
  myid = req.params.id;
  User.findOne({ _id: myid })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/byid/:id", async (req, res) => {
  try {
    myid = req.params.id;
    user = await User.findById({ _id: myid });
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

router.put("/updateUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    const updated = await User.findByIdAndUpdate(id, newData, { new: true });
    res.status(200).send(updated);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/delete/:id", (req, res) => {
  id = req.params.id;
  User.findOneAndDelete({ _id: id })
    .then((deletedUser) => {
      res.send(deletedUser);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/del/:id", async (req, res) => {
  try {
    myid = req.params.id;
    deleteduser = await User.findOneAndDelete({ _id: myid });
    res.send(deleteduser);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
