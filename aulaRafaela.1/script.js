// 3
function adicionarTarefa() {
    // 4
    let mensagem = "Tarefa adicionada com sucesso!";
    //O codigo abaixo realiza o Input
    // 5
    let inputTarefa = document.getElementById("inputTarefa")
    
    // 6 pega o valor do input
    let tarefa = inputTarefa.value
    // 8
    // document.getElementById("mensagem").textContent = tarefa; Busca o elemnto por id
    // 16 descomentar o 4o passo e alterar a mennsagem do 8o passo para, alterar a tarefa para mensagem:
     document.getElementById("mensagem").textContent = mensagem;
    // 11    
    let listaTarefas = document.getElementById("listaTarefas")
    // 12 posso ir lá na página e inspecionar e clicar no botão adicionar tarefa que já aparece o que está sendo executado
    // console.log(listaTarefas)
    // 13- criai um LI, ou seja, um elemento
    let novaTarefa = document.createElement("li")
    //14 vou pegar do ul a lista tarefas e vou adicionar um elemnto filho, e quando inspecionar já vai aparecer embaico do ul um li
    listaTarefas.appendChild(novaTarefa)
    // 15 adidionar um texto, vou pegar na minha nova tarefa e vou colocar um .text
    novaTarefa.textContent = tarefa
    // 9
    inputTarefa.value = ""    //para ficar limpo na barrinha de texto, vai ficar escrito sempre, digite sua tarefa

}