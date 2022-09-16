const express = require('express');
const router = express.Router();
const path = require("path");

const api = require("./server/api");

router.use(
    "/api",
    api
  );

  //Handle non-api routes with static build folder
   router.use(express.static(path.join(__dirname, "build")));

   //Return index.html for routes not handled by build folder
   router.get("*", function (req, res) {
    if((req.originalUrl==='/mycart' || req.originalUrl==='/orders' || req.baseUrl==='/orders' || req.baseUrl==='/review') && ((!req.session.userType || req.session.userType!='User'))){
      res.redirect("/");
      return;
    }
    if(req.baseUrl==='/delivery-executive' && ((!req.session.userType || req.session.userType!='DeliveryExecutive'))){
        res.redirect("/");
      return;
    }
    if((req.baseUrl==='/cityAdmin' || req.originalUrl==='/cityAdmin') && (!req.session.userType || req.session.userType!='City') ){
        res.redirect("/");
      return;
    }
    if((req.baseUrl==='/hotelAdmin' || req.originalUrl==='/hotelAdmin') && (!req.session.userType || req.session.userType!='Hotel') ){
        res.redirect("/");
      return;
    }
     res.sendFile(path.join(__dirname, "build", "index.html"));
   });


   
module.exports = router;