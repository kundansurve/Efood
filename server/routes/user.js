const express = require('express');
const router = express.Router();
const loginCredential = require('../models/loginCredentials');
const hotel=require('../models/hotel');
const order = require('../models/order');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const dish = require('../models/dish');
const city =require('../models/city');

router.post('/signUp',(req,res)=>{
    
    const {email,password,firstName,lastName,phoneNumber} = req.body;
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
    loginCredential.findOne({email}).then(USER=>{
        if(USER){
            res.status(400).send({error:"User already Signed up"});
            return;
        }
        const hash=bcrypt.hashSync(password);
        const LoginCredential=new loginCredential({ email, password: hash,userType:"User"});

        LoginCredential.save().then(()=>{
            const User =new user({_id:LoginCredential._id, email,firstName,lastName,phoneNumber});
            User.save().then(()=>{
                req.session.userType = 'User';
                req.session.userId = LoginCredential._id;
                res.status(201).send({_id: LoginCredential._id ,email,firstName:firstName ,lastName:lastName,phoneNumber});
            });
        });
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});


// update cart
router.put('/addtocart',(req,res)=>{
    const _id=req.session._id;
    const {dishId}=req.body;
    dish.findOne({_id:dishId})
    .then((Dish)=>{
        if(Dish){
            user.findOne({_id})
            .then((USER)=>{
                if(Dish['hotelId']!=USER['cart']['hotelId']){
                    const newCart = {...USER.cart,"hotelId":Dish["hotelId"],"items":{},"price":Dish["price"]};
                    newCart['items'][dishId]=1;
                    user.updateOne({_id},{$set:{cart:newCart}})
                    .then((user)=>res.status(200).send(user.cart))
                    .catch(err=>res.status(400).send(err));
                    return;
                }else{
                    if(USER["cart"]["items"][dishId]){
                        const newCart = USER["cart"];
                        newCart['items'][dishId]=parseInt(newCart["items"][dishId])+1;
                        newCart['price']=newCart['price'] + Dish['price'];
                        user.updateOne({_id},{$set:{cart:newCart}})
                        .then((user)=>res.status(200).send(user.cart))
                        .catch(err=>res.status(400).send(err));
                        return;
                    }else{
                        const newCart =USER["cart"];
                        newCart['items'][dishId]=1;
                        newCart['price']=newCart['price'] + Dish['price'];2
                        user.updateOne({_id},{$set:{cart:newCart}})
                        .then((user)=>res.status(200).send(user.cart))
                        .catch(err=>res.status(400).send(err));
                        return;
                    }
                }
            })
        }else{
            res.status(404).send("No such Dish present");
        }        
    })
});

// Remove from Cart

router.put('/removefromcart',(req,res)=>{
    const _id=req.session.userId;;
    const {dishId}=req.body;
    dish.findOne({_id:dishId})
    .then((Dish)=>{
        if(Dish){
            user.findOne({_id})
            .then((USER)=>{
                if(USER['cart']['hotelId']){
                    if(USER['cart']['items'][dishId]){
                        if(USER['cart']['items'][dishId]>1){
                            const newCart = USER['cart'];
                            newCart['items'][dishId]=parseInt(newCart["items"][dishId])-1;
                            user.updateOne({_id},{$set:{cart:newCart}})
                            .then((user)=>res.status(200).send(user.cart))
                            .catch(err=>res.status(400).send(err));
                        }else{
                            const newCart = {"hotelId":Dish["hotelId"],"items":{}};
                            delete newCart['items'][dishId];
                            if(Object.keys(newCart['items']).length==0){
                                newCart['hotelId']=null;
                            }
                            user.updateOne({_id},{$set:{cart:newCart}})
                            .then((user)=>res.status(200).send(user.cart))
                            .catch(err=>res.status(400).send(err));
                            return;
                        }
                    }else{
                        res.status(404).send("There is no such Dish present in Cart");
                    }
                    return;
                }else{
                    res.status(404).send("Cart Is empty");
                    return;
                }
            })
        }else{
            res.status(404).send("No such Dish is present");
        }        
    })
});





//get past searches 
router.put('/pastsearches',(req,res)=>{
    const _id=req.session.userId;;
    const {searchData} = req.body;
    user.findOne({_id})
    .then((USER)=>{
        console.log(USER);
        if(USER){
            let pastSearches = USER["pastSearches"];
            pastSearches.push(searchData);
            console.log(pastSearches);
            user.updateOne({_id},{$set:{"pastSearches":pastSearches}})
            .then((user)=>{res.status(200).send("Search history updated");return})
            .catch(error=>{res.status(400).send(err)})
        }else{
            res.status(400).send("No such User");
        }
    }).catch(err=>{
        res.status(400).send({err});
    })

});

// update user info
router.put('/update',(req,res)=>{
    const update = req.body;
    user.UpdateOne({_id:req.session.userId},{$set:update})
    .then((USER)=>{
        res.status(200).send(USER);
    }).catch(err=>{
        res.status(400).send(err);
    })
});

// get order by id
router.get('/orders',(req,res)=>{
    order.find({placedByUserId:req.session.userId})
    .then((orders)=>{
        res.status(200).send({orders});
    }).catch(err=>{
        res.status(400).send({err});
    })
});


//place order
router.post('/placeorder',(req,res)=>{
    const placedByUserId=req.session.userId;
    
    const {cityId,deliveryLocation,isPaid,deliverCharges,totalPrice}=req.body;
    if(!cityId || !deliveryLocation || !isPaid || !deliverCharges || !totalPrice){
        res.status(401).send("Insufficient Data in request");
        return;
    }
    const Order=null;
    user.findOne({_id:placedByUserId})
    .then(USER=>{
        if(USER.cart.hotelId==null){
            res.status.send("Cart is Empty");
            return;
        }
        hotel.findOne({_id:USER.cart["hotelId"]})
        .then(HOTEL=>{
            if(hotel.cityId!=cityId){
                res.status(404).send("No such Hotel present in this city.");
                return;
            }
            const placedInHotelId = HOTEL._id;
            const userInfo = {name:USER.name,phoneNumber:USER.phoneNumber};
            const ORDER = new order({cityId,deliveryLocation,userInfo,isPaid,deliverCharges,totalPrice})
        }).catch(err=>{
            res.status(400).send({err});
        })
    }).catch(err=>{
        res.status(400).send({err});
    })
});

// delete order
router.delete('/delete/order/orderId',(req,res)=>{
    order.deleteOne({_id:req.params.orderId,placedByUserId:req.session.userId})
    .then(()=>{
        res.status(200).send("Order Deleted Successfully.")
    })
    .catch(err=>{
        res.status(400).send({err});
    })
});

router.post('/hotel/review',(req,res)=>{
    const _id = res.session.userId;
    const reviewType = 'Hotel';
    const {reviewForId,review,rating} =  req.body;
    review.findOne({reviewdById:_id,reviewForId})
    .then((REVIEW)=>{
        if(REVIEW){
            res.status(400).send("You have already reviewd this")
        }else{
            hotel.findOne({_id:reviewForId})
            .then((HOTEL)=>{
                const newRating = (Integer.parseInt(HOTEL.ratings)*Integer.parseInt(HOTEL.numberofRatings)+ rating)/(Integer.parseInt(HOTEL.numberofRatings)+1);
                const Review = new review({reviewdById:_id,reviewType,reviewForId,review,rating});
                Review.save()
                .then(()=>{
                    hotel.updateOne({_id,reviewdForId},{$set:{ratings:newRating},$inc:{numberofRatings:1}})
                    .then(()=>res.status(200).send("Successfull"))
                    .catch(err=>res.status(400).send({err}))
                }).catch(err=>res.status(400).send({err}))
            }).catch(err=>res.status(400).send({err}))
        }
    }).catch(err=>res.status(400).send({err}))
});

router.delete('/hotel/review/delete/:reviewId',(req,res)=>{
    const _id = res.session.userId;
    const reviewType = 'Hotel';
    const reviewId = req.params.reviewId;
    review.findOne({_id})
    .then((REVIEW)=>{
        if(!REVIEW){
            res.status(400).send("No such type of review")
        }else{
            if(_id!=REVIEW.reviewdById){
                res.status(400).send("You are not allowed to delete this review");
                return;
            }
            hotel.findOne({_id:reviewForId})
            .then((HOTEL)=>{
                let newRating=0;
                if(HOTEL.numberofRatings==0){
                    res.status(400).send("No one review this hotel yet");
                    return;
                }
                if(HOTEL.numberofRatings>1){
                    newRating = (Integer.parseInt(HOTEL.ratings)*Integer.parseInt(HOTEL.numberofRatings)+ REVIEW.rating)/(Integer.parseInt(HOTEL.numberofRatings)-1);
                }
                review.deleteOne({_id:reviewId})
                .then(()=>{
                    hotel.updateOne({_id,reviewdForId},{$set:{ratings:newRating},$dec:{numberofRatings:1}})
                    .then(()=>res.status(200).send("Successfull"))
                    .catch(err=>res.status(400).send({err}))
                }).catch(err=>res.status(400).send({err}))
            }).catch(err=>res.status(400).send({err}))
        }
    }).catch(err=>res.status(400).send({err}))
});



router.post('/dish/review',(req,res)=>{
    const _id = res.session.userId;
    const reviewType = 'Dish';
    const {reviewForId,review,rating} =  req.body;
    review.findOne({reviewdById:_id,reviewForId})
    .then((REVIEW)=>{
        if(REVIEW){
            res.status(400).send("You have already reviewd this")
        }else{
            dish.findOne({_id:reviewForId})
            .then((DISH)=>{
                const newRating = (Integer.parseInt(DISH.ratings)*Integer.parseInt(DISH.numberofRatings)+ rating)/(Integer.parseInt(DISH.numberofRatings)+1);
                const Review = new review({reviewdById:_id,reviewType,reviewForId,review,rating});
                Review.save()
                .then(()=>{
                    dish.updateOne({_id,reviewdForId},{$set:{ratings:newRating},$inc:{numberofRatings:1}})
                    .then(()=>res.status(200).send("Successfull"))
                    .catch(err=>res.status(400).send({err}))
                }).catch(err=>res.status(400).send({err}))
            }).catch(err=>res.status(400).send({err}))
        }
    }).catch(err=>res.status(400).send({err}))
});

router.delete('/dish/review/delete/:reviewId',(req,res)=>{
    const _id = res.session.userId;
    const reviewType = 'Dish';
    const reviewId = req.params.reviewId;
    review.findOne({_id})
    .then((REVIEW)=>{
        if(!REVIEW){
            res.status(400).send("No such type of review")
        }else{
            if(_id!=REVIEW.reviewdById){
                res.status(400).send("You are not allowed to delete this review");
                return;
            }
            dish.findOne({_id:reviewForId})
            .then((DISH)=>{
                let newRating=0;
                if(dish.numberofRatings==0){
                    res.status(400).send("No one review this dish yet");
                    return;
                }
                if(DISH.numberofRatings>1){
                    newRating = (Integer.parseInt(DISH.ratings)*Integer.parseInt(DISH.numberofRatings)+ REVIEW.rating)/(Integer.parseInt(DISH.numberofRatings)-1);
                }
                review.deleteOne({_id:reviewId})
                .then(()=>{
                    dish.updateOne({_id,reviewdForId},{$set:{ratings:newRating},$dec:{numberofRatings:1}})
                    .then(()=>res.status(200).send("Successfull"))
                    .catch(err=>res.status(400).send({err}))
                }).catch(err=>res.status(400).send({err}))
            }).catch(err=>res.status(400).send({err}))
        }
    }).catch(err=>res.status(400).send({err}))
});


router.post('/deliveryboy/review',(req,res)=>{
    const _id = res.session.userId;
    const reviewType = 'DeliveryBoy';
    const {reviewForId,review,rating} =  req.body;
    review.findOne({reviewdById:_id,reviewForId})
    .then((REVIEW)=>{
        if(REVIEW){
            res.status(400).send("You have already reviewd this")
        }else{
            deliveryBoy.findOne({_id:reviewForId})
            .then((DB)=>{
                const newRating = (Integer.parseInt(DB.ratings)*Integer.parseInt(DB.numberofRatings)+ rating)/(Integer.parseInt(DB.numberofRatings)+1);
                const Review = new review({reviewdById:_id,reviewType,reviewForId,review,rating});
                Review.save()
                .then(()=>{
                    deliveryBoy.updateOne({_id,reviewdForId},{$set:{ratings:newRating},$inc:{numberofRatings:1}})
                    .then(()=>res.status(200).send("Successfull"))
                    .catch(err=>res.status(400).send({err}))
                }).catch(err=>res.status(400).send({err}))
            }).catch(err=>res.status(400).send({err}))
        }
    }).catch(err=>res.status(400).send({err}))
});

router.delete('/deliveryboy/review/delete/:reviewId',(req,res)=>{
    const _id = res.session.userId;
    const reviewType = 'DeliveryBoy';
    const reviewId = req.params.reviewId;
    review.findOne({_id})
    .then((REVIEW)=>{
        if(!REVIEW){
            res.status(400).send("No such type of review")
        }else{
            if(_id!=REVIEW.reviewdById){
                res.status(400).send("You are not allowed to delete this review");
                return;
            }
            deliveryboy.findOne({_id:reviewForId})
            .then((DB)=>{
                let newRating=0;
                if(DB.numberofRatings==0){
                    res.status(400).send("No one review this deliveryBoy yet");
                    return;
                }
                if(DB.numberofRatings>1){
                    newRating = (Integer.parseInt(DB.ratings)*Integer.parseInt(DB.numberofRatings)+ REVIEW.rating)/(Integer.parseInt(DB.numberofRatings)-1);
                }
                review.deleteOne({_id:reviewId})
                .then(()=>{
                    dish.updateOne({_id,reviewdForId},{$set:{ratings:newRating},$dec:{numberofRatings:1}})
                    .then(()=>res.status(200).send("Successfull"))
                    .catch(err=>res.status(400).send({err}))
                }).catch(err=>res.status(400).send({err}))
            }).catch(err=>res.status(400).send({err}))
        }
    }).catch(err=>res.status(400).send({err}))
});


module.exports=router;