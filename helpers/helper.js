import fs from 'fs'
import prefixKey from '../utils/prefixNum'


const getNewId = (array) => {
   
    if (array.length > 0) {
        let n;
         let idValue = array[array.length - 1].id 
         n = idValue+1
        return n
        
    } else {
       return 234013005001;
    }
    
}
const newDate = () => new Date().toString()

const mustBeInArray = (array, id) =>{
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == id)
        if (!row) {
            reject({
                message: 'user does not exits',
                status: 404
            })
        }
        resolve(row)
    })
}

const harshPassword = (password)=>{
    const bcrypt = require('bcrypt');
   return new Promise((resolve, reject)=>{
        bcrypt.hash(password, 10,  function(err, hash) {
           // pass = hash
            if(hash) resolve(hash)
            if(err)  reject(err) 
         })   
})
           
}

const writeJSONFile = (filename, content) => {
    fs.writeFile(filename, JSON.stringify(content,null,5), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}



export {
    getNewId,
    newDate,
    mustBeInArray,
    harshPassword,
    writeJSONFile
    
}