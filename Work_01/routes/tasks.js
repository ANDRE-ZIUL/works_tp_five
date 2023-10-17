const express = require('express')
const {searchTask, tasks} = require('../repository/tasks')
const router = express.Router()

const repositoryTasks = tasks()

//Criando função para criar as rotas e retornar o router
const taskRoutes = () => {
    //Rota para obter tarefas
    router.get('/tasks', (req, res) => {
        const {name, description, status} = req.query

        const parameters = {}

        if(name){
            parameters.name = name
        }

        if(description){
            parameters.description = description
        }

        if(status){
            parameters.status
        }

        const tasks = repositoryTasks.getAll(parameters)

        //Enviando as tarefas
        res.send(tasks)
    })

    //Rota para obter uma unica tarefa pelo id
    router.get('/tasks/:id', (req, res) => {
        try{
            //Capturei o parametro enviado na requisição
            const id = req.params.id
            const task = repositoryTasks.getById(id)

            //Enviei como resposta um objeto devolvido pelo repositorio
            res.send(task)
        }catch(error){
            //Capturei o erro enviado
            console.log(error.message)
            const contentError = JSON.parse(error.message)

            //Retornando os erros e status correto
            return res.status(contentError.status).send()
        }
    })

    //Rota para criar uma tarefa nova
    router.post('/tasks', (req, res) => {
        try{
            const newTask = repositoryTasks.create(req.body)

            //Enviar a resposta
            res.send(newTask)
        }catch(error){
            //Capturei o erro enviado
            const contentError = JSON.parse(error.message)

            //Retornando os erros e status correto
            return res.status(contentError.status).send(contentError.errors)
        }
    })

    //Rota para atualizar os dados de uma tarefa
    router.put('/tasks/:id', (req, res) => {
        try{
            //Obtendo o parametro id enviado por meio de desestruturação
            const{id} = req.params

            //Solicitando ao repositorio para atualizar os dados da tarefa
            const task = repositoryTasks.update(req.body, id)

            //Retorna com sucesso
            return res.send(task)
        }catch(error){
            //Capturei o erro enviado
            const contentError = JSON.parse(error.message)

            //Retornando os erros e status correto
            return res.status(contentError.status).send(contentError.errors)
        }
    })

    //Rota para atualizar os dados de uma tarefa, considerando apenas os que foram enviados
    router.patch('/tasks/:id', (req, res) => {
        //Obtendo o parametro id enviado por meio de uma desetruturação
        const {id} = req.params

        const registeredTask = searchTask(id)

        //Atualiza os dados da tarefa buscada
        registeredTask.name = req.body.name ?? registeredTask.name
        registeredTask.description = req.body.description ?? registeredTask.description
        registeredTask.status = req.body.status ?? registeredTask.status

        const task = repositoryTasks.update(registeredTask, id)

        //Retorna com sucesso
        return res.send(task)
    })

    //Rota para excluir tarefa
    router.delete('/tasks/:id', (req, res) => {
        //Obtendo parametro id enviado por meio de desestruturação
        const {id} = req.params

        //Executando a exclusão do usuário
        repositoryTasks.destroy(id)

        return res.status(200).send()
    })

    return router
}

module.exports = taskRoutes