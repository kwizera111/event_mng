const express=require('express');
const router=express.Router();
const connection=require('../config/conn');
const passport = require('passport');
const { registerUser } = require('../controllers/auth');


router.post('/register', passport.authenticate('local', {
    successRedirect: '/adminDash',
    failureRedirect: '/register'
}));

router.post('/register', registerUser);
router.get('/home', (req, res) => {
    res.render('home', { message: [] });
});
router.get('/login', (req, res) => {
    res.render('login'); 
});
router.get('/availables', (req, res) => {
    res.render('availables');
});
router.get('/adminDash', (req, res) => {
    res.render('adminDash');
});
router.get('/regist', (req, res) => {
    res.render('auth');
});



module.exports=router;