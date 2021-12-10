const express = require('express');
const router = express.Router();
const {hotelAuth}=require('../middlewares/auth');
const hotel=require('../models/hotel');
const deliveryBoy= require('../models/review');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const review = require('../models/review'); 

router.get('city/:name',(req,res)=>{
    const city=req.params.name;
    if(!city){
        res.status(400).send('City name was not present in response');
        return;
    }
    hotel.find({city})
    .then((hotels)=>{
        res.status(200).send({hotels});
    }).catch((error)=>{
        if(error){
            res.status.error(400).send({error});
            return;
        }
        res.status(200).send({error:"Internal server error"})
        return;
    });
});



router.post('/newdish',hotelAuth,(req,res)=>{
    const {name,isVeg,type,img,price}=req.body;
    const hotelId=req.session.userId;
    dish.find({name,hotelId})
    .then((oldDish)=>{
        if(oldDish){
            res.status(400).send('Two different dishes cannot have same name.');
        }else{
            const newDish = new dish({name,isVeg,type,img,price,hotelId});
            newDish.save()
            .then(({_id})=>{
                dish.findOne({_id})
                .then((Dish)=>{res.status.send(Dish)})
                .catch((error)=>{res.status(401).send({error})});             
            }).catch((error)=>{res.status(401).send({error})})
        }
    }).catch((error)=>{res.status(401).send({error})})
});

router.put('updatedish/:id',hotelAuth,(req,res)=>{
    const _id=req.params.id;
    dish.findOne({_id})
    .then((Dish)=>{
        if(Dish){
            res.status(400).send("Dish with this id is not present");
            return;
        }else{
            if(Dish.hotelId!=req.session.userId){
                res.status.send("Dish cannot be deleted");
                return;
            }
            dish.updateOne({_id},{ $inc: req.body })
            .then(dish.findOne({_id})
            .then((updatedDish)=>{
                    res.status(200).send(updatedDish);
                    return;
            }).catch((error)=>{res.status(401).send({error})})
            ).catch((error)=>{res.status(401).send({error})});
        }
    })
});


router.delete('/deletedish/:id',hotelAuth,(req,res)=>{
    const _id=req.params.id;
    dish.findOne({_id})
    .then((Dish)=>{
        if(Dish){
            res.status(400).send("Dish with this id is not present");
            return;
        }else{
            if(Dish.hotelId!=req.session.userId){
                res.status.send("Dish cannot be deleted");
                return;
            }
            dish.deleteOne({_id})
            .then(review.deleteMany({reviewType:'dish',reviewForId:_id})
            .then(res.status(200).send("Deleted"))
            .catch((error)=>{res.status(401).send({error})}))
            .catch((error)=>{res.status(401).send({error})})
        }
    })
});