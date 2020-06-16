const fs = require('fs')
const data = require('./data.json')

exports.show = (request, response) => {

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

exports.get = function(request, response){
    response.render('instructors/index')
}