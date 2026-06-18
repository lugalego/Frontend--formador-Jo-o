// ========================================

// EXERCICIO 3: ENCONTRAR O MAIOR

// ========================================

// Dado um array de numeros, devolve o maior valor.

// Nao usar Math.max().

//

// Exemplo:

//   encontrarMaior([3, 7, 2, 9, 1])  -> 9

//   encontrarMaior([10])              -> 10

//   encontrarMaior([-5, -2, -8])      -> -2

//

// Dica: comecar com o primeiro elemento e comparar com os restantes.

 

function encontrarMaior(numeros) {

  // TODO: escreve o teu codigo aqui
  let maior = numeros[0]; // variável maior é como se fosse um papel, que vamos ir anotando os valores

 for (let i = 1; i < numeros.length; i++){
    if (numeros [i] > maior){ // SE O NUMERO FOR MAIOR QUE O MAIOR(ESCRITO NO PAPEL)
   maior = numeros[i]
    }
}
return maior;
  }

              

console.log(encontrarMaior([3, 7, 2, 9, 1]))


// ========================================
// EXERCICIO 4: FIZZBUZZ
// ========================================
// Dado um numero n, devolve um array com os valores de 1 ate n onde:
//  - Multiplos de 3 -> "Fizz"
//  - Multiplos de 5 -> "Buzz"
//  - Multiplos de 3 E 5 -> "FizzBuzz"
//  - Outros -> o proprio numero (como string)
//
// Exemplo:
//   fizzBuzz(5)  -> ["1", "2", "Fizz", "4", "Buzz"]
//   fizzBuzz(15) -> ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]
//
// Dica: usar o operador % (modulo) para verificar divisibilidade.
 
function fizzBuzz(n) {
  // TODO: escreve o teu codigo aqui
  const resultado = []
for (let i = 1; i <= n; i++){
    //1. VERIFICAR SE É MULTIPLO DE 3 E 5 PRIMEIRO
    if (i % 3 === 0 && i % 5 === 0){
    resultado.push("FizzBuzz") //2. VERIFICAR SE É MULTIPLO APENAS DE 3
        } else if(i % 3 === 0){
    resultado.push("Fizz") //3. VERIFICAR SE É MULTIPLO APENAS DE 5
        } else if( i % 5 === 0){
     resultado.push("Buzz")   //4. CASO CONTRÁRIO, USE O PRÓPRIO NUMERO COMO STRING
        } else {
        resultado.push(i)
    }

          
}
return resultado;

}

console.log (fizzBuzz (100))


 




