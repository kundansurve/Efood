const express = require("express");
const router = express.Router();
const { hotelAuth } = require("../middlewares/auth");
const hotel = require("../models/hotel");
const deliveryBoy = require("../models/review");
const bcrypt = require("bcryptjs");
const user = require("../models/user");
const review = require("../models/review");
const dish = require("../models/dish");
const order = require("../models/order");

router.get("/orders", (req, res) => {
  let id=req.session.userId;
  if (req.session.userType === "admin") {
    id = req.body.id;
  }
  if (!req.session.userType === "hotel" && !req.session.userType === "admin") {
    res.status(400).send("Only User has Access to view the orders");
    return;
  }
  order
    .find({ placedInHotel: id })
    .then((orders) => {
      res.status(200).send({ orders });
      return;
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

router.post("/newdish", (req, res) => {
  const { name, isVeg, type, price } = req.body;
  const hotelId = req.session.userId;
  dish
    .find({ name, hotelId })
    .then((oldDish) => {
      if (!oldDish) {
        res.status(400).send("Two different dishes cannot have same name.");
      } else {
        hotel
          .findOne({ _id: hotelId })
          .then((Hotel) => {
            const newDish = new dish({
              name,
              isVeg,
              type,
              price,
              hotelId,
              cityId: Hotel.cityId,
            });
            newDish
              .save()
              .then(({ _id }) => {
                dish
                  .findOne({ _id })
                  .then((Dish) => {
                    res.status.send(Dish);
                    return;
                  })
                  .catch((error) => {
                    res.status(401).send({ error });
                    return;
                  });
              })
              .catch((error) => {
                res.status(401).send({ error });
                return;
              });
          })
          .catch((error) => {
            if (error) {
              res.status(400).send({ error });
              return;
            } else {
              res.status(400).send({ error: "Server Error" });
              return;
            }
          });
      }
    })
    .catch((error) => {
      res.status(401).send({ error });
      return;
    });
});

router.put("/updatedish/:id", (req, res) => {
  const _id = req.params.id;
  dish.findOne({ _id }).then((Dish) => {
    if (!Dish) {
      res.status(400).send("Dish with this id is not present");
      return;
    } else {
      if (Dish.hotelId != req.session.userId) {
        res.status.send("Dish cannot be deleted");
        return;
      }
      dish
        .updateOne({ _id }, { $set: req.body })
        .then(
          dish
            .findOne({ _id })
            .then((updatedDish) => {
              res.status(200).send(updatedDish);
              return;
            })
            .catch((error) => {
              res.status(401).send({ error });
            })
        )
        .catch((error) => {
          res.status(401).send({ error });
        });
    }
  });
});

router.put("/acceptorder/:orderId", (req, res) => {
  const _id = req.session.id;
  order
    .updateOne({ _id: req.params.orderId }, { $set: { hotelAccepted: true } })
    .then((ORDER) => {
      res.status(200).send({ status: "Accepted", order: ORDER });
    })
    .catch((error) => {
      res.status(401).send({ error });
    });
});

router.put("/rejectorder/:orderId", (req, res) => {
  const _id = req.session.id;
  order
    .updateOne({ _id: req.params.orderId }, { $set: { hotelAccepted: false } })
    .then((ORDER) => {
      res.status(200).send({ status: "Accepted", order: ORDER });
    })
    .catch((error) => {
      res.status(401).send({ error });
    });
});

router.delete("/deletedish/:id", (req, res) => {
  const _id = req.params.id;
  dish.findOne({ _id }).then((Dish) => {
    if (Dish) {
      res.status(400).send("Dish with this id is not present");
      return;
    } else {
      if (Dish.hotelId != req.session.userId) {
        res.status.send("Dish cannot be deleted");
        return;
      }
      dish
        .deleteOne({ _id })
        .then(
          review
            .deleteMany({ reviewType: "dish", reviewForId: _id })
            .then(res.status(200).send("Deleted"))
            .catch((error) => {
              res.status(401).send({ error });
            })
        )
        .catch((error) => {
          res.status(401).send({ error });
        });
    }
  });
});

module.exports = router;
