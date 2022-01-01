const express = require('express');
const router = express.Router();
const loginCredential = require('../models/user-credential');
const bcrypt = require('bcryptjs');

router.post('/',(req,res)=>{
    if (!req.body) {
        res.status(400).send({error: "Email and Password not present in request"});
        return;
    }

    const { email, password } = req.body;

    if (!email) {
        res.status(400).send({error: "Email must be provided"});
        return;
    }

    if (!password) {
        res.status(400).send({error: "Without password cannot login"});
        return;
    }
    loginCredential.findOne({ email }).then(user => {
        if (!user) {
            res.status(400).send({error: "User not signed up"});
            return;
        }

        const match = bcrypt.compareSync(password, user.password);

        if (!match) {
            res.status(400).send({error: "Incorrect email or password"});
            return;
        }
        req.session.type = user.userType;
        req.session.userId = user.id;
        res.status(204).send(user);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.delete('/me', (req, res) => {
    delete req.session.userId;
    console.log("deleted userid");
    res.status(204).send();
});

module.exports=router;