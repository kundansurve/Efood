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
    console.log(req.params.hotelId);
    Dish.find({hotelId:req.params.hotelId})
        .then((dishes)=>{
            console.log(dishes);
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
    Hotel.find({cityId:req.params.cityId}).limit(10)
    .then((data)=>{
        res.status(200).send({hotels:data});
    }).catch(error=>{
        res.status(400).send({error:error});
    })
})

router.get('/dishes/top-rated/:cityId',(req,res)=>{
    Dish.find({cityId:req.params.cityId}).limit(10)
    .then((data)=>{
        res.status(200).send({dishes:data});
    }).catch(error=>{
        res.status(400).send({error:error});
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


router.get('/hotels/hotel/:hotelId',(req,res)=>{
    if(!req.params.hotelId){
        res.status(400).send("Hotel id is absent in api call");
        return;
    }
    Hotel.findOne({_id:req.params.hotelId})
        .then((HOTEL)=>{
            res.status(200).send({"hotel":{_id:Hotel._id,"name":HOTEL.name ,"ratings":HOTEL.ratings, "phoneNumber":HOTEL.phoneNumber, "location": HOTEL.location,"cityId": HOTEL.cityId}});
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



router.get('/deliveryBoy/:deliveryBoyId',(req,res)=>{
    DeliveryBoy.findOne({_id:req.params.deliveryBoyId})
        .then((DB)=>{
            console.log(DB);
            res.status(200).send({"deliveryBoy":{"name":DB.name , "phoneNumber":DB.phoneNumber,"ratings":DB.ratings,"location":DB.location}});
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
    const reviewType='Hotel';
    const reviewForId=req.params.hotelId;
    if(!reviewType && !reviewForId){
        res.status(400).send({error:"Review Type and reviewForId not present"})
    }
    Review.find({reviewType,reviewForId})
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

router.get('/cities/',(req,res)=>{
    City.find({})
    .then(data=>{
        const citiesData=[];
        data.map((city)=>{
            console.log(city);
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

module.exports = router;