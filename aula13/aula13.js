const palavra = "banana" //VARIÁVEL
palavra.toUpperCase() //VARIÁVEL.OBJETO
palavra.toLowerCase()
 
const num = 2.6
Math.round(num)
 
 
const vetor= [1, 3, 4, "5"] //ARRAYS
 
vetor.length // 4 ATRIBUTO DO ARRAY
vetor[0] // 1 INDICES DE 0 ATÉ N
vetor.push(10) // [1, 3, 4, "5", 10] ADICIONAR ELEMENTO NO FIM
vetor.pop()
vetor.shift("2")
vetor.unshift()
vetor.slice(1,2) // [3,4]
 
Math.max(vetor)
 
 
 
const legumes = ["alface", "curgete", "pepino"]
 
const legumesMaiusculas = legumes.map(
    (legume) => legume.toUpperCase()
)
 
const legumesFiltrados = legumes.filter(
    (legume) => legume.startsWith("c")
)
 
console.log(legumesMaiusculas)
// [ALFACE, CURGETE, PEPINO]
console.log(legumesFiltrados)
//[alface]
 
const numeros = [1, 3, 6, 10]
 
const numsDobro = numeros.map(
    (numero) => numero*2
)
console.log(numsDobro)
// 2, 6, 12, 20
 
 


//OBJETOS - neste caso do explo tem 4 atributos (id, nome, email, ativo)

const utilizador = { //OBJETO, CARACTERIZADO POR UMA {} E O VALOR, PODE SER NUMERO, STRING OU BOLEAN
    id: 1,
    nome: "Ana",
    email: "ana@email.com",
    ativo: true //BOLEAN SEM ""
}

// COMO ACEDER AS PROPRIEDADES

console.log(utilizador.nome) // quando corre o codico aparece o nome
console.log(utilizador.email) // quando corre o codico aparece o email

// PARA TROCAR O ATIVO PARA FALSE ou o nome

utilizador.ativo = false;
utilizador.nome = "Luciana";
console.log(utilizador)

const encomendas = [ //ARRAY COM OBJETOS LÁ DENTRO
    { id: 1, cliente: "Rita", total: 120},
    { id: 2, cliente: "Luis", total: 80},
    { id: 3, cliente:"Marta", total: 200}
]

//PARA ALTERAR UM CONTEUDO DENTRO DE UM ARRAY

encomendas[1].cliente = "António" //METODOS
console.log(encomendas[1])


//FILTRAR

const encomendasFiltradas = encomendas.filter(
    (encomenda) => encomenda.total > 100
) //CRIAR UM ARRAY NOVO PARA FILTRAR AS ENCOMENDAS
console.log(encomendasFiltradas)