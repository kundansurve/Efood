const express = require('express');
const router = express.Router();
const user = require('./routes/user');
const sessions = require('./routes/sessions');
const authenticate =require('./routes/authenticate');
const hotel = require('./routes/hotels');
const deliveryBoy = require('./routes/deliveryBoy');
const city = require('./routes/city');
const City = require('./models/city');
const DeliveryBoy = require('./models/deliveryBoy');
const Dish = require('./models/dish');
const Hotel =require('./models/hotel');
const Review =require('./models/review');
const userDb = require('./models/user');
const registerHotel=require('./routes/registerHotel');


router.use(express.json());
router.use(express.urlencoded({ extended: true })); 


router.use('/user/me', user);

router.use('/hotel/me',hotel);

router.use('/delivery-executive/me',deliveryBoy);

router.use('/authenticate',authenticate);

router.use('/city/me',city);

router.use('/sessions', sessions);

router.use('/hotel/register',registerHotel);

router.get('/hotel/dishes/:hotelId',(req,res)=>{
    
    Dish.find({hotelId:req.params.hotelId})
        .then((dishes)=>{
            res.status(200).send({"dishes":dishes});
            return;
        })
        .catch(
            (error)=>{
                if(error)res.status().send({"error":error});
                res.status(400).send({"error":"Internal Server Error"});
                return;
            }
        );
})

router.get('/hotels/top-rated/:cityId',(req,res)=>{
    function compare( a, b ) {
        if ( a.rating > b.rating ){
          return -1;
        }
        if ( a.rating < b.rating ){
          return 1;
        }
        return 0;
      }
      function compare2( a, b ) {
        if ( a.ratings > b.ratings ){
          return -1;
        }
        if ( a.ratings < b.ratings ){
          return 1;
        }
        return 0;
      }
    Review.aggregate([{$match:{cityId:req.params.cityId}},{$group:{"_id":"$hotel.hotelId","rating":{"$avg":"$hotel.rating"}}}])
    .then((topHotels)=>{
       topHotels.sort(compare);
       const arr = [];
        for(let a of topHotels){
            arr.push(a._id);
        }
        if(arr.length==0){
            res.status(200).send({hotels:[],ratings:[]});
            return;
        }
       Hotel.find({cityId:req.params.cityId,"_id":arr.slice(0,10)})
       .then((data)=>{
        for(let a of data){
            for(let b of topHotels){
                if(a._id==b._id){
                    a.ratings=b.rating;
                    break;
                }
            }
        }
        data.sort(compare2);
        res.status(200).send({hotels:data,ratings:topHotels.slice(0,10)});
    }).catch(error=>{
        res.status(400).send({error:error});
    })    
    }).catch(error=>{
        res.status(400).send({error:error});
    })
    
})

router.get('/dishes/top-rated/:cityId',(req,res)=>{
    function compare( a, b ) {
        if ( a.rating > b.rating ){
          return -1;
        }
        if ( a.rating < b.rating ){
          return 1;
        }
        return 0;
      }
      function compare2( a, b ) {
        if ( a.ratings > b.ratings ){
          return -1;
        }
        if ( a.ratings < b.ratings ){
          return 1;
        }
        return 0;
      }
      Review.aggregate([{$match:{cityId:req.params.cityId}},{$unwind: "$hotel.dishId" },{$group:{"_id":"$hotel.dishId","rating":{"$avg":"$hotel.rating"}}}])
      .then((dishRating)=>{
        dishRating.sort(compare);
        const arr = [];
        for(let a of dishRating){
            arr.push(a._id);
        }
        if(arr.length==0){
            res.status(200).send({dishes:[],ratings:[]});
            return;
        }
        Dish.find({cityId:req.params.cityId,_id:arr.slice(0,10)})
        .then(data=>{
            for(let a of data){
                for(let b of dishRating){
                    if(a._id==b._id){
                        a.ratings=b.rating;
                        break;
                    }
                }
            }
            data.sort(compare2);
            res.status(200).send({dishes:data,ratings:dishRating});
        }).catch(error=>{
            res.status(400).send({error});
        })
      }).catch(error=>{
        res.status(400).send({error});
    }) 
    
})

