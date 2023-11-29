const express = require('express')
const port = 3001

const app = express()
const rotas = require('./rotas/latas.js')

app.use(express.json())

// MIDDLEWARE
app.use((req, res, next) => {
    console.log(req.body)

    next()
})

app.use(rotas)

app.listen(port, (err) => {
    console.log("executando na porta " + port)
})