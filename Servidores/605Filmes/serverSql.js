require("dotenv").config() 


const express= require("express")
const app = express()
const mysql = require("mysql2/promise")
const PORT = 3000


const pool = mysql.createPool({
  host: process.env.DATABASE_HOST, 
  port: Number(process.env.DATABASE_PORT || 3306),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
})

app.use(express.json()) 

const generosValidos = ["drama", "ficcao", "acao", "animacao", "terror", "comedia", "documentario"]
 

function validarFilmes(req, res, next) { 

  const{titulo, realizador, genero, ano, tipo, avaliacao}= req.body

  const tituloLimpo = String(titulo). trim() 
  const realizadorLimpo = String(realizador).trim()
  const generoLimpo = String(genero).trim().toLowerCase()
  const anoAtual = new Date().getFullYear()
  const tipoLimpo = new String(tipo). trim()
  const avaliacaoLimpo =  Number(avaliacao)
  
 

  const erros = [] 

  if (tituloLimpo.length < 2 || tituloLimpo > 200){
    erros.push("Título obrigatório (entre 2 e 200 caracteres) ")
   }
   if (realizadorLimpo.length < 2 || realizadorLimpo > 200){
    erros.push("Realizador obrigatório (entre 1 e 200 caracteres) ")
   }
   if (!generoLimpo.includes(generoLimpo)){
    erros.push("Genero inválido")
   }
   if( ano > anoAtual){
    erros.push("Ano não pode ser maior que o ano atual")
   }
   if (tipoLimpo.length < 2 || tipoLimpo > 20) {
    erros.push("Tipo obrigatório (entre 2 e 200 caracteres)")
   }

   if (avaliacaoLimpo < 0) {
     erros.push ("Avaliação inválida")
   }

   if(erros.length > 0){
    return res.status(400).json({erros})
    }

    

    req.body = {
      titulo : tituloLimpo,
      realizador : realizadorLimpo,
      genero : generoLimpo, 
      ano,
      tipo : tipoLimpo,
      avaliacao :avaliacaoLimpo
    }

    next()
    
  }


  app.get("/", (req, res)=>{

    res.status(200).json({mensagem:"Página principal"})
})

//ROTA 1- GET ALL FILMES

app.get("/api/filmes", async (req, res)=>{
  const query = "SELECT * FROM filmes" //SQL

  const [linhas] = await pool.execute(query) 
  console.log(linhas)

  res.json(linhas)
res.status(200).json

})


//ROTA 2- GET UM FILME

app.get("/api/filmes/:id", async (req, res)=>{
  const id = req.params.id
  const query = "SELECT * FROM filmes WHERE id = ?" 

  const [linhas] = await pool.execute(query, [id]) 
  if (linhas.length === 0){
        return res.status(404).json({mensagem:"Este filme não existe"})
    }
  res.json(linhas)
})


//CRIAR UM FILME

app.post ("/api/filmes", validarFilmes, async (req, res)=>{
  
const{titulo, realizador, genero, ano, tipo, avaliacao} = req.body
console.log(req.body)
console.log(titulo, realizador, genero, ano, tipo, avaliacao)

const query = "INSERT INTO filmes (titulo, realizador, genero, ano, tipo, avaliacao) VALUES (?, ?, ?, ?, ?, ?)";

const[resultado] = await pool.execute(query, [titulo, realizador, genero, ano, tipo, avaliacao])


res.status(201).json({mensagem: "Filme criado com sucesso"})

 
})

//ATUALIZAR UM FILME
//PUT/PATCH

app.put("/api/filmes/:id", validarFilmes, async (req,res)=>{
    
    const id = Number(req.params.id)
    
    const query = "SELECT * FROM filmes WHERE id = ?"
    const [linhas] = await pool.execute(query, [id])
    
    if (linhas.length === 0){
        return res.status(404).json({mensagem:"Este filme não existe"})
    }
    
    const { titulo, realizador, genero, ano, tipo, avaliacao} = req.body
    
    const query2 = "UPDATE filmes SET titulo = ?, realizador = ?, genero = ?, ano = ?, tipo = ?, avaliacao = ? WHERE id = ?"
    const [linhas2] = await pool.execute(query2, [titulo, realizador, genero, ano, tipo, avaliacao, id])
 
 
    res.status(200).json({mensagem: "Filme alterado com sucesso", dados: linhas2})
})

//DELETE

app.delete("/api/filmes/:id", async (req, res)=>{
  
    const id = Number(req.params.id)
    
    const query = "SELECT * FROM filmes WHERE id = ?"
    const [linhas] = await pool.execute(query, [id])
        if (linhas.length === 0){
        return res.status(404).json({mensagem:"Este filme não existe"})
    }
    
    
    const query2 = "DELETE FROM filmes WHERE ID = ?"
    const [linhas2] = await pool.execute(query2, [id])
 

  res.status(200).json({mensagem: "Filme apagado com sucesso"})


})


app.listen(PORT, async ()=> { 
    console.log(`Servidor a rolar na porta ${PORT}`)
    try{ 
       
        await pool.execute("SELECT 1") 
           } catch(erro) { 
      console.log("Erro na ligação ao servidor SQL:", erro.message)
    }

      
})





