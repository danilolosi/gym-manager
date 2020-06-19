module.exports = {
    age: function(timestamp){
        const today = new Date()
        const birth = new Date(timestamp)
    
        let age = today.getFullYear() - birth.getFullYear()
        const month = today.getMonth() - birth.getMonth()
    
        if(month < 0 || month == 0 && today.getDate() <= birth.getDate()){
            age--
        } 
        
        return age
    },
    date: function(timestamp){

        const date = new Date(timestamp)

        const day = `0${date.getUTCDate()}`.slice(-2)
        const month = `0${date.getUTCMonth() + 1}`.slice(-2) 
        const year = date.getUTCFullYear()

        return {
                day,
                month,
                year,
                iso: `${year}-${month}-${day}`,
                birthDay: `${day}/${month}`
            }
    }
}
