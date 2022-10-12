const express = require('express');
const router = express.Router();
const { centerAdminAuth } = require('../middlewares/auth');
const hotel = require('../models/hotel');
const deliveryBoy = require('../models/deliveryBoy');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const review = require('../models/review');
const order = require('../models/order');

router.get('/pastorders', (req, res) => {
    const id= req.session.userId;
    order.find({ assignedToDeliveryBoyId: id })
        .then((Orders) => {
            if (Orders) {
                res.status(200).send({ orders: Orders });
            } else {
                res.status(200).send({ orders: [] });
            }
        }).catch((error) => {
            if (error) {
                res.status(400).send({ error });
            } else {
                res.status(400).send("Server Error");
            }
        });
});

router.get('/order/:orderId', (req, res) => {
    const id= req.session.userId;
    const orderId = req.params.orderId;
    order.findOne({ assignedToDeliveryBoyId: id, _id: orderId })
        .then((Order) => {
            res.status(200).send({ order: Order });
        }).catch((error) => {
            if (error) {
                res.status(400).send({ error });
            } else {
                res.status(400).send("Server Error");
            }
        });
});


router.get('/ordersincity', (req, res) => {
    const _id= req.session.userId;
    deliveryBoy.findOne({ _id })
        .then((DB) => {
            if (DB) {
                order.find({ "cityId": DB.cityId, assignedToDeliveryBoyId: null,hotelAccepted:true,  status: "Food is Being Processed" })
                    .then((ORDERS) => {
                        res.status(200).send({ orders: ORDERS });
                    }).catch((err) => {
                        res.status(400).send({ error: error});
                    })
            } else {
                res.status(400).send({ error: "No such Delivery Executive" });
            }
        }).catch((err) => {
            res.status(400).send({ error: error});
        })
});


router.put('/tracking', (req, res) => {
    const _id = req.session.userId;
    if(!_id){
        return res.status(400).send("Not Login");;
    }
    const location = req.body;
    deliveryBoy.updateOne({ _id }, { $set: { location:location.coords } })
        .then(res.status(200).send("Location Updated"))
        .catch(error => {
            if (error) {
                res.status(400).send({ error });
            } else {
                res.status(400).send("Server Error");
            }
        })
        //res.status(400).send({ error:"Tracking unavailable" });
});

router.put('/order/recieved-from-hotel', (req, res) => {
    const _id= req.session.userId;
    deliveryBoy.findOne({ _id })
        .then((DB) => {
            if (!DB) {
                res.status(400).send("No such Delivery Executive");
                return;
            }
            if (!DB.currentOrder || DB.currentOrder == "") {
                res.status(400).send("Devlivery Executive is not having any current order.");
                return;
            }
            order.updateOne({ _id: DB.currentOrder }, { $set: { status: "Delivery Executive Out for Order" ,deliveryBoyRecievedOrderAt:Date.now()} })
                .then(() => {
                    res.status(200).send("Delivery Executive Out for Order");
                    return;
                })
        }).catch(error=> console.log(err));
});

router.put('/order/delivered', (req, res) => {
    
    const _id= req.session.userId;
    deliveryBoy.findOne({ _id })
        .then((DB) => {
            if (!DB) {
                res.status(400).send("No such Delivery Executive");
                return;
            }
            if (!DB.currentOrder || DB.currentOrder == "") {
                res.status(400).send("Devlivery Executive is not having any current order.");
                return;
            }
            order.updateOne({ _id: DB.currentOrder }, { $set: { status: "Delivered" } })
                .then(() => {
                    deliveryBoy.updateOne({ _id }, { $set: { currentOrder: "", isFree: true } })
                        .then(() => {
                            res.status(200).send("Delivered");
                        }).catch(error => res.status(400).send(error))
                }).catch(error => res.status(400).send(error))
        }).catch(error=> console.log(err));
});

router.put('/accept/order/:orderId', (req, res) => {
    const _id= req.session.userId;
    const orderId = req.params.orderId;
    order.findOne({ _id: orderId })
        .then((orderData) => {
            if (orderData) {
                if ( orderData.assignedToDeliveryBoyId!=null || (orderData.assignedToDeliveryBoyId && orderData.assignedToDeliveryBoyId.length!=0)) {
                    res.status(400).send({ error: "Oops! Order assigned to another delivery executive." });
                    return;
                } else if (!orderData.status || orderData.status == "Cancelled") {
                    res.status(400).send({ error: "Oops! Order has been cancelled." });
                    return;
                } else {
                    deliveryBoy.findOne({ _id })
                        .then((DB) => {
                            if (!DB.isFree) {
                                res.status(400).send({ error: "First complete your previous order." })
                                return;
                            }
                    
                            const deliveryBoyInfo = { name: DB.name, phoneNumber: DB.phoneNumber, ratings: DB.ratings };
                            
                    
                            order.updateOne({ _id: orderId }, { $set: { assignedToDeliveryBoyId: DB._id, deliveryBoyInfo } })
                                .then((ORDER) => {
                                    deliveryBoy.updateOne({ _id }, { $set: { currentOrder: orderId, isFree: false } })
                                        .then(() => {
                                            res.status(200).send({ order: ORDER })
                                        }).catch(error=> {
                                            res.status(400).send({ error });
                                        })
                                }).catch(error=> {
                                    res.status(400).send({ error });
                                    return;
                                })
                        }).catch(error=> {
                            res.status(400).send({ error });
                            return;
                        })
                }
            } else {
                res.status(400).send({ error: "No such Order is placed" });
                return;
            }
        }).catch(error=> {
            res.status(400).send({ error,serverError:true });
            return;
        })

});

router.put('/personalInfo', (req, res) => {
    res.status(200).send("Service unavailable");
});

module.exports = router;