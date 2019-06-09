const express = require('express')
const router = express.Router()
const cars = require('../models/car.model')
const m = require('../helpers/middlewares');
let {car} = require('../data/users')




/* create car advert  */
router.post('/car', m.authorization, 
  m.jwtVerify,m.checkCarEmpty,m.checkCarField,m.getId, async(req, res)=>{
  const {carData} = req
  cars.insertcar(carData)
  .then(response=>{
    console.log(response)
    res.status(200).json({status:200,data:response})
  })
  
})



module.exports = router