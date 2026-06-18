

// CLIENTE ENVIAR UM PEDIDO AO SERVIDOR
//METODOS HTTP, PROTOCOLO COM SE COMUNICA NA INTERNET
//-GET = QUERO VER INFORMAÇÃO AO SERVIDOR, EX: MENU, DADOS PESSOAIS, PRODUTO
//- POST = QUERO CRIAR ALGO NOVO, CRIAR UM PRODUTO, ENCOMENDA NOVA
//-PUT = QUERO ATUALIZAR ALGO EXISTENTE, MUDAR A HORA, MUDAR MORADA, ATUALIZA TUDO
//- PATCH = QUERO ATUALIZAR ALGO EXISTENTE, ATUALIZA SÓ UM ELEMTNO ESPECIFICO
//- DELETE = QUERO APAGAR ALGO, CANCELAR UMA MARCAÇÃO, CANCELAR UM DADO

//C.R.U.D 
//C => CREAT
//R => READ
//U => UPDATE
//D => DELETE

const request = { //pedido GET
    metodo: "GET",
    url: "/api/marcacao", // contém o destino
    Headers: { //cabeçalhos
        "content-type": "application/json" 
    }
}

const requestPOST = { //pedido POST, enviar a informação para o servidos
    metodo: "POST",
    url: "/api/marcacao", // conteém o destino
    Headers: { //cabeçalhos
        "content-type": "application/json", 
        "authorization": "Bearer token" //tem que pedir uma autorização, uma autenticação
    },
    body:{ //enviar a informação
        nome:"Carlos",
        email:"Carlos@carlos.pt",
        morada:"morada123"
    }
}

const requestDELETE = { //pedido DELETE
    metodo: "DELETE",
    url: "/api/marcacao73", // TEM UM NUMERO NO FINAL QUE RESPRESENAT O ID DO UTILIZADOR
    Headers: { //cabeçalhos
        "content-type": "application/json" 
    }
}


//RESPOSTA

//SERVIDOR ENVIA UMA RESPOSTA DE VOLTA, RESPOSTA HTTP

const resp = { //resposta se correu bem ou mal 200, 300, 400 e 500
    status: 200, 
    Headers:{
        "contente-type": "aplication/json"
    },
    body:{ //pode enviar as informações de um utilizador por exemplo
        id: 1,
        nome: "Ana",
        email: "ana@gmail.com"
    }
}


 
// SERVIDOR ENVIA UMA RESPOSTA DE VOLTA
 
 
const statusCodes = {
    // ── 2xx: SUCESSO ──
    200: "OK - Pedido bem sucedido",
    201: "Created - Recurso criado com sucesso",
    204: "No Content - Sucesso, sem dados para devolver",
  
    // ── 3xx: REDIRECAO ──
    301: "Moved Permanently - Recurso mudou de URL",
    302: "Found - Recurso temporariamente noutro URL",
    304: "Not Modified - Dados nao mudaram (usar cache)",
  
    // ── 4xx: ERRO DO CLIENTE ──
    400: "Bad Request - Pedido invalido (dados em falta ou errados)",
    401: "Unauthorized - Sem autorizacao (login necessario)",
    403: "Forbidden - Sem permissao (mesmo autenticado)",
    404: "Not Found - Recurso nao existe",
    409: "Conflict - Conflito (ex: horario ja ocupado)",
    422: "Unprocessable Entity - Dados bem formatados mas invalidos",
    429: "Too Many Requests - Demasiados pedidos (rate limit)",
  
    // ── 5xx: ERRO DO SERVIDOR ──
    500: "Internal Server Error - Erro interno do servidor",
    502: "Bad Gateway - Servidor intermediario falhou",
    503: "Service Unavailable - Servidor em manutencao"
  };
 
 

//OBJETO VAI SER CONVERTIDO EM JASON, é uma lingua universal

const utilizador = {
    id: 1,
    nome: "Pedro",
    email: "pedro@gmail.com"
}

//passar para formato de texto JSON, vira tudo uma STRING

const utilizador1 = {
    "id": 1,
    "nome": "Pedro",
    "email": "pedro@gmail.com"
}


//PARTE 1- OBJETO =>STRING(JSON) STRINGFY, os numeros não levam string e nem os bolenos

const marcacao = {
    id: 1,
    nome: "Ana",
    data:"2026-02-15",
    hora:"10:00"
}

const marcacaoJSON = JSON.stringify(marcacao)

console.log("Objeto:", marcacao)
console.log("JSON:", marcacaoJSON)
console.log("JSON", typeof marcacaoJSON)


//PARTE 2- RECEBEMOS O JSON STRING => OBJ. PARSING fazer a função inversa do json, volta ao normal, converto tudo novamente a objeto

const jsonRecebido = '{"id":1, "nome":"Ana"}'
const objetoRecebido = JSON.parse(jsonRecebido)
console.log("JSON recebido:", jsonRecebido)
console.log("objeto parsado:", objetoRecebido)

//LER E ESCREVER FICHEIROS EM JSON

//IMPORTAR MÓDULO

const fs = require("fs")
const path = require("path")
 
const caminho = path.join(__dirname,"agenda.json")
console.log(caminho)

//GUARDAR OBJETO -> JSON ->FICHEIRO

const marcacoes = [
    { id: 1, cliente: "Ana Silva", servico: "Consulta", preco: 50 },
    { id: 2, cliente: "Bruno Costa", servico: "Exame", preco: 80 },
    { id: 3, cliente: "Carla Dias", servico: "Revisao", preco: 30 },
  ];

  //PASSO 1- CONVERTER A JSON

  const marcacoesJSON = JSON.stringify(marcacoes)


  // PASSO 2 - ESCREVER O TEXTO NO FICHEIRO

  fs.writeFileSync(caminho, marcacoesJSON) //vai abrir uma nova pasta com as informações escritas nesta função, exemplo, escrevemos o caminho e podemos escrever
  //"Olá Mundo", vai aparecer o "Olá Mundo escrito na outra página"


  //PASSO 3- LER UM JSON
  //Utilizando o ficheiro produtos.json, ler os dados através do modulo fs (filesystem) do js
  const caminho2 = path.join(__dirname,"produtos.json")
  const dados = fs.readFileSync (caminho2, "utf-8")
  console.log(dados)
  
  //PASSO 4. CONVERTER EM OBJETO
  // Converter os dados lidos no passo 3 em um objeto JS para ser trabalhado

  const produtosJson = JSON.parse(dados)
  console.log(produtosJson)



  //PASSO 5- o frontend quer saber quais os produtos com stock = 0

const produtosZero = produtosJson.filter(
    (produto) => produto.stock ===0
)

console.log(produtosZero)

//PASSO 6- Criar resposta para enviar ao cliente

const resposta = { 
    status: 200, 
    Headers:{
        
    },
    body:{
        sucesso: true,
        mensagem: "Produtos sem stock encontrados",
    dados: produtosZero
    } 
        
    }

    console.log(resposta)


    //FRONTEND- CLIENTE
    //ACEDER AOS PRODUTOS DA RESPOSTA

    const produtoCliente = resposta.body.dados
    console.log(produtoCliente)


