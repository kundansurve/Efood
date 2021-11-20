const express = require('express');
const router = express.Router();
const authenticate=require('../middlewares/authenticate');
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

router.post('/newhotel',authenticate,(req,res)=>{

    
})

router.delete('/',(req,res)=>{

})