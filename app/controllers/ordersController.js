var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var path = require("path");

var Order = require("../models/order");

/*****  GET ALL orders from database *****/
router.get("/orders", function(req, res) {
  Order.find({}, function(err, orders) {
    if (err) return res.status(500).send("There was a problem finding orders.");
    res.status(200).send(orders);
  });
});

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "../../index.html"));
});

/***** GET order by id *****/
router.get("/orders/:id", async ({ params: { id } }, res) => {
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    return res.json(order);
  } catch (err) {
    res.status(500).json({ msg: "Internal server" });
  }
});

/***** POST order *****/
router.post("/order", async (req, res) => {
  try {
    const newOrder = new Order({ ...req.body });
    await newOrder.save();
    res.json(newOrder);
  } catch (err) {
    res.status(500).json({ msg: "Internal error" });
  }
});

/***** DELETE order by id *****/
router.delete("/orders/:id", async ({ params: { id } }, res) => {
  try {
    const order = await Order.findByIdAndRemove(id);
    if (!order) {
      res.status(404).json({ msg: "Order not found" });
    }
    res.send(null);
  } catch (err) {
    res.status(500).json({ msg: "Internal error" });
  }
});

module.exports = router;
