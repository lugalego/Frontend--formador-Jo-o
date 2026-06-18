

let imposto;
const salario = 2000;
 
if (salario >= 2200){
    imposto = salario*0.32;
} else if(salario < 2200 && salario >= 1500) {
    imposto = salario*0.26
} else {
    imposto = salario*0.21
}
 
console.log(salario) //2000
console.log(imposto) // salario * 0.266
 
/*
    >
    <
    >=
    <=
    
    a = b //atribuição
    a != b //diferente de
    a == b //equivalente  
    a === b // Estritamente equivalente
    || OR OU
    && AND E
 
 
 
    */
 
    7 == 7
    7 == "7"  //"VERDADEIRO"
    7 === "7" //"FALSO"
 
 
    //ARRAY
    let frutas = ["maça", "laranja", "banana"]
 
    //OBJECT
    let pessoa = {
        nome:"João",
        idade: 25,
        ativo: true
    }
 
 
 
    const metodoPagamento = "mbway";
 
    switch(metodoPagamento){
        case "cartao":
            console.log("Pagamento com cartão");
            break;
        case "mbway":
            console.log("Pagamento com mbway");
            break;
        case "transferência":
            console.log("Pagamento com transferência")
            break;
        default:
            console.log("Metodo de pagamento inválido")
    }

    //FUNÇÕES- tem argumentos, funções que são colocadas entre "", os argumentos são os inputs (as informações que estão dentro do pareneses)

        function somar(x, y){

            console.log(x+y)
            //const resultado= x + y;
            returnresultado;
        }

        somar(10,5)
        somar(6,8)
        somar(9,10)
        somar(9,0,2) // neste caso não vai dar certo pois tem tres argumentos, o codigo foi executado, 
        // somou os dois peimiros numeros e e ignorou o terciero, se colocar somente um valor vai dar um erro (NaN)
 
         function somar(x, y){

            const resultado = x + y;
            return resultado; // a função termina aqui e temos que usar o return para a funçºao retornar e ser lida a linha 83
            // braek também serve para sair de uma função
        }

        console.log (somar(10, 5))

        //Exercicio:

        function calcularDesconto(preco, percentagem){
            if (percentagem < 0 || percentagem > 100){ // || significa OU
                return "Percentagem inválida"
            }
            const taxa =  percentagem /100;
            const precoFinal = (preco - preco*taxa);
            return precoFinal
        }
 
        console.log("Preço final:", calcularDesconto(80, 25))

        // LOOPS - Ciclos vai repetir até a condição ser verdadeira

        for ( let i = 1; i<= 5; i++){ // i= contador i++= incrementar o i
            console.log("Numero atual:", i)
        }

        let tentativas = 0;

        while (tentativas < 3){ // while signigfica esquanto
        //console.log("Tentativas", tentativas + 1)
            //tentativas = tentativas +1; é igual a tentativas +=1
            tentativas +=1
        }

        //Exercício

        // CORRER CICLO FOR PARAR QUANDO O VALOR FOR 4

        for (let i = 0; i <= 10; i++){
            if (i === 4){
        console.log("Parar no valor", i)
        break; // só não sai do if, continua a correr até 10 (Não sai da função)
    }
}

//MÉTODOS - FUNÇÕES, SÃO FUNÇÕS QUE FORAM CRIADAS PELOS PROGRAMADORES DAS FUNÇÕES, JÁ FORAM PRE- PROGRAMADAS

let texto = "Olá Mundo!       "

console.log("lenght da string:", texto.length); // Quantidade de letras
console.log(texto.toUpperCase()) // Converter para maiuscula
console.log(texto.toLowerCase()) // Converter para minuscula
console.log(texto.trim()) // Remover espaços no inicio e no fim

console.log(texto.includes("Mundo")); // o texto inclui a palavra Mundo? e diz se é verdadeiro ou falso
console.log(texto.startsWith("Olá")); //  O texto inicia com Ola? true or false



console.log(frutas) 

console.log(frutas[1]) // ARRAY- SE COLOCAR O 1 APARECE A MAÇÃ, 2- LARANJA, 3- BANANA
//ADICIONAR ELEMENTOS AO FIM DO ARRAY
frutas.push("Abacate"); // para adicionar usar o push
console.log(frutas)
//REMOVER O ULTIMO ELEMENTO
frutas.pop()
console.log(frutas)


for (let i=0; i < frutas.length; i++){ // frutas.lenght = 3, porque são 3 frutas
    console.log(frutas[i])
}

frutas.push("Abacate"); //PARA ADICIONAR COLOCAR O PUSH
for (let i=0; i < frutas.length; i++){
    console.log(frutas[i])
}

for(fruta of frutas){ // Para cada valor x do ARRAY FRUTAS ele vai buscar o resultado das frutas, vai a variável e imprime cada um deles
    console.log(fruta)
}

// mapear o array todo, passo a passo e para cada inicio vai criar uma tardefa, cria um nvo, não altera o original
const frutasMaiuscula = frutas.map ( // o MAP faz uma copi do array
//(fruta) => fruta.toUpperCase() // é uma função que trabalha por seta, transforma o input em letra maiuscula
    )
    console.log(frutasMaiuscula)

    const novoArray = []; 
for (let i=0; i < frutas.length; i++){
    if(i == 0 || i == 2){ //futas 0 e 2 com tamanho maiusculo
        novoArray.push(frutas[i].toUpperCase())
    } else {
        novoArray.push(frutas[i])
    }
  
}
console.log(novoArray)


const frutasFiltradas = frutas.filter(
    (fruta) => fruta.includes("m")
)
console.log(frutasFiltradas)

//EXERCICIOS

//Tabuada do 7
//Mostra a tabuada do 7 (de 7×1 a 7×10)

for (let i= 1; i<=10, i++){
    console.log("7 x" + i + "=" +(7*i))
} 

    

//Soma de 1 a 100
//Calcula e mostra a soma de todos os números de 1 a 100.

let soma = 0;
for (let i=1; i<=100; i++){
    soma= soma + i
}
console.log(soma)

//Pares até 20
//Mostra apenas os números pares de 2 a 20 (usa for + if).

for (let i=2; i <= 20; i++){
    if (i % 2 == 0){
        console.log(i)
    } else {
        console.log("Não é par")
    }
}

const num = 2.6
Math.round(nm) // atrredondar as casas decimais

const vetor= [1, 3, 4, "5"]

vetor.length // 4
vetor[0] // 1
vetor.push (10) // [1, 3, 4, "5", 10]
vetor.pop() // vai retirar sempre o ultimo elemnto
vetor.shift ("2")
vetor.unshift()
vetor.slice(1,2)

Math.max(vetor) // devolve o maior numero do conjunto de numeros, funciona só para numeros e não para strings
//w3 school, usar para ver a sintaxe



