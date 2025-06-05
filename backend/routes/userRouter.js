const express = require('express');
const router = express.Router()
const passport = require('passport')

const {
    register,
    login,
    userLogged
} = require('../controllers/user')

router.post('/', register)

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    login
)

router.post('/user-logged', userLogged)

module.exports = router