const express = require('express');
const router = express.Router();
const {adminAuth}=require('../middlewares/auth');
const hotel=require('../models/hotel');
const deliveryBoy= require('../models/review');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const review = require('../models/review');

router.get('/orders',adminAuth,(req,res)=>{
    res.status.send(orders);
});

router.post('/newhotel',adminAuth,(req,res)=>{
    const {email,name,city,address,addressCoordinates}=new hotel(req.body);
    if(!email || !name || !city || !address || !addressCoordinates){
        res.status(400).send("Incomplete request");
        return;
    }
    const Hotel = new hotel({email,name,city,address,addressCoordinates});
    Hotel.save().then(res.status(200).send("succesfull"))
    .catch(error=>{res.status(400).send(error)});
});

router.delete('/deletehotel/:id',adminAuth,(req,res)=>{
    const _id=req.params.id;
    hotel.findOne({_id})
    .then((Hotel)=>{
        if(Hotel){
            res.status(400).send("Hotel with this id is not present");
            return;
        }else{
            Hotel.deleteOne({_id})
            .then(review.deleteMany({reviewType:'hotel',reviewForId:_id})
            .then(res.status(200).send("Deleted"))
            .catch((error)=>{res.status(401).send({error})}))
            .catch((error)=>{res.status(401).send({error})})
        }
    })
});


router.post('/newhotel',adminAuth,(req,res)=>{
    
});

router.delete('/deletehotel/:id',adminAuth,(req,res)=>{
    
});