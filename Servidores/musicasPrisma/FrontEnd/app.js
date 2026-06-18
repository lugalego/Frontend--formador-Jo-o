// ------------------------------------------------------------
// REFERENCIAS AO HTML
// ------------------------------------------------------------
//
// document.getElementById("xpto") procura no HTML o elemento com id="xpto".
// Guardamos em variaveis para nao termos de o procurar varias vezes.
 
const formulario = document.getElementById("form-musica")
const lista = document.getElementById("lista-musicas");
const mensagem = document.getElementById("mensagem");
 
 
 
async function carregar() {
    // fetch(url) faz um pedido HTTP. Por defeito o metodo e GET.
  // Devolve um objeto "Response" com info da resposta.
 
    const resposta = await fetch("/api/musicas")
      // .json() le o corpo da resposta e converte texto JSON -> objeto JS.
 
    const musicas = await resposta.json()
 
    // Mostrar mensagem se a lista estiver vazia.
  if (musicas.length === 0) {
    // .textContent escreve texto simples dentro do elemento.
    mensagem.textContent = "Sem musicas. Adiciona a primeira!";
    // .className troca todas as classes CSS do elemento.
    mensagem.className = "mensagem vazia";
  } else {
    mensagem.textContent = "";
    mensagem.className = "";
  }
  // Vamos construir o HTML de todos os cartoes numa string
  // e so depois meter na pagina, para evitar re-desenhar varias vezes.
  let html = "";
  let totalFavoritas = 0;
  const generos = [];
 
  // for...of percorre cada elemento do array (uma musica de cada vez).
  for (const musica of musicas) {
    // Operador ternario: condicao ? valor-se-true : valor-se-false
    const estrela = musica.favorita ? "★" : "☆";
    const classeFav = musica.favorita ? "ativa" : "";
 
    // TEMPLATE LITERAL: texto entre crases (`).
    //   - permite varias linhas
    //   - ${ ... } injeta o valor de uma variavel ou expressao
    // Aqui construimos HTML com os dados da musica la dentro.
    //
    // onclick="favoritar(${musica.id})" no HTML chama a funcao
    // favoritar(N) quando o botao for clicado.
    html += `
      <article class="cartao">
        <div class="cartao-info">
          <h3>${musica.titulo}</h3>
          <p class="cartao-meta">
            <span class="badge">${musica.genero}</span>
            <span>${musica.artista}</span>
            <span class="cartao-ano">${musica.ano}</span>
          </p>
        </div>
        <div class="cartao-acoes">
          <button class="btn-fav ${classeFav}" onclick="favoritar(${musica.id})">${estrela}</button>
          <button class="btn-apagar" onclick="apagar(${musica.id})">Apagar</button>
        </div>
      </article>
    `;
 
    // ++ incrementa a variavel em 1.
    if (musica.favorita) totalFavoritas++;
 
    // .includes(x) -> true/false se o array tem x.
    // .push(x)     -> adiciona x ao fim do array.
    if (!generos.includes(musica.genero)) generos.push(musica.genero);
  }
 
  // .innerHTML SUBSTITUI todo o conteudo HTML dentro do elemento.
  lista.innerHTML = html;
 
  // Atualizar as estatisticas no topo.
  document.getElementById("stat-total").textContent = musicas.length;
  document.getElementById("stat-favs").textContent = totalFavoritas;
  document.getElementById("stat-generos").textContent = generos.length;
}
 
 
// ============================================================
// CRIAR (POST /api/musicas)
// ============================================================
//
// addEventListener("submit", funcao):
//   "Quando o formulario for submetido, corre esta funcao."
// O argumento "evento" tem informacao sobre o evento que aconteceu.
 
formulario.addEventListener("submit", async function (evento) {
  // Por defeito, ao submeter um form, o browser RECARREGA a pagina.
  // preventDefault() cancela esse comportamento para nos tratarmos do submit.
  evento.preventDefault();
 
  // .value le o texto que o utilizador escreveu no input.
  const dados = {
    titulo: document.getElementById("titulo").value,
    artista: document.getElementById("artista").value,
    genero: document.getElementById("genero").value,
    // <input type="number"> devolve sempre uma string.
    // Number(string) converte para numero.
    ano: Number(document.getElementById("ano").value),
  };
 
  // fetch com OPCOES para mudar o metodo, headers e body:
  //   method  -> POST (queremos criar)
  //   headers -> avisamos que o body e JSON
  //   body    -> os dados convertidos para texto JSON
  await fetch("/api/musicas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
 
  // .reset() limpa todos os campos do formulario.
  formulario.reset();
 
  // Voltar a buscar a lista para mostrar a nova musica.
  carregar();
});
 
 
// ============================================================
// MARCAR/DESMARCAR FAVORITA (PATCH /api/musicas/:id/favorita)
// ============================================================
//
// Esta funcao e chamada pelos botoes "★"/"☆" criados em carregar().
// No HTML gerado: onclick="favoritar(3)"  ->  chama favoritar(3).
 
async function favoritar(id) {
  // Os "+" juntam strings (concatenacao):
  //   "/api/musicas/" + 3 + "/favorita"  ->  "/api/musicas/3/favorita"
  await fetch("/api/musicas/" + id + "/favorita", { method: "PATCH" });
  carregar();
}
 
 
// ============================================================
// APAGAR (DELETE /api/musicas/:id)
// ============================================================
 
async function apagar(id) {
  await fetch("/api/musicas/" + id, { method: "DELETE" });
  carregar();
}
 
 
// Chamar carregar() assim que o ficheiro acaba de ser lido.
// Assim a lista de musicas aparece logo quando a pagina abre.
carregar();
 
 