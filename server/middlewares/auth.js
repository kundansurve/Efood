const userAuth = (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).send('Not Logged In');
        return;
    }
    if(req.session.userType!='user'){
        res.status(401).send('Only user has access to this');
        return;
    }
    next();
};

const adminAuth = (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).send('Not Logged In');
        return;
    }
    if(req.session.userType!='admin'){
        res.status(401).send('Only admin has access to this');
        return;
    }
    next();
};

const deliveryBoyAuth = (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).send('Not Logged In');
        return;
    }
    if(req.session.userType!='deliveryBoy'){
        res.status(401).send('Only deliveryBoy has access.');
        return;
    }
    next();
};

const hotelAuth = (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).send('Not Logged In');
        return;
    }
    if(req.session.userType!='hotel'){
        res.status(401).send('Only Hotels has access.');
        return;
    }
    next();
};

module.exports = {
    userAuth,adminAuth,deliveryBoyAuth,hotelAuth
};