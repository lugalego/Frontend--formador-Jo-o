//Lê o ficheiro .env e coloca as variaveis em process.env

//chamar as bibliotecas no inicio
require("dotenv").config() //para lermos as vaiavies do ficheiro .env


const express= require("express")
const app = express()
const mysql = require("mysql2/promise")
const PORT = 3000

//POOL, PISCINA DE LIGAÇÕES COM A BASE DE DADOS, "Conjunto de legações" ao MSQL já abertas e prontas a usar.
//instalar o sql no terminal 1- npm install mysql2 
//2-npm install dotenv, são essas duas intalações que vamos precisar
//dotenv permite ler as variaveis do ficheiro .env
//criar um ficheiro novo .env que é o enviremental, são variáves de ambiente, variaveis secretas que não podem ir no codigo, ex: password 
//pedir ao GIT para ignorar este fivheiro .env
//criar o .gitignore
 

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST, //env- não esta diretamente no servidor, temos que colocar as informçãoe dentro do ficheiro .env
  //aqui trabalhmaos com ele mas não fica visível, temos que trablhar no ficheiro .env
  port: Number(process.env.DATABASE_PORT || 3306),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
})

app.use(express.json()) //fazer a ligação do midleware

//CONSTRUIR MIDDLEWARE

// Um middleware e uma funcao que corre ENTRE o pedido e a rota.
//
//   pedido --> middleware 1 --> middleware 2 --> rota --> resposta
//
// Forma de um middleware:
//
//   function nome(req, res, next) {
//     // ... fazer alguma coisa ...
//     next();   // continua para o proximo passo
//   }
//
// Regra: ou chamamos next() para continuar,
//        ou respondemos com res.json(...) e paramos aqui.

/*txt
Musica {
  id: number
  titulo: string (obrigatorio, min 2 caracteres, max 200)
  artista: string (obrigatorio, max 200)
  genero: string (obrigatorio: "pop", "rock", "hip-hop", "eletronico", "jazz", "classico", "outro")
  ano: number (obrigatorio, entre 1900 e ano atual)
  favorita: boolean (default: false)
  adicionadaEm: string (apenas na versao em memoria)
}*/



const generosValidos = ["pop", "rock", "hip-hop", "eletronico", "jazz", "classico", "outro"]
 

function validarMusica(req, res, next) { // podemos ter varios middleware, sendo assim temos que usar o next indicando para passar para o próximo

  const{titulo, artista, genero, ano}= req.body

  const tituloLimpo = String(titulo). trim() //trim=elimina espaços em branco
  const artistaLimpo = String(artista).trim()
  const generoLimpo = String(genero).trim().toLowerCase()
  const anoAtual = new Date().getFullYear()

  const erros = [] //controlar o numero de erros, temos que ver na lksta quais são os parametros que temos que seguir

  if (tituloLimpo.length < 2 || tituloLimpo > 200){
    erros.push("Título obrigatório (entre 2 e 200 caracteres) ")
   }
   if (artistaLimpo.length < 2 || artistaLimpo > 200){
    erros.push("Artista obrigatório (entre 1 e 200 caracteres) ")
   }
   if (!generoLimpo.includes(generoLimpo)){
    erros.push("Genero inválido")
   }
   if( ano > anoAtual){
    erros.push("Ano não pode ser maior que o ano atual")
   }

   if(erros.length > 0){
    return res.status(400).json({erros})
    }

    req.body = {
      titulo : tituloLimpo,
      artista : artistaLimpo,
      genero : generoLimpo, 
      ano
    }

    next()
    //temos o middleware pronto e agora temos que aplicar em todas as rotas que colocamos o body
  }


app.get("/", (req, res)=>{

    res.status(200).json({mensagem:"Página principal"})
})

//Com o servidor ligado vamos fazer as rotas

//ROTA 1- GET ALL MUSICAS

app.get("/api/musicas", async (req, res)=>{
  const query = "SELECT * FROM musica" //SQL

  const [linhas] = await pool.execute(query) //vai a base de dados buscar todas as musicas e a resposta vem em formato de array
  console.log(linhas)

  res.json(linhas)
})


//ROTA 2- GET UMA MUSICA

app.get("/api/musicas/:id", async (req, res)=>{
  const id = req.params.id
  const query = "SELECT * FROM musica WHERE id = ?" //SQL   //? significa um template, freases preparadas, no ponto de interrofaçao vai um valor que é inserido a pçarte

  const [linhas] = await pool.execute(query, [id]) //vai a base de dados buscar todas as musicas e a resposta vem em formato de array
  if (linhas.length === 0){
        return res.status(404).json({mensagem:"Esta música não existe"})
    }
  res.json(linhas)
})

//IMPRIMIR SOMENTE O TITULO DA MUSICA

app.get("/api/musicas/:id", async (req, res)=>{
  const id = req.params.id
  const query = "SELECT * FROM musica WHERE id = ?" //SQL   //? significa um template, freases preparadas, no ponto de interrofaçao vai um valor que é inserido a pçarte

  const [linhas] = await pool.execute(query, [id]) //vai a base de dados buscar todas as musicas e a resposta vem em formato de array
  if (linhas.length === 0){
        return res.status(404).json({mensagem:"Esta música não existe"})
    }
  res.json(linhas[0]. titulo)
})

