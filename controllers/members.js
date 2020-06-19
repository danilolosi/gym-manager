const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')

exports.edit = (request, response) => {

    const { id } = request.params

    const foundIntructor = data.members.find(member => member.id == id )

    if(!foundIntructor)
        return response.send('Member not found')

        const member = {
            ...foundIntructor,
            birth: date(foundIntructor.birth).iso
        }

    response.render('members/edit', { member: member})
}

exports.show = (request, response) => {

    const { id } = request.params

    const foundMember = data.members.find(member => member.id == id)

    if(!foundMember) return response.send('Member not found')

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay,
    }

    return response.render('members/show', {member: member})
}

exports.form = (request, response) => {
    response.render('members/create')
}

exports.create = (request, response) => {
    const keys = Object.keys(request.body)
     
    for( key of keys){
        if(request.body[key] == '')
            return response.send('Please, fill all field')
    }

    birth = Date.parse(request.body.birth)

    let id = 1
    const lastMember = data.members[data.members.length -1]

    if(lastMember)
         id = lastMember.id + 1
    
    data.members.push({
        ...request.body,
        id,
        birth
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) =>{
        if(err) return response.send("Write file error!")

        return response.redirect('/members')
    })
}

exports.index = (request, response) => {

    response.render('members/index', {members: data.members})
}

exports.update = (request, response) => {

    const { id } = request.body

    let index = 0;
    const foundMember = data.members.find((member, foundIndex) =>{
        if(member.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundMember) return response.send('Member not found')

    const member = {
        ...foundMember,
        ...request.body,
        birth: Date.parse(request.body.birth),
        id: Number(request.body.id)
    }

    data.members[index] = member

    fs.writeFile('data.json', JSON.stringify(data,null,2), (err) => {
        if(err) return response.send('Write error!')

        return response.redirect(`/members/${member.id}`)
    })
}

exports.delete = (request, response) => {

    const {id} = request.body

    const filteredMembers = data.members.filter(member => member.id != id)
    
    data.members = filteredMembers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) =>{
        if(err) return response.send('Write error!')

        return response.redirect('/members')
    })
}