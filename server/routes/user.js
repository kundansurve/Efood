const express = require('express');
const router = express.Router();
const loginCredential = require('../models/loginCredentials');
const hotel=require('../models/hotel');
const order = require('../models/order');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const dish = require('../models/dish');
const city =require('../models/city');
const review = require('../models/review');

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
    //const _id=req.session.userId;
    const _id="622ee28c71f99c3c14dcfa91";
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

router.put('/changeaddress', (req, res) => {
    //const _id=req.session.userId;
    const _id = "622ee28c71f99c3c14dcfa91";
    const address = req.body;
    user.findOne({ _id })
        .then((USER) => {
            if (!USER) {
                res.status(400).send({ error: "Wrong User" });
                return;
            }
            if (USER.cart.hotelId==null) {
                res.status(400).send({ error: "Cart is empty." });
                return;
            }
            const newCart = USER["cart"];
            newCart['address'] = address;
            user.updateOne({ _id }, { $set: { cart: newCart } })
                .then((user) => {
                    res.status(200).send(user.cart);
                    return;
                })
                .catch(err => res.status(400).send(err));
            return;

        }).catch(err => res.status(400).send(err));
});

// Remove from Cart

router.put('/removefromcart',(req,res)=>{
    //const _id=req.session.userId;
    const _id="622ee28c71f99c3c14dcfa91";
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
                            newCart['price']=newCart['price'] - Dish['price'];
                            user.updateOne({_id},{$set:{cart:newCart}})
                            .then(()=>res.status(200).send())
                            .catch(err=>res.status(400).send(err));
                        }else{
                            const newCart = USER['cart'];
                            delete newCart['items'][dishId];
                            
                            newCart['price']=newCart['price'] - Dish['price'];
                            if(Object.keys(newCart['items']).length==0){
                                newCart['hotelId']=null;
                            }
                            user.updateOne({_id},{$set:{cart:newCart}})
                            .then(()=>res.status(200).send())
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
    }).catch(err=>{
        res.status(400).send({err});
    })

});





