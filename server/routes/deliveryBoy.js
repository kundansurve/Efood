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
    const id="6289e9f212d882493b40aa7c";
    //const id= req.session.userId;
    order.find({assignedToDeliveryBoyId:id})
    .then((Orders)=>{
        if(Orders){
            res.status(200).send({orders:Orders});
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

router.get('/order/:orderId',(req,res)=>{
    const id="6289e9f212d882493b40aa7c";
    //const id= req.session.userId;
    const orderId=req.params.orderId;
    order.findOne({assignedToDeliveryBoyId:id,_id:orderId})
    .then((Order)=>{
        res.status(200).send({order:Order});
    }).catch((error)=>{
        if(error){
            res.status(400).send({error});
        }else{
            res.status(400).send("Server Error");
        }
    });
});


router.get('/ordersincity',(req,res)=>{
    const _id="6289e9f212d882493b40aa7c";
    //const _id= req.session.userId;

    deliveryBoy.findOne({_id})
    .then((DB)=>{
        if(DB){
            order.find({"cityId":DB.cityId,"assignedToDeliveryBoyId":"","hotelAccepted":true})
            .then((ORDERS)=>{
                res.status(200).send({orders:ORDERS});
            }).catch((err)=>{
                res.status(400).send({error:err});
            })
        }else{
            res.status(400).send({error:"No such Delivery Executive"});
        }
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


router.put('/accept/order/:orderId',(req,res)=>{
    const _id="6289e9f212d882493b40aa7c";
    //const _id= req.session.userId;
    const orderId=req.params.orderId;
    deliveryBoy.findOne({_id})
    .then((DB)=>{
        console.log(DB);
        if(!DB.isFree){
            res.status(400).send({error:"First complete your previous order."})
            return;
        }
        const deliveryBoyInfo = {name:DB.name,phoneNumber:DB.phoneNumber,ratings:DB.ratings};
        console.log(deliveryBoyInfo);
        order.updateOne({_id:orderId},{$set:{assignedToDeliveryBoyId:DB._id,deliveryBoyInfo}})
        .then((ORDER)=>{
            console.log(ORDER);
            deliveryBoy.updateOne({_id},{$set:{currentOrder:orderId,isFree:false}})
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