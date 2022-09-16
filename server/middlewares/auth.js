const userAuth = (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).send('Not Logged In');
        return;
    }
    if(req.session.userType!='User'){
        res.status(401).send('Only user has access to this');
        return;
    }
    next();
};

const cityAdminAuth = (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).send('Not Logged In');
        return;
    }
    if(req.session.userType!='City'){
        res.status(401).send('Only Admin of respective city has access to this');
        return;
    }
    next();
};

const deliveryBoyAuth = (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).send('Not Logged In');
        return;
    }
    if(req.session.userType!='DeliveryExecutive'){
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
    if(req.session.userType!='Hotel'){
        res.status(401).send('Only Hotels has access.');
        return;
    }
    next();
};

module.exports = {
    userAuth,cityAdminAuth,deliveryBoyAuth,hotelAuth
};