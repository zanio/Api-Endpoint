const express = require('express')
const router = express.Router()
const post = require('../models/post.model')
const user = require('../models/user.model')
const m = require('../helpers/middlewares')


/* register a new User */
router.post('/register', m.checkFieldsUser,m.emailValidation,m.uniqueValue,
 async (req, res) => {
    await user.insertUser(req.newUser)
    .then(user => res.status(200).json({
        status: 200,
        data: user
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Login User */
router.post('/login',m.emailValidation, m.isSignUp, m.jwtsign, (req, res)=>{
  const {_user} = req
  res.status(200).json(_user)
})

/* my account section */
router.get('/my-account/*', m.authorization, m.jwtVerify, async(req, res)=>{
  const {result} = req
  res.status(200).json(result)
  
})



module.exports = router