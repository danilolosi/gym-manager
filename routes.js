const express = require('express')
const { response, request } = require('express')
const routes = express.Router()

routes.get('/', (request, response) => {
    response.send('Hi!')
})

routes.get('/instructors', (request, response) => {
    response.render('instructors/index')
})

routes.get('/instructors/create', (request, response) => {
    response.render('instructors/create')
})

routes.post('/instructor', (resquest, response) =>{
    response.send('recebido')
})

routes.get('/members', (request, response) => {
    response.send('Hi!')
})

module.exports = routes