const express = require('express');
const router = express.Router();
const city = require('../models/city');
const {cityAdminAuth}=require('../middlewares/auth');
const hotel=require('../models/hotel');
const deliveryBoy= require('../models/deliveryBoy');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const review = require('../models/review');


//Get user info by userId
router.get('/me',(req,res)=>{
    const _id=req.session.userId;
    const userType=req.session.userType;
    if(!_id){
        res.status(400).send({error:"You are not Login"});
        return;
    }
    if(userType==='City'){
        city.findOne({_id})
        .then((City)=>{
            res.status(200).send({user:City,userType:'City'});
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
    /*else if(userType==='Admin'){
        admin.findOne({_id})
        .then((Admin)=>{
            Admin.userType='Admin';
            res.status(201).send({user:Admin,userType:'Admin'});
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
    }*/
    else if(userType==='Hotel'){
        hotel.findOne({_id})
        .then((user)=>{
            res.status(200).send({user,userType:'Hotel'});
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
            res.status(200).send({user,userType:'User'});
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
    else if(userType==='DeliveryExecutive'){
        deliveryBoy.findOne({_id})
        .then((user)=>{
            user.userType='DeliveryExecutive';
            res.status(200).send({user,userType:'DeliveryExecutive'});
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