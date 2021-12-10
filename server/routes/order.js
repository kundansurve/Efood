const express = require('express');
const router = express.Router();
const authenticate=require('../middlewares/authenticate');
const hotel=require('../models/hotel');
const deliveryBoy= require('../models/review');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const review = require('../models/review'); 

router.get('/user/orders',authenticate,(req,res)=>{
    let id=req.session.userId;
    if(req.session.userType==='admin'){
        id=req.body.id;
    }
    if(req.session.userType==='user' || req.session.userType==='admin'){
        order.find({placedByUser:id})
        .then((orders)=>{
            res.status(200).send({orders});
        }).catch((error)=>{
            res.status(400).send({error});
        })
    }
});

router.get('/hotel/orders',authenticate,(req,res)=>{
    let id=req.session.userId;
    if(req.session.userType==='admin'){
        id=req.body.id;
    }
    if(!req.session.userType==='hotel' && !req.session.userType==='admin'){
        res.status(400).send("Only User has Access to view the orders");
        return;
    }
    order.find({placedInHotel:id})
    .then((orders)=>{
        res.status(200).send({orders});
        return;
    }).catch((error)=>{
        res.status(400).send({error});
    })
});

router.post('/order',(req,res)=>{
    let id=req.session.userId;
    if(req.session.userType==='admin'){
        id=req.body.id;
    }
    if(!req.session.userType==='deliveryBoy' && !req.session.userType==='admin'){
        res.status(400).send("Only User has Access to view the orders");
        return;
    }
    order.find({assignedToDeliveryBoy:id})
    .then((orders)=>{
        res.status(200).send({orders});
        return;
    }).catch((error)=>{
        res.status(400).send({error});
    })
});



router.post('/order',(req,res)=>{
    let id=req.session.userId;
    
    if(!req.session.userType==='deliveryBoy' && !req.session.userType==='admin'){
        res.status(400).send("Only User has Access to create the orders");
        return;
    }
});