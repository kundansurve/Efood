const express = require('express');
const router = express.Router();
const user = require('./routes/user');
const sessions = require('./routes/sessions');
const authenticate =require('./routes/authenticate');
const hotel = require('./routes/hotels');
const deliveryBoy = require('./routes/deliveryBoy');
const city = require('./routes/city');

router.use(express.json());
router.use(express.urlencoded({ extended: true })); 


router.use('/user', user);

router.use('/hotel',hotel);

router.use('/deliveryboy',deliveryBoy);

router.use('/authenticate',authenticate);

router.use('/city',city);

router.use('/sessions', sessions);


router.get('/dishes/:cityId',(req,res)=>{
    dish.find({cityId:req.params.cityId})
        .then((dishes)=>{
            res.status(200).send({"hotels":dishes});
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
    dish.find({cityId:req.params.cityId})
        .then((dishes)=>{
            res.status(200).send({"hotels":dishes});
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
    hotel.find({_id:req.params.hotelId})
        .then((HOTEL)=>{
            res.status(200).send({"hotel":{name:HOTEL.name , phoneNumber:HOTEL.phoneNumber, location: HOTEL.location}});
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

router.get('/reviews',(req,res)=>{
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


module.exports = router;