const validationTask = require('../validations/tasks')

//Banco de dados na memória
let tasks_db = [
    {
        name: "Analisar WSUS",
        description: "Realizar a analise das atualizações disponíveis no WSUS e realizar a liberação.",
        status: "Feito",
        id: 1
    },
    {
        name: "Analisar Quarentena Antispam",
        description: "Realizar a analise dos emails em quarentena e realizar bloqueios e liberações.",
        status: "Fazendo",
        id: 2
    },
    {
        name: "Analisar Tonners",
        description: "Realizar a analise dos tonners pelo ZABBIX e realizar as trocas necessárias.",
        status: "A fazer",
        id: 3
    }
]

//Ultima posição do banco de dados
let lastId = 3

//Função que transforma a tarefa para retornar
function transformTasksForReturn(task) {
    return {
        name: task.name,
        description: task.description,
        status: task.status,
        id: task.id
    }
}

//Função que busca a tarefa pelo ID
function searchTask(id) {
    const taskFilters = tasks_db.filter(task => {
        return task.id == id
    })

    if(taskFilters.length == 0) {
        throw new Error(JSON.stringify({
            status: 404
        }))
    }

    return taskFilters[0]
}

const tasks = () => {
    return {
        getById: (id) => {
            const task = searchTask(id)

            return transformTasksForReturn(task)
        },

        getAll: (parameters) => {
            let taskFilters = tasks_db

            taskFilters = tasks_db.map((task) => transformTasksForReturn(task))

            //Validar se o campo status é igual a FEITO, FAZENDO ou A FAZER
            const fieldsToValidate = Object.keys(parameters)

            //Verifica se existe campos para validar 
            if (fieldsToValidate.length > 0) {
                taskFilters = tasks_db.filter(tsk => {
                    let isValid = true

                    fieldsToValidate.forEach(field => {
                        if(!tsk[field].includes(parameters[field])){
                            isValid = false
                        }
                    })

                    return isValid
                })
            }

            //Retorno do resultado
            return taskFilters
        },
        create: (data) => {
            //Cria uma tarefa com os dados enviados
            const newTask = data

            //Valida a tarefa criada
            taskValidate(newTask)

            //Atribui um ID
            newTask.id = ++lastId

            //Salvar no banco de dados
            tasks_db.push(newTask)

            //Retornar tarefa salva
            return newTask
        },
        update: (data, id) => {
            //Busca a tarefa pelo ID
            const registeredTask = searchTask(id)

            //Validar dados enviados
            validationTask(data)

            //Atualiza od dados da tarefa buscada
            registeredTask.name = data.name
            registeredTask.description = data.description
            registeredTask.status = data.status

            return registeredTask
        },
        destroy: (id) => {
            //Verificando se a tarefa existe
            const task = searchTask(id)

            //Cria um novo array de tarefas que devem ser excluidas
            tasks_db = tasks_db.filter(t => t.id != id)

            return true
        }
    }
}

module.exports = {
    tasks,
    searchTask
}