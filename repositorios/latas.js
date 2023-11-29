const latas = []
let last_id = 0

const repositorio = {
    get: () => {
        return latas
    },
    getId: (id) => {
        return latas.filter(lata => lata.id == id)
    },
    create: (lata) => {
        lata.id = ++last_id
        latas.push(lata)
        console.log(lata)

        return lata
    },
    update: (dados) => {
        latas.forEach(lata => {
            if(lata.id == dados.id){
                lata = {
                    ...dados
                }
            }
        })

        return latas.filter(lata => lata.id == dados.id)
    },
    destroy: (id) => {
        const indice = latas.findIndex(lata => lata.id == id)

        if(indice != -1){
            latas.splice(indice, 1)
        }

        return true
    }
}

module.exports = repositorio