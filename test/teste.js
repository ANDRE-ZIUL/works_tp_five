const axios = require('axios')

const exec = async () => {
    const lata = {
        descricao: "Lata muito grande",
        volume: 150
    }
    
    try{
        const response = await axios.post('http://localhost:3001/latas', lata)
        console.log(response)
    }catch(err) {
        console.log("erro: " + err.message)
    }
}

exec()