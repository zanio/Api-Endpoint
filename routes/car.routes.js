const express = require('express')
const router = express.Router()
const cars = require('../models/car.model')
const m = require('../helpers/middlewares');
let {car} = require('../data/users')




/* create car advert  */
router.post('/car', m.authorization, m.jwtVerify,m.getId, async(req, res)=>{
  const {carPost} = req
  cars.insertcar(carPost)
  res.status(200).json(car)
  console.log(car)
})



module.exports = router