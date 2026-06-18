const express = require("express")
const app = express()
const PORT = 3000

//vamos usar uma base de dados local, um ARRAY

app.use(express.json()) //midleware para processar json

const marcacoes = [
  { id: 1, cliente: "Ana Silva", servico: "Consulta", data: "2026-03-01", hora: "09:00" },
  { id: 2, cliente: "Bruno Costa", servico: "Exame", data: "2026-03-01", hora: "10:00" },
  { id: 3, cliente: "Carla Dias", servico: "Revisao", data: "2026-03-02", hora: "11:00" },
];
 

app.get ("/", (req, res)=>{

    const mensagem = {mensagem: "Welcome to the jungle"}

    res.json(mensagem)
})

//ROTA: TODAS AS MARCAÇÕES

app.get("/api/marcacoes", (req, res)=>{ //se estivermos a trabalhar numa api temos que colocar o /api/- transição de dados de um lado para o outro, cliente e servidor
    res.status(200).json(marcacoes)
})

//ROTA- UMA MARCAÇÃO INDIVIDUAL

app.get("/api/marcacao/:id", (req, res)=>{ // /:id é um paramentro do pedido

    const id = Number (req.params.id) //pedido do servidor, dentro do pedido é o objeto e esta numa parte escrito parametros, e dentro esta o id
    const marcacao = marcacoes.find(m => m.id===id) /*vai procurar uma marcação especifica, as marcações são todas elas, para cada uma delas vai chamar de m, 
    vai ver se o m.id é ao id que veio do pedido (app.get)*/
   console.log(marcacao)
    if(!marcacao){ //Se marcação não existir
        res.status(400).json({mensagem:"Marcação não existente"})
    }

    res.status(200).json(marcacao)
   

   })

   //CRIAR UMA MARCAÇÃO - POST, pedido tipo post temos que enviar os dados, informações que ficam dentro do body

   app.post("/api/marcacoes", (req, res)=>{

    const { cliente, servico, data, hora } = req.body; //4 variáveis que vem do body, que são as informações

     if (!cliente || !servico || !data || !hora){ // se não existir
        return res.status(400).json({erro: "Faltam campos obrigatórios"})
     }   
    console.log(cliente, servico, data, hora)

    const novaMarcacao = { 
        id: marcacoes.length + 1, 
        cliente: cliente,
        servico: servico, 
        data: data, 
        hora: hora

    }
    marcacoes.push(novaMarcacao)

    res.status(201).json({mensagem: "Nova marcação criada com sucesso", dados: novaMarcacao })
   })

   //ALTERAR UMA MARCAÇÃO- PUT, PUT NORMALMENTO É IGUAL AO POST EM TERMOS DE CONTEUDO

   app.put("/api/marcacoes/:id", (req, res)=>{ //precisamos colocar o id para saber a marcação especifica
    
        const id = Number (req.params.id)

        //VERIFICAR SE A MARCAÇÃO EXISTE NA BASE DE DADOS
        const marcacao = marcacoes.find(m => m.id===id) //procurara a marcação usando o find

            //ENVIAR ERRO SE NÃO EXISTIR NA BASE DE DADOS
                if (!marcacao){
            return res.status(404).json({erro: "Marcação não encontrada"})
        }
        //EXTRAIR DADOS DO BODY DO PEDIDO (REQUEST)
        const { cliente, servico, data, hora } = req.body;

        //ATUALIZAR OS CAMPOS (SE ENVIADOS NO BODY)
        //O || (OU) MANTEM O VALOR ORIGINAL SE O NOVO FOR UNDEFINED/VAZIO
        marcacao.cliente = cliente || marcacao.cliente //o valor do cliente da marcação seja igual ao do cliente que veio do pedido
        marcacao.servico = servico ? servico : marcacao.servico
        marcacao.data = data || marcacao.data
        marcacao.hora = hora || marcacao.hora 

       res.status(200).json({mensagem:"Marcação Atualizada com sucesso", dados: marcacao})
       })

   //DELETE- eliminar uma entrada específica

   app.delete("/api/marcacoes/:id", (req, res)=>{

    //EXTRAIR ID DOA PARAMS DO PEDIDO (REQUEST)
     const id = Number (req.params.id)

     //FINDINDEX- DEVOLVE O INDICE DO OBJETO, INDICE DO ARRAY, 0, 1, 2, 3...
    //ENCOMNTRAR O INDICE DO ID NO ARRAY
     const indice = marcacoes.findIndex(m => m.id===id)
     console.log(indice)
     //SE O INDICE NÃO EXISTIR, ENVIAR ERRO
     if(indice=== -1) {
        return res.status(404).json({erro:"Marcação não encontrada"})
     }

     //SPLICE (INDICE DE ONDE QUEREMOS INICIAR O CORTE E O NUMERO DE POSIÇÕES QUE QUEREMOS ELIMINAR, splice remove 1 elemnto apo´s o indice passado
     marcacoes.splice(indice, 1) 

     res.status(200).json({mensagem:"Marcação eliminada com sucesso"})
    
     })

     app.use((req, res)=>{

        res.status(400).json({mensagem:" Página não encontrada", url: req.url})
     })

   



app.listen(PORT, ()=> {
    console.log(`Servidor a rolar na porta ${PORT}`)
})