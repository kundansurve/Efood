const express = require('express');
const router = express.Router();
const user = require('./routes/user');
const sessions = require('./routes/sessions');
const authenticate =require('./routes/authenticate');
const hotel = require('./routes/hotels');
const deliveryBoy = require('./routes/deliveryBoy');
const city = require('./routes/city');
const City = require('./models/city');
const Dish = require('./models/dish');
const Hotel =require('./models/hotel');
const Review =require('./models/review');


router.use(express.json());
router.use(express.urlencoded({ extended: true })); 


router.use('/user/me', user);

router.use('/hotel/me',hotel);

router.use('/deliveryboy/me',deliveryBoy);

router.use('/authenticate',authenticate);

router.use('/city/me',city);

router.use('/sessions', sessions);

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


router.get('/hotel/:hotelId',(req,res)=>{
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
    deliveryBoy.find({_id:req.params.deliveryBoyId})
        .then((DB)=>{
            res.status(200).send({"deliveryBoy":{name:DB.name , phoneNumber:DB.phoneNumber}});
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
            citiesData.push({_id:city._id,name:city.cityName,location:city.location})
        })  
        res.status(200).send({cities:citiesData});
    })
})

module.exports = router;