//get past searches 
router.put('/pastsearches',(req,res)=>{
     //const _id=req.session.userId;
     const _id="622ee28c71f99c3c14dcfa91";
    const {searchData} = req.body;
    user.findOne({_id})
    .then((USER)=>{
        if(USER){
            let pastSearches = USER["pastSearches"];
            pastSearches.push(searchData);
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
     //const _id=req.session.userId;
     const _id="622ee28c71f99c3c14dcfa91";
    const update = req.body;
    user.UpdateOne({_id:_id},{$set:update})
    .then((USER)=>{
        res.status(200).send(USER);
    }).catch(err=>{
        res.status(400).send(err);
    })
});

// get order by id
router.get('/orders',(req,res)=>{
     //const _id=req.session.userId;
     const _id="622ee28c71f99c3c14dcfa91";
    order.find({placedByUserId:_id})
    .then((orders)=>{
        res.status(200).send({orders});
    }).catch(err=>{
        res.status(400).send({err});
    })
});

router.get('/orders/:orderId',(req,res)=>{
    //const _id=req.session.userId;
    const orderId=req.params.orderId;
    const _id="622ee28c71f99c3c14dcfa91";
    order.findOne({placedByUserId:_id,_id:orderId})
    .then((OrderDetail)=>{
        res.status(200).send({OrderDetail});
    }).catch(error=>{
        res.status(400).send({error});
    })
});

//place order
router.post('/placeorder',(req,res)=>{
    //const placedByUserId=req.session.userId;
    const placedByUserId="622ee28c71f99c3c14dcfa91";
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
            if(HOTEL){
                res.status(404).send("No such Hotel present in this city.");
                return;
            }
            const placedInHotelId = HOTEL._id;
            const userInfo = {name:USER.name,phoneNumber:USER.phoneNumber};
            const ORDER = new order({cityId,deliveryLocation,userInfo,isPaid,deliverCharges,totalPrice});
            ORDER.save()
            .then(()=>{
                res.status(200).send("Order Placed Succesfully!")
            })
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

router.post('/createreview/order',(req,res)=>{
    const {hotelReview,hotelRating,deliveryExecutiveRating,deliveryExecutiveReview,reviewedByName,orderId} = req.body;
    if(!reviewedByName || !orderId || !hotelReview || !hotelRating ||   !deliveryExecutiveReview || !deliveryExecutiveRating){
        res.status(400).send({error:"Incomplete api call"});
        return;
    }
    review.findOne({orderId:orderId})
    .then((data)=>{
        if(data){
            return res.status(400).send("This order is already reviewed")
        }
        order.findOne({_id:orderId})
        .then((orderData)=>{
            if(!orderData){
                return res.status(400).send("Wrong orderId no such order is present");
            }
            if(orderData.placedByUserId!=req.session.userId){
                return res.status(400).send("You cannot review this Order");
            }
            if(orderData.status!="Delivered"){
                return res.status(200).send("Order is not yet Delivered");
            }
            const Review = new review({hotel:{hotelId:orderData.placedInHotelId,dishId:Object.keys(orderData.order),review:hotelReview,rating:hotelRating},cityId:orderData.cityId,reviewedByName,reviewedById:orderData.placedByUserId,orderId:orderData._id,deliveryExecutive:{deliveryExecutiveId:orderData.assignedToDeliveryBoyId,review:deliveryExecutiveReview,rating:deliveryExecutiveRating}});
            Review.save()
            .then(()=>{
                
                res.status(200).send({hotel:{hotelId:orderData.placedInHotelId,dishId:Object.keys(orderData.order),review:hotelReview,rating:hotelRating},cityId:orderData.cityId,reviewedByName,reviewedById:orderData.placedByUserId,orderId:orderId,deliveryExecutive:{deliveryExecutiveId:orderData.assignedToDeliveryBoyId,review:deliveryExecutiveReview,rating:deliveryExecutiveRating}});
                return;
            })
            .catch(error=>{
                res.status(400).send({error});
                return;
            })
        })
        .catch(error=>{
            
            res.status(400).send({error});
        })
    })
    .catch(error=>{
        
        res.status(400).send({error});
    })
})

router.put('/editreview/order',(req,res)=>{
    const {hotelReview,hotelRating,deliveryExecutiveRating,deliveryExecutiveReview,reviewedByName,orderId} = req.body;
    if(!reviewedByName || !orderId || !hotelReview || !hotelRating ||   !deliveryExecutiveReview || !deliveryExecutiveRating){
        res.status(400).send("Incomplete api call");
        return;
    }
    review.findOne({orderId:orderId})
    .then((data)=>{
        if(!data){
            return res.status(400).send("This order is not reviewed yet")
        }
        order.findOne({_id:orderId,placedByUserId:req.session.userId})
        .then((orderData)=>{
            if(!orderData){
                return res.status(400).send("Wrong orderId no such order is present");
            }
            if(orderData.status!="Delivered"){
                return res.status(200).send("Order is not yet Delivered");
            }
            review.updateOne({orderId:orderId},{$set:{hotel:{hotelId:orderData.placedInHotelId,dishId:Object.keys(orderData.order),review:hotelReview,rating:hotelRating},reviewedByName,reviewedById:orderData.placedByUserId,orderId:orderData._id,deliveryExecutive:{deliveryExecutiveId:orderData.assignedToDeliveryBoyId,review:deliveryExecutiveReview,rating:deliveryExecutiveRating}}})
            .then(()=>{
                res.status(200).send({hotel:{hotelId:orderData.placedInHotelId,dishId:Object.keys(orderData.order),review:hotelReview,rating:hotelRating},reviewedByName,reviewedById:orderData.placedByUserId,orderId:orderData._id,deliveryExecutive:{deliveryExecutiveId:orderData.assignedToDeliveryBoyId,review:deliveryExecutiveReview,rating:deliveryExecutiveRating}});
            })
            .catch(error=>{
                res.status(400).send({error});
            })
        })
        .catch(error=>{
            res.status(400).send({error});
        })
    })
    .catch(error=>{
        res.status(400).send({error});
    })
})

router.delete('/deletereview/order',(req,res)=>{
    const {_id} = req.body;
    if(!_id){
        res.status(400).send("Incomplete api call");
        return;
    }
    review.findOne({_id})
    .then((data)=>{
        if(!data){
            return res.status(400).send("This order is not reviewed yet")
        }
        order.findOne({_id:orderId,placedByUserId:req.session.userId})
        .then((orderData)=>{
            if(!orderData){
                return res.status(400).send("Wrong orderId no such order is present");
            }
            if(orderData.status!="Delivered"){
                return res.status(200).send("Order is not yet Delivered");
            }
            review.deleteOne({_id})
            .then(()=>{
                res.status(200).send("Review Deleted");
            })
            .catch(error=>{
                res.status(400).send({error});
            })
        })
        .catch(error=>{
            res.status(400).send({error});
        })
    })
    .catch(error=>{
        res.status(400).send({error});
    })
})



module.exports=router;