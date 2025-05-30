const express = require('express');
const router = express.Router()
const passport = require('passport')

const {
    register,
    login
} = require('../controllers/student')

router.post('/', register)

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    login
)


module.exports = router