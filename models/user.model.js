const dbPath = require('./dbPath')

let {user} = require(dbPath.userFileName)
const helper = require('../helpers/helper')


function getUsers() {
    return new Promise((resolve, reject) => {
        if (user.length === 0) {
            reject({
                message: 'no user available',
                status: 202
            })
        }
        resolve(users)
    })
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(user, id)
        .then(user => resolve(user))
        .catch(err => reject(err))
    })
}

function insertUser(newUser) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(user) }
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        } 
        newUser = { ...id, ...date, ...newUser }
        user.push(newUser)
        resolve(newUser)
    })
}

function updateUser(id, newPost) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(user, id)
        .then(post => {
            const index = user.findIndex(p => p.id == post.id)
            id = { id: post.id }
            const date = {
                createdAt: post.createdAt,
                updatedAt: helper.newDate()
            } 
            user[index] = { ...id, ...date, ...newPost }
            helper.writeJSONFile(dbPath.userPath, users)
            resolve(users[index])
        })
        .catch(err => reject(err))
    })
}

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(users, id)
        .then(() => {
            users = users.filter(p => p.id !== id)
            helper.writeJSONFile(dbPath.userPath, users)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertUser,
    getUsers,
    getUser, 
    updateUser,
    deleteUser
}