//CRIAR UMA MUSICA NOVA, antes de validar a rota o middlerawe vai validar se está tudo ok

app.post ("/api/musicas", validarMusica, async (req, res)=>{
  //desconstruir o body, criar variáveis para armazenar os valores que estão no req.body
const{ titulo, artista, genero, ano} = req.body

/*if(!titulo || !artista || !genero || !ano) {
  return res.status(400).json({mensagem: "Faltam campos obrigatórios"})
}*/

const query = "INSERT INTO musica (titulo, artista, genero, ano) VALUES (?, ?, ?, ?)"

const[resultado] = await pool.execute(query, [titulo, artista, genero, ano])


res.status(201).json({mensagem: "Musica criada com sucesso"})

 
})

//Atualizar uma musica
//PUT/PATCH

app.put("/api/musicas/:id", validarMusica, async (req,res)=>{
    // EXTRAIR O ID DO REQ.PARAMS
    const id = Number(req.params.id)
    // QUERY PARA VERIFICAR SE EXISTE A MÚSICA COM O ID
    const query = "SELECT * FROM musica WHERE id = ?"
    const [linhas] = await pool.execute(query, [id])
    // MÚSICA NÃO EXISTIR TEMOS UM ERRO
    if (linhas.length === 0){
        return res.status(404).json({mensagem:"Esta música não existe"})
    }
    // Desconstruir o body - criar variáveis para amazenar os valores que estão no req.body
    const { titulo, artista, genero, ano } = req.body
    // Query para atualizar entrada
    const query2 = "UPDATE musica SET titulo = ?, artista = ?, genero = ?, ano = ? WHERE id = ?"
    const [linhas2] = await pool.execute(query2, [titulo,artista, genero, ano, id])
 
 
    res.status(200).json({mensagem: "Música Alterada com sucesso", dados: linhas2})
})

//DELETE

app.delete("/api/musicas/:id", async (req, res)=>{
  // EXTRAIR O ID DO REQ.PARAMS
    const id = Number(req.params.id)
    // QUERY PARA VERIFICAR SE EXISTE A MÚSICA COM O ID
    const query = "SELECT * FROM musica WHERE id = ?"
    const [linhas] = await pool.execute(query, [id])
    // MÚSICA NÃO EXISTIR TEMOS UM ERRO
    if (linhas.length === 0){
        return res.status(404).json({mensagem:"Esta música não existe"})
    }
    
    // Query para eliminar a entrada
    const query2 = "DELETE FROM musica WHERE ID = ?"
    const [linhas2] = await pool.execute(query2, [id])
 

  res.status(200).json({mensagem: "Música apagada com sucesso"})


})


//ROTA 404
//Esta rota fica depois de todas as outras
//Se o pedido chegou até aqui é porque nenhuma rota anterior correspondeu
app.use((req, res)=>{
  res.status(404).json({erro: "Rota não encontrada", rota:req.url})
})

//Quando tem um erro no servdor, exemplo, a internet falhou, temos que colocar este erro para aparecer no browser

app.use((erro, req, res, next)=>{
  console.log("Erro", erro.message)
  res.status(500).json({ "Erro no servidor"})
})

app.listen(PORT, async ()=> { //async é uma função que tem que se esperar que ela termine
    console.log(`Servidor a rolar na porta ${PORT}`)
    try{ 
        //TENTA FAZER A LIGAÇÃO, SE DER SUCESSO OK, SE DER ERRO O PROGRAMA PODE IR ABAIXO
         //FAZER A LIGAÇÃO A BASE DE DADOS DENTRO DO LISTEN
        await pool.execute("SELECT 1") //query do mySQL //o await significa esperar, o programa espera enquanto não vem a resposta, assincrono
        console.log()
    } catch(erro) { //se der algum erro, o progarma vai apanhar o erro pra deixar o programa correr
      console.log("Erro na ligação ao servidor SQL:", erro.message)
    }

   
   
})

//DOIS SERVIDORES A COMUNICAR ENTRE ELES, SERVIDOR (JAVA SCRIPT) + SQL
/*JAVA SCRIPT, CLIENTE ENVIA OS DADOS, DADOS TIPO POST E OD DADOS VÃO SER GUARDADOS NA BASE DE DADOS, ENVIAR UMA RESPOSTA AO CLIENTE, SUA CONTA FOI CRIADA COM SUCESSO
 MAS SE O SERVIDOR ESTIVER OFF LINE FAZ UM PROCESSO ASSINCRONO, ENTRA EM PAUSA ATÉ A RESPOSTA DA BASE DE DADOS, 
SE FOR SINCRONO A BASE DE DADOS PODE ESTAR OFFLINE E DAR A RESPOSTA AO SERVIDOR, COM RESPOSTAS PRONTAS*/

/*Comunicação assincrona, do front end para o back end, temos que esperar a resposta do servidor,
e na base de dados também é assincrona pois temos que esperar uma resposta do servidor que vai buscar as infromações na base de dados*/