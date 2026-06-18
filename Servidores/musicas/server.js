const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())

const musicas = [

  {

    id: 1,

    titulo: "Bohemian Rhapsody",

    artista: "Queen",

    genero: "rock",

    ano: 1975,

    favorita: true,

    adicionadaEm: "2026-01-15T10:30:00.000Z"

  },

  {

    id: 2,

    titulo: "Lose Yourself",

    artista: "Eminem",

    genero: "hip-hop",

    ano: 2002,

    favorita: false,

    adicionadaEm: "2026-02-03T14:22:00.000Z"

  },

  {

    id: 3,

    titulo: "Take Five",

    artista: "Dave Brubeck",

    genero: "jazz",

    ano: 1959,

    favorita: false,

    adicionadaEm: "2026-02-18T09:15:00.000Z"

  },

  {

    id: 4,

    titulo: "Strobe",

    artista: "deadmau5",

    genero: "eletronico",

    ano: 2009,

    favorita: true,

    adicionadaEm: "2026-03-05T20:45:00.000Z"

  },

  {

    id: 5,

    titulo: "Clair de Lune",

    artista: "Claude Debussy",

    genero: "classico",

    ano: 1905,

    favorita: false,

    adicionadaEm: "2026-03-12T11:00:00.000Z"

  },

  {

    id: 6,

    titulo: "Garota de Ipanema",

    artista: "Tom Jobim",

    genero: "outro",

    ano: 1962,

    favorita: true,

    adicionadaEm: "2026-03-28T16:50:00.000Z"

  },

  {

    id: 7,

    titulo: "Chuva Dissolvida",

    artista: "Ornatos Violeta",

    genero: "rock",

    ano: 1999,

    favorita: true,

    adicionadaEm: "2026-04-10T08:30:00.000Z"

  },

  {

    id: 8,

    titulo: "Blinding Lights",

    artista: "The Weeknd",

    genero: "pop",

    ano: 2019,

    favorita: false,

    adicionadaEm: "2026-04-22T19:12:00.000Z"

  },

  {

    id: 9,

    titulo: "Around the World",

    artista: "Daft Punk",

    genero: "eletronico",

    ano: 1997,

    favorita: false,

    adicionadaEm: "2026-05-04T13:40:00.000Z"

  },

  {

    id: 10,

    titulo: "Despacito",

    artista: "Luis Fonsi",

    genero: "pop",

    ano: 2017,

    favorita: false,

    adicionadaEm: "2026-05-18T17:25:00.000Z"

  }

];

let proximoId = musicas.length
 

app.get ("/", (req, res)=>{

    const mensagem = {mensagem: "Lets play some music"}

    res.json(mensagem)
})

//ROTA- TODAS AS MÚSICAS:

app.get ("/api/musicas", (req, res)=>{
   res.status(200).json({total: musicas.length, musicas: musicas})
})

//ROTA- UMA MÚSICA

app.get ("/api/musicas/:id", (req, res)=>{
    const id = Number (req.params.id)

    const musica = musicas.find(m => m.id===id)
    console.log(musica)
    if(!musica) {
        res.status(404).json({mensagem: "Música não existe"})
    }

    res.status(200).json(musica)
})

//POST- CRIAR UMA MÚSICA

app.post ("/api/musicas", (req, res)=>{

    const Musica =  {titulo, artista, genero, ano, favorita, adicionadaEm} = req.body;

    if (!titulo || !artista || !genero || !ano){ 
        return res.status(400).json({erro: "Faltam campos obrigatórios"})
    }
  
    console.log(titulo, artista, genero, ano, favorita)

    const novaMusica = { 

    id: musicas.length + 1, 

    titulo: req.body.titulo,

    artista: req.body.artista,

    genero: req.body.genero,

    ano: req.body.ano,

    favorita: req.body.favorita,

    adicionadaEm: new Date()}

    

    musicas.push(novaMusica)

    res.status(201).json({mensagem: "Nova música criada com sucesso", dados: novaMusica })
    })

   
    //ALTERAR UMA MUSÍCA- PUT

     app.put("/api/musicas/:id", (req, res)=>{ 
    
        const id = Number (req.params.id)

        
        const musica = musicas.find(m => m.id===id) 
            
         if (!musica){
            return res.status(404).json({erro: "Música não encontrada"}) //404 é o erro não encontrado
        }
        
        const {titulo, artista, genero, ano} = req.body; //não é obrigatório vir o complemento todo para a verificação

        
        musica.titulo = titulo ||  musica.titulo //se vier a informação do body ele assume a informação nova, caso contrário assume a informação que já estava antes
        musica.artista = artista || musica.artista
        musica.genero = genero || musica.genero
        musica.ano = ano || musica.ano

       res.status(200).json({mensagem:"Música Atualizada"})
       })

       //MUSICA FAVORITA-  PUT OU PATCH

       // ROTA PUT/PATCH
 
    app.patch(("/api/musicas/favorita/:id"), (req,res)=>{
    const id = Number(req.params.id)
    const musica = musicas.find(m => m.id === id)
    if(!musica){
    return res.status(404).json({mensagem: "Música não existe"})
    }
    musica.favorita = !musica.favorita
    res.status(200).json({mensagem: `Música alterada para ${musica.favorita}`})
})


       //DELETAR UMA MUSICA- DELETE

   app.delete("/api/musicas/:id", (req, res)=>{

    
     const id = Number (req.params.id)

    
     const indice = musicas.findIndex(m => m.id===id)
     console.log(indice)
    
     if(indice=== -1) {
        return res.status(404).json({erro:"Música não encontrada"})
     }
    
     musicas.splice(indice, 1) 

     res.status(200).json({mensagem:"Música eliminada com sucesso"})
    
     })

     app.use((req, res)=>{

        res.status(400).json({mensagem:" Página não encontrada", url: req.url})
     })

   
app.listen(PORT, ()=> {
    console.log(`Servidor a rolar na porta ${PORT}`)
})