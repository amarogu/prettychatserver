const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernamefield: 'username',
}, async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false);
        }
        const isPasswordCorerct = await user.isPasswordCorrect(password);
        if (!isPasswordCorerct) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        return done(error)
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send({ message: 'You are now logged in.' });
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.send({ message: 'You are now logged out.' });
    });
});

router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send({ message: 'Successfully registered.' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;