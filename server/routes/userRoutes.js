const express = require("express");
const router = express.Router();
const User = require("../modal/userModal");

router.get("/", async (req, res) => {
  try {
    const doc = await User.find({});
    res.json(doc);
  } catch (err) {
    console.log("Error occured from get student", err);
  }
});

router.get("/:id", async (req, res) => {
  const sid = req.params.id;

  try {
    const doc = await User.find({ _id: sid });
    console.log(doc);
    res.json(doc);
  } catch (err) {
    console.log("Error occured from get student", err);
  }
});

router.post("/", (req, res) => {
  const itemData = new User({
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,
  });

  itemData.save((err, item) => {
    if (err) {
      return err;
    }
    console.log("User Inserted ", item);
    res.json(item);
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let result = null;

  try {
    result = await User.findByIdAndDelete({ _id: id });
    console.log("DELETE RECORDS", result);
    res.json(result);
  } catch (err) {
    console.log("Error occured from delete route: ", err);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const updatedResult = await User.findByIdAndUpdate(
      { _id: id },
      {
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
      }
    );
    console.log("UPDATED: ", updatedResult);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
