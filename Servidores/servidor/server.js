const express = require("express"); //require da boblioteca, ir buscar a tal biblioteca, vai buscar no node_modules
const app = express(); // INICIAREM O PACOTE EXPRESS, FICA GUARDADO NUMA PORTA CHAMAD APP
const PORT = 3000; //PORTA LOCALHOST

//algumas portas são reservadas

//ROTA PRINCIPAL

app.get("/",(req,res)=>{
    res.send("Olá Mundo")
}) //colocar o serrvidor a escuta

//criar a rota + o metodo

//ROTA PRODUTOS COM TEXTO

app.get("/produtos", (req, res) =>{
     res.send("Aqui vão os produtos")
})
   
//app.metodo (get, put, push, delete) + a URL mas só o final da url ex: /produtos, 2- colocar a logica o ruteamento com a 
//função req, res e no final envia a resposta, para correr o servidor npm run dev


//ROTA CARRINHO
app.get("/carrinho", (req, res) =>{ //texto
     res.send("Carrinho")
})


//ROTA HTML
app.get("/pagina", (req, res) =>{ //aqui vão colocar html
     const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Minha Página</title>
    </head>
    <body>
      <h1>Bem-vindo!</h1>
      <p>Esta página foi gerada pelo Express.</p>
    </body>
    </html>
  `;
  res.send(html) //essa parte é que vai enviar para o servidor
}) //para vernos no browser escrever localhost:3000/pagina

//ROTA COM JSON
//SEND ENVIAR TXT e HTML
//JSON envia em formato JSON
app.get("/json", (req,res) =>{
 
    const resposta = {
        statusCode: 200,
        messagem: "Dados em JSON"
    }
    
    res.json(resposta)
})

//STATUS CODES

app.get("/sucesso", (req, res)=>{
 
    const mensagem = {
        mensagem: "OK"
    }
    
    res.status(200).json(mensagem)
})
  

//POST - CRIAR UMA ENTRADA NA BASE DE DADOS

app.post("/api/users", (req, res)=>{

    res.status(201).json({mensagem: "Utilizador foi criado com sucesso"})
})

//ROTA NÃO EXISTE, TEM SEMPRE QUE EXISTIR
//MIDDLEWARE É A ROTA NÃO ENCONTRADA

app.use((req, res) =>{ //utilizamos a rota use porque não temos uma rota definida por ser um erro na pagina

    const mensagem = {
        erro: "Rota não encontrada",
        rota: req.url
    }
    res.status(404).json(mensagem)
})


app.listen(PORT, () => {
    console.log(`Servidor está a correr na porta ${PORT}`)
}) // colocar dois argumentos: 1- porta 2- função callback, serve para dar a informação visual que o servidor está a funcionar
