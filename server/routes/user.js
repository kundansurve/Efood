const express = require('express');
const router = express.Router();

const authenticate=require('../middlewares/authenticate');

const hotel=require('../models/hotel');

const bcrypt = require('bcryptjs');
const user = require('../models/user');

router.post('/',(req,res)=>{
    
    const {email,password,firstName,lastName} = req.body;
    if(!email){
        res.status(400).send({error:"Email not provided"});
        return;
    }
    if(!password){
        res.status(400).send({error:"Password not provided"});
        return;
    }
    if(!phoneNumber){
        res.status(400).send({error:"Password not provided"});
        return;
    }
    loginCredential.findOne({email}).then(user=>{
        if(user){
            res.status(400).send({error:"User already Signed up"});
            return;
        }
        const hash=bcrypt.hashSync(password);
        const LoginCredential=new loginCredential({ email, password: hash,});

        LoginCredential.save().then(()=>{
            const user =new User({_id:LoginCredential.id, email,firstName:firstName ,lastName:lastName});
            user.save().then(()=>{
                res.status(201).send({_id: LoginCredential.id ,firstName:firstName ,lastName:lastName});
            });
        });
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});


//Get user info by userId
router.get('/me',authenticate,(req,res)=>{
    const _id=req.session.userId;
    const userType=req.session.userType;
    if(userType==='Hotel'){
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
    if(userType==='User'){
        user.findOne({_id})
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
    if(userType==='DeliveryBoy'){
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
    }
});

// get all dishes offered
router.get('/dishes',authenticate,(req,res)=>{
    const {name,city,hotelId} = req.body;
    if(!name && !city && !hotelId){
        res.status(400).send({error:"Dish name, city name, hotelid any one of these must be provided"});
    }
    const query={};
    if(name){
        query={...query,name};
    }
    if(city){
        query={...query,city};
    }if(hotelId){
        query={...query,hotelId};
    }
    dish.find(query)
        .then((dishes)=>{
            res.status(200).send({"hotels":dishes});
            return;
        })
        .catch(
            (error)=>{
                if(error)res.status().send({"error":error});
                res.status(400).send({"error":"Internal Server Error"});
                return;
            }
        );
});

// update cart
router.put('/updatecart',(req,res)=>{
    
});

//get past searches 
router.get('/pastSearches',(req,res)=>{

});

// update user info
router.put('/update',(req,res)=>{

});

// get order by id
router.get('/order',(req,res)=>{

});

//remove order
router.post('/order/remove',(req,res)=>{

});