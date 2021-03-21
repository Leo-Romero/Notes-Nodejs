const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/notes-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(db => console.log('conectado a DB'))
.catch(err => console.log(err))