

const luciana = {
    id: 1,
    nome: "Luciana",
    dataDeNascimento:"1986-04-09",
    email: "lugalego02@hotmail.com",
    Morada: "Ovar",
    SexoFeminino: true,
}

const lucianaJSON = JSON.stringify(luciana)

console.log("Objeto:", luciana)
console.log("JSON:", lucianaJSON)
console.log("JSON", typeof lucianaJSON)



const jsonRecebido = '{"id":1,"nome":"Luciana","dataDeNascimento":"1986-04-09","email":"lugalego02@hotmail.com","Morada":"Ovar","SexoFeminino":true}'
const objetoRecebido = JSON.parse(jsonRecebido)
console.log("JSON recebido:", jsonRecebido)
console.log("objeto parsado:", objetoRecebido)


//FICHEIRO EM JSAN, FAZER O PASSO INVERSO


