// Validando a entrada dos dados.

// Deixa o usuário inserir apenas três caracteres numéricos. Corridas de mais de 999 horas não deve existir. 
function validaHora(p) {
    p.value = p.value.replace(/[^0-9]/g, '').slice(0, 3)
}

// Deixa o usuário inserir apenas dois caracteres númericos. Se digitar algarismo maior que 60 minutos, transforma em 60.
function validaMinuto(p) {
    p.value = p.value.replace(/[^0-9]/g, '').slice(0, 2)
    if(parseInt(p.value) > 60)
        p.value = '60'
}

// Deixa o usuário inserir apenas dois caracteres numéricos. Se digitar algorismo maior que 60 minutos, transforma em 60.
function validaSegundo(p) {
    p.value = p.value.replace(/[^0-9]/g, '').slice(0, 2)
    if(parseInt(p.value) > 60)
        p.value = '60'
}

// Deixa o usuário inserir apenas caracteres numéricos e virugla para casa decimal.
function limitarCasasDecimais(input) {
    input.value = input.value.replace(/[^\d,]/g, '')
    if (input.value.includes(',')) {
        var partes = input.value.split(',');
        if (partes.length > 1 && partes[1].length > 3) {
            input.value = (partes[0] + ',' + partes[1].substring(0, 3));
        }
    }
}

// Limpa os campos de tempo percorrido.
function limpaTempo() {
    document.getElementById('horas').value = ''
    document.getElementById('minutos').value = ''
    document.getElementById('segundos').value = ''
}

// Variavel 'resultado' com escopo global para poder utilizá-la no calcular() e no novoCalculo()
var resultado = document.getElementById('resultado')

// Calculando o PACE:
function calcular() {
    // Declarando as variáveis e atribuindo a elas '00' quando vierem vazias,
    // pois o usuário pode preencher só os minutos, por exemplo,
    // achando que o cálculo será feito somente em cima do campo minutos.
    var horas = document.getElementById('horas').value.trim() || '000'
    var minutos = document.getElementById('minutos').value.trim() || '00'
    var segundos = document.getElementById('segundos').value.trim() || '00'
    var distancia = document.getElementById("distancia").value.replace(',','.')

    // Verifica se o campo distância foi preenchido
    if (distancia === '') {
        alert('Preencha o campo da distância percorrida!')
    } else {
        // Transformando em números reais os valores de cada imput
        horas = parseFloat(horas)
        minutos = parseFloat(minutos)
        segundos = parseFloat(segundos)
        distancia = parseFloat(distancia)

        // Agora que tenho a distancia em número, posso verificar se ela é igual a zero
        if (distancia === 0) {
            alert('Informe um número maior que zero no campo da distância percorrida!')
        } else {
            // Transformar segundos e horas em minutos
            // e somar a quantidade de minutos total
            var totalMinutos = (horas * 60) + minutos + (segundos / 60)

            // Validando se a soma acima é igual a zero,
            // pois do jeito que o programa ficou, ele acaba aceitando zero
            // em todos os campos do tempo
            if (totalMinutos === 0) {
                alert('Insira corretamente o tempo percorrido!')
                limpaTempo()
            } else {
                var paceNaoFormatado = totalMinutos / distancia
                console.log(paceNaoFormatado)

                // Transformar minutos com casa decimal em minutos e segundos
                var minutosInteiros = parseInt(paceNaoFormatado)
                var segundosRestantes = (paceNaoFormatado - minutosInteiros) * 60
                
                // Exibindo o resultado
                // Poderia ainda criar uma variável 'pace' na qual eu concatenaria os
                // minutos inteiros, os segundos restantes e a string '/km'
                resultado.innerHTML = `Seu PACE é de:<br>${minutosInteiros} minutos e ${parseInt(segundosRestantes)} segundos a cada km`
    
                // Ocultando o botão CALCULAR PACE
                // Habilitando o botão NOVO CÁLCULO
                document.getElementById("calcularPace").style.display = "none"
                document.getElementById("novoCalculo").style.display = "block"
            }
        }
    }  
}

// Quando o usuário clicar em NOVO CÁLCULO:
function novoCalculo() {
    // Limpar os campos preenchidos
    // Pode-se ainda colocar os comandos de limpeza dos dados numa function
    // caso queira usar em outra parte do programa mais tarde
    limpaTempo()
    document.getElementById('distancia').value = ''
    resultado.innerHTML = ''
    
    // Habilita novamente o botão CALCULAR PACE
    // Oculta novamente o botão NOVO CÁLCULO
    document.getElementById("novoCalculo").style.display = "none"
    document.getElementById("calcularPace").style.display = "block"
}


// dar sugestoes de distancias pré definidas 5km 10km 21km 42km