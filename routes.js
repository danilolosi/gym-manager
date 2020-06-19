const express = require('express')
const { response, request } = require('express')
const routes = express.Router()
const instructors = require('./controllers/instructors')
const members = require('./controllers/members')

routes.get('/', (request, response) => {
    response.redirect('/instructors')
})

routes.get('/instructors', instructors.index)
routes.get('/instructors/create', instructors.form)
routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)
routes.put('/instructors', instructors.update)
routes.post('/instructors', instructors.create)
routes.delete('/instructors', instructors.delete)


routes.get('/members', members.index)
routes.get('/members/create', members.form)
routes.get('/members/:id', members.show)
routes.get('/members/:id/edit', members.edit)
routes.put('/members', members.update)
routes.post('/members', members.create)
routes.delete('/members', members.delete)

module.exports = routes