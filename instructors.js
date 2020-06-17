const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')

exports.edit = (request, response) => {

    const { id } = request.params

    const foundIntructor = data.instructors.find(instructor => instructor.id == id )

    if(!foundIntructor)
        return response.send('Instructor not found')

        const instructor = {
            ...foundIntructor,
            birth: date(foundIntructor.birth)
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

    const id = Number(data.instructors.length + 1)
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

exports.get = (request, response) => {
    response.render('instructors/index')
}

exports.update = (request, response) => {

    const { id } = request.body

    const foundInstructor = data.instructors.find(instructor => instructor.id == id)

    if(!foundInstructor) return response.send('Instructor not found')

    const instructor = {
        ...foundInstructor,
        ...request.body,
        birth: Date.parse(request.body.birth)
    }

    data.instructors[id -1] = instructor

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