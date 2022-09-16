const express = require('express');
const router = express.Router();
const loginCredential = require('../models/loginCredentials');
const bcrypt = require('bcryptjs');
const USERDB = require('./../models/user');
const deliveryBoy = require('../models/deliveryBoy');
const city = require('../models/city');
const hotel = require('../models/hotel');

router.post('/',(req,res)=>{
    if (!req.body) {
        res.status(404).send({error: "Email and Password not present in request"});
        return;
    }

    const { email, password } = req.body;

    if (!email) {
        res.status(404).send({error: "Email must be provided"});
        return;
    }

    if (!password) {
        res.status(404).send({error: "Without password cannot login"});
        return;
    }
    loginCredential.findOne({ email }).then(user => {
        if (!user) {
            res.status(404).send({error: "User not signed up"});
            return;
        }

        const match = bcrypt.compareSync(password, user.password);

        if (!match) {
            res.status(404).send({error: "Incorrect email or password"});
            return;
        }
        
        req.session.userType = user.userType;
        req.session.userId = user.id;
        if(user.userType=="User"){
            USERDB.findOne({_id:user.id})
            .then((USERDATA)=>{
                if(!USERDATA){
                    res.status(400).send({message:"Something Wrong with userData"});
                    return;
                }
                res.status(201).send({userType:req.session.userType,user:USERDATA});
            }).catch(error=>{
                console.log(error);
                res.status(404).send({message:"Something Wrong with userData fetching"});
            })
        }else if(user.userType=="DeliveryExecuitve"){
            deliveryBoy.findOne({_id:user.id})
            .then((DATA)=>{
                if(!DATA){
                    res.status(400).send({message:"Something Wrong with Delivery Executive"});
                    return;
                }
                res.status(201).send({userType:req.session.userType,user:DATA});
            }).catch(error=>{
                console.log(error);
                res.status(400).send({message:"Something Wrong with Delivery Executive fetching"});
            })
        }else if(user.userType=="City"){
            city.findOne({_id:user.id})
            .then((DATA)=>{
                if(!DATA){
                    res.status(400).send({message:"Something Wrong with city userData"});
                    return;
                }
                res.status(201).send({userType:req.session.userType,user:DATA});
            }).catch(error=>{
                console.log(error);
                res.status(400).send({message:"Something Wrong with city userData fetching"});
            })
        }else{
            hotel.findOne({_id:user.id})
            .then((DATA)=>{
                if(!DATA){
                    res.status(400).send({message:"Something Wrong with Hotel admin Data"});
                    return;
                }
                res.status(201).send({userType:req.session.userType,user:DATA});
            }).catch(error=>{
                console.log(error);
                res.status(400).send({message:"Something Wrong with Hotel admin fetching"});
            })
        }
        return;
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.delete('/me', (req, res) => {
    if(!req.session.userId){
        res.status(400).send({error:"YOU ARE NOT LOGIN"});
        return;
    }
    delete req.session.userId;
    delete req.session.userType;
    //console.log("deleted userid");
    res.status(204).send("deleted session");
});

module.exports=router;