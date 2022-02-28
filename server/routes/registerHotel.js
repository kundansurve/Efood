const express = require('express');
const router = express.Router();
const {cityAdminAuth}=require('../middlewares/auth');
const hotel=require('../models/hotel');
const deliveryBoy= require('../models/review');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const review = require('../models/review');
const order = require('../models/order');

router.post('/newhotel',(req,res)=>{
    const cityId= "61ed7d6f3db0669d5c1aabac";
    const {email,name,phoneNumber,location,password}=req.body;
    if(!email || !name || !cityId || !location || !password){
        res.status(400).send("Incomplete request");
        return;
    }
    const hash=bcrypt.hashSync(password);
    const LoginCredential=new loginCredential({ email,phoneNumber, password: hash,userType:"User"});
    LoginCredential.save().then(()=>{
        const Hotel = new hotel({_id: LoginCredential._id,email,name,cityId,location});
        Hotel.save().then(()=>{
            res.status(200).send({hotel:Hotel})
            return;
        }).catch(error=>{res.status(400).send(error)});
    }).catch(error=>{res.status(400).send(error)});
    
});

router.delete('/deletehotel/:id',(req,res)=>{
    const cityId = req.session.userId;
    const _id=req.params.id;
    hotel.findOne({_id,cityId})
    .then((Hotel)=>{
        if(Hotel){
            res.status(400).send("Hotel with this id is not present");
            return;
        }else{
            Hotel.deleteOne({_id})
            .then(review.deleteMany({reviewType:'hotel',reviewForId:_id})
            .then(()=>{
                LoginCredential.deleteOne({_id})
                .then(()=>{res.status(200).send("Deleted")})
                .catch(err=>{res.status.send(err);});
            })
            .catch((error)=>{res.status(401).send({error})}))
            .catch((error)=>{res.status(401).send({error})})
        }
    })
});

module.exports=router;