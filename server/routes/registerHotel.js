const express = require('express');
const router = express.Router();
const {cityAdminAuth}=require('../middlewares/auth');
const loginCredential = require('../models/loginCredentials');
const hotel=require('../models/hotel');
const deliveryBoy= require('../models/review');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const review = require('../models/review');
const order = require('../models/order');

router.post('/',(req,res)=>{
    const {email,name,phoneNumber,location,cityId,password}=req.body;
    if(!email || !name || !phoneNumber || !cityId || !location || !password){
        res.status(404).send("Incomplete request");
        return;
    }
    const img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpDrLzJ3tLjXZN_gm8Nb2BWJwbq2aUiBSKyA&usqp=CAU";
    const hash=bcrypt.hashSync(password);
    const LoginCredential=new loginCredential({ email,phoneNumber, password: hash,userType:"Hotel",img});
    LoginCredential.save().then(()=>{
        const Hotel = new hotel({_id: LoginCredential._id,phoneNumber,email,name,cityId,location,img});
        Hotel.save().then(()=>{
            req.session.userType = 'Hotel';
        req.session.userId = LoginCredential._id;
            res.status(200).send({user:Hotel,userType:'Hotel'});
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