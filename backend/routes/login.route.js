const express = require('express');
const app = express();
const loginRoute = express.Router();
// login model
let Login = require('../models/Login');
//add login
loginRoute.route('/create').post((req, res, next) => {
    Login.create(req.body, (error, data) => {
    if (error) {
       return next(error)
    } 
    else {
    res.json(data)
    }
    })
   });

module.exports = loginRoute;