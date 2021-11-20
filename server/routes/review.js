const express = require('express');
const router = express.Router();
const authenticate=require('../middlewares/authenticate');
const hotel=require('../models/hotel');
const deliveryBoy= require('../models/review');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const review = require('../models/review'); 

router.get('/',(req,res)=>{
    const {reviewType,reviewForId}=req.body;
    if(!reviewType && !reviewForId){
        res.status(400).send({error:"Review Type and reviewForId not present"})
    }
    review.find({reviewType,reviewForId})
    .then((reviews)=>{
        res.status(200).send({reviews});
        return;
    })
    .catch((error)=>{
        if(error){
            res.status(400).send({error});
            return;
        }
        res.status(400).send({error:"Internal Server Error"});
    });    
});

router.post('/',authenticate,(req,res)=>{
    if(req.session.userType!='user'){
        res.status(400).send("Only User can review");
        return;
    }
    const {reviewforId,userReview,rating,reviewType}=req.body;
    const reviewedByid=req.session.userId;
    if(!reviewforId && !reviewedByid && !userReview && !rating && !reviewType){
        res.status(400).send({error:"review details not provided"});
        return;
    }
    review.find({reviewforId,reviewedById,reviewType})
    .then((Review)=>{
        if(Review){
            res.status().send({error:"User has already reviewed"});
            return;
        }else{
            const UserReview = new review({reviewType,reviewforId,reviewforName,reviewedById,reviewedByName,review:userReview,rating});
            UserReview.save()
            .then(review.findOne({reviewType,reviewforId,reviewedById})
            .then((rev)=>res.status(201).send(rev)).catch((error)=>{
                res.status(400).send({error});
            }))
            .catch((error) => {
                res.status(500).send({ error: "Internal Server Error" });
            });
        }
    })
    .catch((error)=>{
        if(error){
            res.status(400).send({error});
            return;
        }
        res.status(400).send({error:"Internal Sever Error"});
        return;
    });
});

router.delete('/:id',authenticate(),(req,res)=>{
    const _id=req.params.id;
    const {reviewType}=req.body;
    if(req.session.userType!='user'){
        res.status(400).send({error:"Only user has authority to review this category"});
    }
    if(!_id || !reviewType){
        res.status(400).send({error:"id or reviewType not provided"});
        return;
    }
    review.findOne({_id,reviewType:"hotel"})
    .then((rev)=>{
        if(!rev){
            res.status(400).send({error:`Review of id ${id} not present in database`});
        }else if(rev.reviewdById===req.session.userId){
            review.deleteOne({_id,});
            res.status(200).send({succes:`Review with id ${_id} was Deleted succesfully`});
        }else{
            res.status(400).send({error:'User can delete review only reviews which is reviewd by him'})
        }
    });
});