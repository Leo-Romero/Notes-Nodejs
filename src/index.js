const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')        // template Handlebars
const methodOverride = require('method-override')   // permite PUT y DEL en un form
const session = require('express-session')          // para autenticar al usr temporalmente

// inicializacion
const app = express()
require('./database')

// settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

// middlewares
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))  // utiliza un input oculto _method que permite PUT y DEL 
app.use(session({
    secret: 'keysecreta',   // palabra secreta
    resave: true,
    saveUninitialized: true
}))

// global var
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use(require('./routes/index'))
app.use(require('./routes/notes'))
app.use(require('./routes/users'))

// statics files

// server
app.listen(app.get('port'), () => {
    console.log(`Servidor escuchando en el puerto: ${app.get('port')}`)
})