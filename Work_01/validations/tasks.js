const validations = (task) => {
    //Nome, descrição e status são obrigatórios
    //Status pode ser somente FEITO, FAZENDO ou A FAZER

    const errors = []

    if(!task.name || task.name == ""){
        errors.push("Campo NOME não pode ser vazio.")
    }

    if(!task.description || task.description == ""){
        errors.push("Campo DESCRIÇÃO não pode ser vazio.")
    }

    if(!task.status || task.status == ""){
        errors.push("Campo STATUS não pode ser vazio.")
    }else if(task.status != "Feito" || task.status != "Fazendo" || task.status != "A fazer"){
        errors.push("Campo STATUS deve ser preenchido somente com FEITO, FAZENDO ou A FAZER.")
    }

    //Se existe campo inválido
    if(errors.length > 0){
        throw new Error(JSON.stringify({
            status: 400,
            errors
        }))
    }else{
        return true
    }
}

module.exports = validations