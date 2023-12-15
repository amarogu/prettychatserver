const router = require('express').Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middleware');

router.get('/user', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.send({username: user.username, _id: user._id});
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;