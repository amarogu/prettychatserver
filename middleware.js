const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).send({ message: 'You are not authorized to access this resource' });
    }
};

module.exports = {
    isAuthenticated
}