var express = require('express');
var router = express.Router();
const cors = require('cors');

router.use(cors());
var User = require('../models/User');
var Courses = require('../models/Courses');

router.get('/getUserDetails', function (req, res, next) {
    User.find({}).then(user => {
            if (user) {
                res.json(user);
            }
            else {
                res.send('User does not exist')
            }
        }).catch(err => {
            res.send('error: ' + err)
        })
});

router.post('/login', function (req, res, next) {
    User.findOne({email: req.body.email}).then(user =>{
        if (user) {
            if(req.body.password === user.password){
                res.json(user);
            }
            else{
                res.send('password does not match')
            }
        }
        else {
            res.send('User does not exist')
        }
    }).catch(err => {
        res.send('error: ' + err)
    })
});

router.put('/updateProfile', function(req, res, next){
    User.findByIdAndUpdate(req.body._id, req.body, function (err,post){
        if (err) return next(err);
        res.json(post);
    })
})


module.exports = router;
