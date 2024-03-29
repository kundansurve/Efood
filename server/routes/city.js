const express = require('express');
const router = express.Router();
const {cityAdminAuth}=require('../middlewares/auth');
const loginCredential = require('../models/loginCredentials');
const hotel=require('../models/hotel');
const deliveryBoy= require('../models/deliveryBoy');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const review = require('../models/review');
const order = require('../models/order');

router.get('/orders',(req,res)=>{
    const cityId = req.session.userId;
    order.find({cityId:cityId})
    .then((orders)=>{
        res.status(200).send({orders})
    }).catch((error)=>{
        res.status(400).send({error});
    })
});

router.get('/hotels',(req,res)=>{
    const cityId = req.session.userId;
    hotel.find({cityId:cityId})
    .then((hotels)=>{
        res.status(200).send({hotels})
    }).catch((error)=>{
        res.status(400).send({error});
    })
});

router.post('/new-delivery-executive',(req,res)=>{
    const cityId= req.session.userId;
    const {email,name,location,password,phoneNumber}=req.body;
    if(!email || !name || !cityId || !location || !password || !phoneNumber){
        res.status(400).send({error:"Please fill all the details"});
        return;
    }
    loginCredential.findOne({email})
    .then(LG=>{
        if(LG){
            res.status(400).send({error:"Email Already Registered"});
            return;
        }
        const hash=bcrypt.hashSync(password);
    const LoginCredential=new loginCredential({ email, password: hash,userType:"DeliveryExecutive"});
    LoginCredential.save().then(()=>{
        const DeliveryBoy = new deliveryBoy({_id: LoginCredential._id,email,name,cityId,location,phoneNumber});
        DeliveryBoy.save().then(()=>{
            res.status(200).send({"Status":"Success"})
            return;
        })
        .catch(error=>{res.status(400).send(error)});
    }).catch(error=>{res.status(400).send(error)});
    }).catch(error=>{
        console.log(error);
        res.status.send({errorMessage:"Server Error"});
    })
    
    
});

router.get('/delivery-executives',(req,res)=>{
    const cityId = req.session.userId;
    deliveryBoy.find({cityId})
    .then((DeliveryExecutives)=>{
        if(DeliveryExecutives){
            res.status(200).send({deliveryExecutives:DeliveryExecutives});
            return;
        }else{
            res.status(400).send({deliveryExecutives:[]});
            return;
        }
    })
});

router.delete('/deleteDeliveryBoy/:id',(req,res)=>{
    const cityId = req.session.userId; 
    const _id = req.params.id;
    deliveryBoy.findOne({_id,cityId})
    .then((DeliveryBoy)=>{
        if(DeliveryBoy){
            res.status(400).send("Delivery Boy with this id is not present");
            return;
        }else{
            deliveryBoy.deleteOne({_id})
            .then(review.deleteMany({reviewType:'DeliveryBoy',reviewForId:_id})
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

module.exports = router;