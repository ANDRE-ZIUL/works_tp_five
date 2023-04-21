document.getElementsByTagName("button")[0].addEventListener("click", function(){    
//Função que limpa o conteúdo anterior impresso no HTML
    reload();

    //Variavel que recebe o valor de palavras;
    const amountWords = document.getElementById("number").value;
    
    const h3 = document.createElement("h3")
    h3.innerText = "Você gerou "+ amountWords +" palavras:"
    document.getElementById("generateWords").append(h3)
    
    //Loop que gera o texto
    for(let i = 0; i < amountWords; i++) {
        var word = "";

        //Loop que gera palavras
        for(let j = 0; j < generateNumber(4, 8); j++) {
            word += letters.charAt(Math.floor(Math.random() * 50));
        }

        const li = document.createElement("li")
        li.innerText = word
        document.getElementById("generateWords").append(li);
    }
})

 
const generateNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

const reload = () => {
    document.getElementById("generateWords").innerHTML = "";
}

//Array de letras
var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
