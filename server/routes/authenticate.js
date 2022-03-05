const express = require('express');
const router = express.Router();
const {cityAdminAuth}=require('../middlewares/auth');
const hotel=require('../models/hotel');
const deliveryBoy= require('../models/review');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const review = require('../models/review');


//Get user info by userId
router.get('/me',(req,res)=>{
    const _id=req.session.userId;
    const userType=req.session.userType;
    console.log(req.session.userId+" "+req.session.userType);
    if(userType==='City'){
        city.findOne({_id})
        .then((City)=>{
            res.status(200).send({City});
            return;
        })
        .catch((error)=>{
            if(error){
                res.status(400).send({error});
                return;
            }
            res.status(400).send({error:"Internal Server Error"});
                return;
        });
    }
    else if(userType==='Admin'){
        admin.findOne({_id})
        .then((Admin)=>{
            res.status(201).send({Admin});
            return;
        })
        .catch((error)=>{
            if(error){
                res.status(400).send({error});
                return;
            }
            res.status(400).send({error:"Internal Server Error"});
                return;
        });
    }
    else if(userType==='Hotel'){
        hotel.findOne({_id})
        .then((user)=>{
            res.status(200).send({user});
            return;
        })
        .catch((error)=>{
            if(error){
                res.status(400).send({error});
                return;
            }
            res.status(400).send({error:"Internal Server Error"});
                return;
        });
    }
    else if(userType==='User' || userType==='USER'){
        user.findOne({_id})
        .then((user)=>{
            console.log({user});
            res.status(200).send({user});
            return;
        })
        .catch((error)=>{
            if(error){
                res.status(400).send({error});
                return;
            }
            res.status(400).send({error:"Internal Server Error"});
                return;
        });
    }
    else if(userType==='DeliveryBoy'){
        deliveryBoy.findOne({_id})
        .then((user)=>{
            res.status(200).send({user});
            return;
        })
        .catch((error)=>{
            if(error){
                res.status(400).send({error});
                return;
            }
            res.status(400).send({error:"Internal Server Error"});
                return;
        });
    }else{
        res.status(400).send({error:"No such type of User"});
    }
});

module.exports=router;