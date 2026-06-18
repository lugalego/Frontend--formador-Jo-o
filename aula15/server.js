//SERVIDOR HTTP COM NODEJS



const http = require("http")


const server = http.createServer((req, res)=>{ //criar um servidor que aceita um req e uma resp
    //req = request do cliente
    //res = responde do servidor

    //CRIAR UMA ROTA
    if (req.url === "/" && req.method ==="GET"){ // se o pedifo for / e o pedido for GET, manda um status 200 e uma resposta JSON
           if (req.url === "/" && req.method === "GET"){
        res.statusCode = 200;
        res.end(JSON.stringify({mensagem: "Página Inicial"}))
    } else if (req.url === "/sobre" && req.method === "GET"){
        const mensagem = {
            mensagem: "Sobre nós",
            versao: "1.0.0"
        }
        res.statusCode = 200;
        res.end(JSON.stringify(mensagem))   
     } else {
 
    res.statusCode = 404;
    res.end(JSON.stringify({error: "Rota não encontrada", url: req.url}))
 
     }
 

    res.statusCode = 400;
    res.end(JSON.stringify({error: "Rota não encontrada, url: req"}))

    //const html = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Meu Servidor</title>
//     </head>
//     <body>
//       <h1>Bem-vindo ao meu servidor Node.js!</h1>
//       <p>Este HTML foi gerado pelo servidor.</p>
//     </body>
//     </html>
//   `;

    res.end(html) //envia a resposta ao servidor do html acima

    //res.end("Olá Mundo!") //envia a resposta de texto
})


server.listen(3000, () => { //criar uma porta de acesso, tem dois argumentos, 3000 usamos sempre a porta 3000, que é o servidor, porta + função de aviso para avisar que o servidor esta a correr na porta 3000
    console.log("Servidor está a correr na porta 3000")
})


//Para correr o codigo e ver o olá mundo, abrir uma pegina no browser e digitar localhost:3000
 

