const dbPath = require('./dbPath')

let {car} = require(dbPath.carFileName)
import {getSubId} from '../helpers/helper'


function getcars() {
    return new Promise((resolve, reject) => {
        if (car.length === 0) {
            reject({
                message: 'no car available',
                status: 202
            })
        }
        resolve(cars)
    })
}

function getcar(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(car, id)
        .then(car => resolve(car))
        .catch(err => reject(err))
    })
}

function insertcar(newcar) {
    return new Promise((resolve, reject) => {
        const id = {id:getSubId(car)}
        newcar = {...id, ...newcar }
        car.push(newcar)
        resolve(newcar)
    })
}

function updatecar(id, newPost) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(car, id)
        .then(post => {
            const index = car.findIndex(p => p.id == post.id)
            id = { id: post.id }
            const date = {
                createdAt: post.createdAt,
                updatedAt: helper.newDate()
            } 
            car[index] = { ...id, ...date, ...newPost }
            helper.writeJSONFile(dbPath.carPath, cars)
            resolve(cars[index])
        })
        .catch(err => reject(err))
    })
}

function deletecar(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(cars, id)
        .then(() => {
            cars = cars.filter(p => p.id !== id)
            helper.writeJSONFile(dbPath.carPath, cars)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertcar,
    getcars,
    getcar, 
    updatecar,
    deletecar
}