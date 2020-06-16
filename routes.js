const express = require('express')
const { response, request } = require('express')
const routes = express.Router()
const instructors = require('./instructors')

routes.get('/', (request, response) => {
    response.send('Hi!')
})

routes.get('/instructors', instructors.get)

routes.get('/instructors/create', (request, response) => {
    response.render('instructors/create')
})

routes.get('/instructors/:id', instructors.show)

routes.post('/instructors', instructors.create)

routes.get('/members', (request, response) => {
    response.send('Hi!')
})

module.exports = routes