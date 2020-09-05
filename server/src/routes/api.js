const router = require("express").Router();
const logModel = require("../models/schema");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  (async () => {
    const logs = await logModel.find();
    res.json(logs);
  })();
});

router.post("/create", (req, res, next) => {
  const log = new logModel(req.body);
  (async () => {
    const logged = await log.save();
    res.json(logged);
  })();
});

router.post("/update", (req, res) => {
  let log = req.body;
  const id = log._id;
  delete log._id;
  (async () => {
    const wut = await logModel.findByIdAndUpdate(id, { ...log });
    res.send(wut);
  })();
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  (async () => {
    const del = await logModel.deleteOne({ _id: id });
    res.json(del);
  })();
});

module.exports = router;
