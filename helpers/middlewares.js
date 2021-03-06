import { newDate,getSubId } from './helper';
import { checkLetter, Arr } from '../utils/string'
import checkFloat from '../utils/checkfloat'
const mustBeInteger = (req, res, next) => {

    const id = req.params.id
    if (!Number.isInteger(parseInt(id))) {
        console.log(Number.isInteger(parseInt(id)))
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        console.log(Number.isInteger(parseInt(id)))
        next()
    }
}


const checkFieldsPost = (req, res, next) => {
    const { title, content, tags } = req.body
    console.log(title, content,tags)
    if (title && content && tags) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}


const checkFieldsUser = async (req, res, next) => {
    const { first_name,last_name, password, address, is_admin, email } = req.body
    
   const is_Admin = is_admin === '1' ? true : false
   
    const stringRegex = require('../utils/string');
    const helper = require('../helpers/helper');
    const jwt = require('jsonwebtoken');
    const key = require('../config/keys')
    let newPassword;

    

    if (first_name && last_name && password && address && email) {
       if(is_Admin){
        
     const res = await  helper.harshPassword(password)
      newPassword = res
      const token = jwt.sign({ code: newPassword }, key.secretKey)
           const newUser = {
            token,
            first_name,
            last_name,
            password:newPassword,
            address,
            is_Admin,
            email
        }
       
           req.newUser = newUser
           next()
       }
       else {
        res.status(403).json({ status:403, error: 'invalid input type' })
    }

    } else {
        res.status(403).json({status:402 , error: 'Please fill all field' })
    }
}

const jwtsign = (req, res,next)=>{
    const jwt = require('jsonwebtoken');
    const key = require('../config/keys')
    const {user} = req
   
    const decoded = jwt.verify(user.data.token, key.secretKey);
    const valid = decoded.code
    console.log(valid)
    const token = jwt.sign({ payload: user.data.id,user}, key.secretKey2)
    console.log(user.data.id)
    const _user = {
        status:200,
        data:{
            token,
        user,
        }
    }
    if(valid){
        req._user = _user;
        next()
    } else{
        res.status(403).json({ status:402, error: 'failed authentication' })
    }
    
}

const authorization = (req, res, next)=>{
    const header = req.headers['authorization'];
    
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.status(401).json({
            err:401,
            data:'This is a protected routes, you have to be logged in'
        })
    }
}

const jwtVerify = (req, res, next)=>{
    const jwt = require('jsonwebtoken');
    const key = require('../config/keys')
    const {token} = req
  jwt.verify(token, key.secretKey2, (err, result)=>{
      if(err){
          res.status(403).json({
              err,
              data:'This is a protected routes, you have to be logged in'
          })
      } else{
          req.result = result
          next()
      }
  })

        
}


const emailValidation = (req, res, next)=>{
    const emailRegex = require('../utils/email')
   
    const {email} = req.body;

    if(emailRegex.validateEmail(email) && email){
        next()
    } else{
        res.status(402).json({ status:402, error: 'Invalid email' })
    }
}


const uniqueValue = (req, res, next) => {
    const {email} = req.body;
    let {user} = require('../data/users.js');
   user = user.find(r=>r.email === email)
   console.log(user)
      if (!user){
             next()
         } 
         else{

            console.log('email already in use %s',user.email)
            res.status(403).json({ status:403, error: `${email} already in use` })
     }
   
}



const isSignUp = (req, res, next) => {
    let {user} = require('../data/users.js');
    const bcrypt = require('bcrypt')
    const {email,password} = req.body;
    let id;
    user = user.find(r=>r.email === email)

    if(user){
    bcrypt.compare(password, user.password, function(err, result) {
      const  checkpassword = result

     if(checkpassword){
        id = user.id;       
        const singleUser = {
                     status:200,
                     data:user
                  }
        req.user = singleUser
         next()
      }
      else{
         console.log(email, user, checkpassword)
         res.status(403).json({ status:403, error: 'please check your email or password' })
      }

    });
} else{
    res.status(403).json({ status:403, error: `please register a new account, that email is not registered` })
}
    
    
}

const checkCarEmpty = (req, res, next) =>{
    const { model,manufacturer,state,price,body_type,color} = req.body;
    if(!model && !manufacturer && !state && !price && !body_type && !color){
        res.status(403).json({status:403,err:'empty field'})
    } else{
        const cars = {model,manufacturer,state,body_type,color}
        const letterChar = {model,manufacturer,state,body_type,color}
        const float = {price}
        req.carObj = cars;
        req.letterChar = letterChar;
        req.float = float;
        next();
    }
}

const checkCarField = (req, res, next) =>{
    const {carObj,letterChar,float}  = req
   const boolArray = Arr(letterChar)
   const letterBolean = checkLetter(boolArray)
   const floatBoolean = checkFloat(float.price)
   //console.log(float.price)
    if(!letterBolean){
        res.status(403).json({status:403,err:'field label except price (number) can only be Alphabet characters'})
    } else if (!floatBoolean){
        res.status(403).json({status:403,err:'price Must be Floating Number, i.e 1700.00'})
    }
    else{
        req.price = parseFloat(float.price)
        req.carObj = carObj;
        next();
    }
    
}

const getId = (req, res, next)=>{
    const {result} = req;
    let {user,car} = require('../data/users.js');
    const owner = {owner:result.payload};
    const date = { createdAt: newDate()} 
    user = user.find(r=>r.id === owner.owner);
    const { carObj,price } = req;
    const existingUser = user? {
        first_name:user['first_name'],
        last_name:user['last_name'],
        address:user['address'],
    }:null
    const data = {id:getSubId(car), ...owner,
         email:result['user']['data']['email'], 
         ...carObj,
         price,
         ...date,
         ...existingUser
        }
    if(owner){
        req.carData= data;
        next();
    } else{
        res.status(403).json({
            status:403,
            error:'unauthorized posting'
        })
    }
}


export {
    mustBeInteger,
    getId,
    checkFieldsPost,
    emailValidation,
    isSignUp,
    authorization,
    uniqueValue,
    checkFieldsUser,
    jwtVerify,
    jwtsign,
    checkCarEmpty,
    checkCarField
}