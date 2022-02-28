const express = require('express');
const router = express.Router();
const {cityAdminAuth}=require('../middlewares/auth');
const hotel=require('../models/hotel');
const deliveryBoy= require('../models/review');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const review = require('../models/review');
const order = require('../models/order');

router.get('/orders',(req,res)=>{
    order.find({cityId:req.session.userId})
    .then((orders)=>{
        res.status.send({orders})
    }).catch((error)=>{
        res.status.send({error});
    })
});

router.post('/newdeliveryboy',(req,res)=>{
    const cityId= req.session.userId;
    const {email,name,location,password}=req.body;
    if(!email || !name || !cityId || !location || !password){
        res.status(400).send("Incomplete request");
        return;
    }
    const hash=bcrypt.hashSync(password);
    const LoginCredential=new loginCredential({ email, password: hash,userType:"User"});
    LoginCredential.save().then(()=>{
        const DeliveryBoy = new deliveryBoy({_id: LoginCredential._id,email,name,cityId,location});
        DeliveryBoy.save().then(res.status(200).send({deliveryBoy:DeliveryBoy}))
        .catch(error=>{res.status(400).send(error)});
    }).catch(error=>{res.status(400).send(error)});
    
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