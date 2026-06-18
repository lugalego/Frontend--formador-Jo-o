

// SERVIDOR EM NODE

//USAR UMA BASE DE DADOS, VAMOS USAR O ROTING

const marcacoes = [
    { id: 1, cliente: "Ana Silva", servico: "Consulta", data: "2026-03-01", hora: "09:00", preco: 50 },
    { id: 2, cliente: "Bruno Costa", servico: "Exame", data: "2026-03-01", hora: "10:00", preco: 80 },
    { id: 3, cliente: "Carla Dias", servico: "Revisao", data: "2026-03-02", hora: "11:00", preco: 30 },
  ];


// ENVIADO UM PEDIDO GET PARA LISTAR TODAS AS MARCAÇÕES

//GET- QUERO VER INFORMAÇÃO AO SERVIDOR, EX: MENU, DADOS PESSOAIS, PRODUTO

function listarMarcacoes(lista){ //função que vai buscar a base de dados, a lista é o ARRAY[], O ARRAY TEM AS POSIÇÕES DE 0 A N, QUER IMPRIMIR CADA UM DOS INDICES, OU SEJA, CADA M DA LISTA, IMPRIMIR OS VALORES DO M
    
      for(let i = 0; i < lista.length; i++){
        let m = lista[i]
        console.log("[id] " + m.id + "cliente: " + m.cliente)
    }
    

    //OU PODE USAR ESTA SOLUÇÃO

    //for (const m of lista){ //obrjeto é o m, foi buscar os objetos de cada linha, o m é arbitrário, podemos colocar o valor que quisermos
        //console.log("[id] " + lista[i].id + "cliente: " + lista[i].cliente)
    //}
    console.log("Total de marcações: " + lista.length)
  }
 
  listarMarcacoes(marcacoes)

//PUT- QUERO ATUALIZAR ALGO EXISTENTE, MUDAR A HORA, MUDAR MORADA, ATUALIZA TUDO


 
  const marcacao = {
    cliente:"Diana",
    servico: "consulta",
    data: "2026-03-03",
    hora: "14:30",
    preco: 30
  }
 
  function criarMarcacao(lista, marcacao){
 
    lista.push({
            id: lista.length+1,
            ...marcacao //spread operator, junção de dois objetos
        })
  
    return lista
  }
 
  //console.log(criarMarcacao(marcacoes,marcacao))
console.log(criarMarcacao(marcacoes, marcacao))
 
 




