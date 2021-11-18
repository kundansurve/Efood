const express = require('express');
const router = express.Router();

const authenticate=require('../middlewares/authenticate');

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

// Get all Hotels in that city or region.
router.get('/hotel',(req,res)=>{
    
});

//get hotels by name
router.get('/hotel',(req,res)=>{

});

// get all dishes offered
router.get('/dishes',(req,res)=>{

});

// get dishes by name
router.get('/dish',(req,res)=>{

});

// get dishes by hotels
router.get('/hotel/dishes',(req,res)=>{

});

// get all past orders details
router.get('/orders',(req,res)=>{

});


// get all dishes in cart
router.put('/cart',(req,res)=>{

});

// update cart
router.put('/updatecart',(req,res)=>{

});

//get past searches 
router.get('/pastSearches',(req,res)=>{

})

// update user info
router.put('/update',(req,res)=>{

});

// get order by id
router.get('/order',(req,res)=>{

});

//remove order
router.post('/order/remove',(req,res)=>{

});