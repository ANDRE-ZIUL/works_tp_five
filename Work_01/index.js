//Importando o DotEnv
require('dotenv').config()

//Importando o Express
const express = require("express")

//Configurando a porta de acordo com o arquivo .env
const door = process.env.DOOR

//Importando as rotas das tarefas
const routes_tasks = require('./routes/tasks')

//Instanciando a aplicação
const app = express()

//Definindo que os dados serão enviados no formato JSON no corpo da requisição
app.use(express.json())

//Configurando as rotas importadas dentro do app
app.use(routes_tasks())

//Rota raiz
app.get("/", (req, res) => {
    res.send("API de Tarefas sendo executada...")
})

//Iniciando a aplicação de acordo com a porta
app.listen(door, (err) => {
    if(err) {
        console.log("Ocorreu un erro ao subir a aplicação!")
    }else{
        console.log(`Aplicação rodando na porta ${door}`)
    }
})


