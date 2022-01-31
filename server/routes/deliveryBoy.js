const express = require('express');
const router = express.Router();
const {centerAdminAuth}=require('../middlewares/auth');
const hotel=require('../models/hotel');
const deliveryBoy= require('../models/deliveryBoy');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const review = require('../models/review');
const order = require('../models/order');

router.get('/pastorders',(req,res)=>{
    let id=req.session.userId;
    order.find({assignedToDeliveryBoyId:id})
    .then((Orders)=>{
        if(Orders){
            res.status(200).send({orders});
        }else{
            res.status(200).send({orders:[]});
        }
    }).catch((error)=>{
        if(error){
            res.status(400).send({error});
        }else{
            res.status(400).send("Server Error");
        }
    });
});


router.get('/ordersincity',(req,res)=>{
    const _id= req.session.userId;
    deliveryBoy.findOne({_id})
    .then((DB)=>{
        orders.find({cityId:DB.cityId})
        .then((ORDERS)=>{
            res.status(200).send({orders:ORDERS});
        }).catch((err)=>{
            res.status(400).send({error:err});
        })
    }).catch((err)=>{
        res.status(400).send({error:err});
    })
});


router.put('/tracking',(req,res)=>{
    const _id= req.session.userId;
    const location= req.body;
    deliveryBoy.updateOne({_id}, {$set:{location}})
    .then(res.status(200).send("Location Updated"))
    .catch(error=>{
        if(error){
            res.status(400).send({error});
        }else{
            res.status(400).send("Server Error");
        }
    })
});


router.put('/accept/order/orderId',(req,res)=>{
    const _id= req.session.userId;
    const orderId=req.params.orderId;
    deliveryBoy.findOne({_id})
    .then((DB)=>{
        const deliveryBoyInfo = {name:DB.name,phoneNumber:DB.phoneNumber,ratings};
        order.updateOne({_id:orderId},{$set:{assignedToDeliveryBoyId:DB._id,deliveryBoyInfo}})
        .then((ORDER)=>{
            deliveryBoy.updateOne({_id},{$set:{currentOrder:orderId}})
            .then(()=>{
                res.status(200).send({order:ORDER})
            }).catch(err=>{
                res.status(400).send({err});
            })
        }).catch(err=>{
            res.status(400).send({err});
        })
    }).catch(err=>{
        res.status(400).send({err});
    })
});

router.put('/personalInfo',(req,res)=>{
    
});

module.exports = router;