router.get('/city/dishes/:cityId',(req,res)=>{
    Dish.find({cityId:req.params.cityId})
        .then((dishes)=>{
            res.status(200).send({"dishes":dishes});
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

router.get('/hotels/:cityId',(req,res)=>{
    Hotel.find({cityId:req.params.cityId})
        .then((hotels)=>{
            const hotelData = [];
            hotels.map((data)=>{
                hotelData.push({
                    location: data.location,
                    ratings: data.ratings,
                    numberofRatings: data.numberofRatings,
                    _id: data._id,
                    name: data.name,
                    cityId: data.cityId
                });
            })
            res.status(200).send({"hotels":hotelData});
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

router.get(`/ratings-of/dish/:dishId`,(req,res)=>{
    Review.aggregate([{$match:{"hotel.dishId":req.params.dishId}},{$group:{"_id":null,"rating":{$avg:"$hotel.rating"}}}])
    .then((data)=>{
        res.status(200).send(data[0]);
    }).catch(error=>{
        res.status(400).send({error});
    })
})

router.get(`/ratings-of/hotel/:hotelId`,(req,res)=>{
    Review.aggregate([{$match:{"hotel.hotelId":req.params.hotelId}},{$group:{"_id":null,"rating":{$avg:"$hotel.rating"}}}])
    .then((data)=>{
        res.status(200).send(data[0]);
    }).catch(error=>{
        res.status(400).send({error});
    })
})

router.get('/hotels/hotel/:hotelId',(req,res)=>{
    if(!req.params.hotelId){
        res.status(400).send("Hotel id is absent in api call");
        return;
    }
    Hotel.findOne({_id:req.params.hotelId})
        .then((HOTEL)=>{
            if(!HOTEL){
                res.status(400).send("No such Hotel");
                return;
            }
            Review.aggregate([{$match:{"hotel.hotelId":req.params.hotelId}},{$group:{"_id":"$hotel.hotelId","rating":{$avg:"$hotel.rating"}}}])
            .then((HotelRatingData)=>{
                res.status(200).send({"hotel":{_id:Hotel._id,"name":HOTEL.name ,"ratings":HotelRatingData[0].rating, "phoneNumber":HOTEL.phoneNumber, "location": HOTEL.location,"cityId": HOTEL.cityId}});
                return;
            }).catch(error=>{
                
                res.status(400).send(error);
                return;
            })
        })
        .catch(
            (error)=>{
                if(error)res.status().send({"error":error});
                res.status(400).send({"error":"Internal Server Error"});
                return;
            }
        );
});



router.get('/deliveryBoy/:deliveryBoyId',(req,res)=>{
    DeliveryBoy.findOne({_id:req.params.deliveryBoyId})
        .then((DB)=>{
            Review.aggregate([{"$match":{"deliveryExecutive.deliveryExecutiveId":req.params.deliveryBoyId}},{"$group":{"_id":"$deliveryExecutive.deliveryExecutiveId","rating":{$avg:"$deliveryExecutive.rating"}}}])
            .then((data)=>{
                res.status(200).send({"deliveryBoy":{"name":DB.name , "phoneNumber":DB.phoneNumber,"ratings":(data[0])?data[0].rating:DB.ratings,"location":DB.location}});
                return;
            }).catch(error=>{
                return res.status(400).send({error});
            })
        })
        .catch(
            (error)=>{
                if(error)res.status().send({"error":error});
                res.status(400).send({"error":"Internal Server Error"});
                return;
            }
        );
});

router.get('/users/user/:userId',(req,res)=>{
    const userId=req.params.userId;
    userDb.findOne({_id:userId})
    .then(userData=>{
        res.status(200).send({firstName:userData.firstName,lastName:userData.lastName,phoneNumber:userData.phoneNumber});
    }).catch(err=>{
        res.status(400).send(err);
    });
}) 
router.get('/usercity',(req,res)=>{
    const {coordinates} = req.body;
    if(!coordinates){
        res.status(404).send("Coordinates are not present in request");
        return;
    }
    city.findOne({
        location:{
            $geoIntersects: {
                $geometry: {
                    type: "Point",
                    coordinates: coordinates
                }
            }
        }
    }).then((CITY)=>{
        if(!CITY){
            res.status(404).send("Sorry we don't provide service near this location");
        }
        res.status(200).send({
            name:CITY.name,
            _id:City._id,
            location:CITY.location
        });
    }).catch(err=>{
        res.status(400).send(err);
    });
});

router.get('/reviews/hotel/:hotelId',(req,res)=>{
    const hotelId=req.params.hotelId;
    Review.find({"hotel.hotelId":hotelId})
    .then((reviews)=>{
        res.status(200).send({reviews});
        return;
    }).catch((error)=>{
        if(error){
            res.status(400).send({error});
            return;
        }
        res.status(400).send({error:"Internal Server Error"});
    });    
});

router.get('/dish/rating/:dishId',(req,res)=>{
    const dishId=req.params.dishId;
    Review.aggregate([{$match:{"hotel.dishId":dishId}},{$group:{"_id":"$hotel.dishId","rating":{$avg:"$hotel.rating"}}}])
    .then((Rating)=>{
        res.status(200).send({rating:Rating[0].rating});
        return;
    }).catch((error)=>{
        if(error){
            res.status(400).send({error});
            return;
        }
        res.status(400).send({error:"Internal Server Error"});
    });    
});

router.get('/hotel/rating/:hotelId',(req,res)=>{
    const hotelId=req.params.hotelId;
    Review.aggregate([{$match:{"hotel.hotelId":hotelId}},{$group:{"_id":"$hotel.hotelId","rating":{$avg:"$hotel.rating"}}}])
    .then((Rating)=>{
        res.status(200).send({rating:Rating[0].rating});
        return;
    }).catch((error)=>{
        if(error){
            res.status(400).send({error});
            return;
        }
        res.status(400).send({error:"Internal Server Error"});
    });    
});

router.get('/cities/',(req,res)=>{
    City.find({})
    .then(data=>{
        const citiesData=[];
        data.map((city)=>{
            
            citiesData.push({_id:city._id,name:city.cityName,location:city.location})
        })  
        res.status(200).send({cities:citiesData});
    })
})

router.get('/cities/city/:id',(req,res)=>{
    const _id=req.params.id;
    City.findOne({_id:_id})
    .then(data=>{
        const city=({_id:data._id,name:data.cityName,location:data.location})  
        res.status(200).send({city:city});
    })
})

router.get('/isReviewedOrder/:orderId',(req,res)=>{
    Review.findOne({_id:req.params.orderId})
    .then((data)=>{
        if(data){
            res.status(200).send({reviewed:true});
            return;
        }
        res.status(200).send({reviewed:false});
    }).catch(error=>{
        res.status(400).send({error});
    })
})

module.exports = router;