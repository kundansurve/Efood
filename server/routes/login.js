const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const user = require('../models/user');


router.get('/me', auth.authenticate, (req, res) => {
    User.findOne({ _id: req.session.userId }).then(user => {
        res.send(user);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.get('/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId }).then(user => {
        res.send(user);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.put('/me', auth.authenticate, (req, res) => {
    if (!req.session.userId) {
        res.status(401).send({ error: "Not logged in"});
    }

    const { firstName, lastName } = req.body;

    const updateQuery = {};
    (firstName !== undefined) && (updateQuery.firstName = firstName);
    (lastName !== undefined) && (updateQuery.lastName = lastName);

    User.updateOne({ _id: req.session.userId }, updateQuery).then(() => {
        res.status(204).send(updateQuery);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});
module.exports=router;