const express = require("express")
const app = express()
const PORT = 3000
const path = require ("path")
// Le o ficheiro .env e coloca as variaveis em process.env.
require("dotenv").config()
 
// Importamos as duas pecas do Prisma (ver explicacao no topo):
//   - PrismaClient  -> classe do objeto que usamos no codigo
//   - PrismaMariaDb -> classe do adapter para MySQL/MariaDB
const { PrismaClient } = require ("@prisma/client")
const { PrismaMariaDb } = require("@prisma/adapter-mariadb")
 
//ADAPTER
//Consegue falar diretamente com o mySQL
// As variaveis vem do .env
const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
})
 
//CLIENT
//"PRIMA" é o objeto que vamos usar em todas as rotas
 
const prisma = new PrismaClient({adapter})
 
// MIDDLEWARE
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
 
//Leitura de JSON nos bodies
app.use(express.json())

app.use(express.static(path.join(__dirname,"frontend"))) //aqui vamos fazer a ligação do html e do css e já podemos ver pelo locallhost3000
 

app.use((req,res,next)=>{
    const hora = new Date().toLocaleTimeString("pt-PT")
    console.log(`[${hora}] ${req.method}  ${req.url}`)
    next()
})
 
// home page
 
app.get("/", (req,res)=>{
    res.json({mensagem:"Welcome to the jungle"})
})
 
// GET all musicas
app.get("/api/musicas", async (req,res)=>{
 
    const musicas = await prisma.musica.findMany({orderBy: {id: "asc"}})
 
    res.status(200).json(musicas)
})
// OBTER uma música por id
app.get("/api/musicas/:id", async (req,res)=>{
    const id = Number(req.params.id)
 
    const musica = await prisma.musica.findUnique({ where: { id } })
 
    console.log(musica)
 
    if (!musica){
        return res.status(404).json({erro: "Música não encontrada"})
    }
    res.json(musica)
})
 
 
 
// CRIAR uma musica.
 
app.post("/api/musicas", async (req,res)=>{
    const nova = await prisma.musica.create({ data: req.body })
    res.status(201).json(nova)
})
 
// ATUALIZAR uma musica.
 
app.put("/api/musicas/:id", async (req,res)=>{
    const id = Number(req.params.id)
    //Confirmamos primeiro a existência da música
    const musica = await prisma.musica.findUnique({where: {id}})
    if(!musica){
        return res.status(404).json({erro: "Música não foi encontrada"})
    }
 
    const atualizada = await prisma.musica.update({ where: {id}, data: req.body})
    res.status(200).json(atualizada)
})
 
// ALTERNAR favorita (true <-> false).
 
app.patch("/api/musicas/:id/favorita", async (req,res)=>{
    const id = Number(req.params.id)
    //Confirmamos primeiro a existência da música
    const musica = await prisma.musica.findUnique({where: {id}})
    if(!musica){
        return res.status(404).json({erro: "Música não foi encontrada"})
    }
 
    const atualizada = await prisma.musica.update({ where: {id}, data: {favorita: !musica.favorita}})
    res.status(200).json(atualizada)
})
 
// APAGAR uma musica.
 
app.delete("/api/musicas/:id", async (req,res)=>{
    const id = Number(req.params.id)
 
    const musica = await prisma.musica.findUnique({where: {id}})
    if(!musica){
        return res.status(404).json({erro: "Música não foi encontrada"})
    }   
    
    const eliminada = await prisma.musica.delete({ where: {id}})
    console.log(eliminada)
 
    res.status(200).json({mensagem: "Música eliminada com sucesso", música: eliminada})
})
 
 
 
// 404 - ROTA NÃO ENCONTRADA
app.use((req, res) => {
    res.status(404).json({ erro: "Rota nao encontrada" });
  });
  // ERROR HANDLER - ERRO 500 QUANDO TEMOS UM ERRO NO CONTACTO COM A BD
  app.use((erro, req, res, next) => {
    console.error("Erro no servidor:", erro.message);
    res.status(500).json({ erro: "Erro interno do servidor" });
  });
 
 
app.listen(PORT, ()=>{
    console.log(`Servidor a rolar na porta ${PORT}`)
})
 
 
 
 
 