const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')

exports.edit = (request, response) => {

    const { id } = request.params

    const foundIntructor = data.instructors.find(instructor => instructor.id == id )

    if(!foundIntructor)
        return response.send('Instructor not found')

        const instructor = {
            ...foundIntructor,
            birth: date(foundIntructor.birth).iso
        }

    response.render('instructors/edit', { instructor: instructor})
}

exports.show = (request, response) => {

    const { id } = request.params

    const foundInstructor = data.instructors.find(instructor => instructor.id == id)

    if(!foundInstructor) return response.send('Instructor not found')

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(','),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at),
    }

    return response.render('instructors/show', {instructor: instructor})
}

exports.create = (request, response) => {
    const keys = Object.keys(request.body)
     
    for( key of keys){
        if(request.body[key] == '')
            return response.send('Please, fill all field')
    }

    let {avatar_url, birth, name, services, gender} = request.body

    let id = 1
    const lastInstructor = data.instructors[data.instructors.length -1]

    if(lastInstructor)
        id = lastInstructor.id + 1

    const created_at = Date.now()
    birth = Date.parse(request.body.birth)
    
    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) =>{
        if(err) return response.send("Write file error!")

        return response.redirect('/instructors')
    })
}

exports.index = (request, response) => {

    const instructors = data.instructors.map(instructor =>{
        const newInstructor = {
            ...instructor,
            services : instructor.services.split(',')
        }
        return newInstructor
    })

    response.render('instructors/index', {instructors: instructors})
}

exports.update = (request, response) => {

    const { id } = request.body

    let index = 0;
    const foundInstructor = data.instructors.find((instructor, foundIndex) =>{
        if(instructor.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundInstructor) return response.send('Instructor not found')

    const instructor = {
        ...foundInstructor,
        ...request.body,
        birth: Date.parse(request.body.birth),
        id: Number(request.body.id)
    }

    data.instructors[index] = instructor

    fs.writeFile('data.json', JSON.stringify(data,null,2), (err) => {
        if(err) return response.send('Write error!')

        return response.redirect(`/instructors/${instructor.id}`)
    })
}

exports.delete = (request, response) => {

    const {id} = request.body

    const filteredInstructors = data.instructors.filter(instructor => instructor.id != id)
    
    data.instructors = filteredInstructors

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) =>{
        if(err) return response.send('Write error!')

        return response.redirect('/instructors')
    })
}

exports.form = (request, response) => {
    response.render('instructors/create')
}