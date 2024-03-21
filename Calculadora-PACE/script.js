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

// Variáveis com escopo global para poder utilizá-la no calcular() e no novoCalculo()
let tempoPercorrido = document.getElementById('tempoPercorrido')
let distanciaPercorrida = document.getElementById('distanciaPercorrida')
var resultado = document.getElementById('resultado')

let alertaVisivel = false

// Função para exibir o alerta
function exibirAlerta(mensagem) {
    document.getElementById('alertaMensagem').innerText = mensagem
    document.getElementById("alerta").style.display = "block"
    alertaVisivel = true
}

// Função para ocultar o alerta
function ocultarAlerta() {
    document.getElementById("alerta").style.display = "none"
    alertaVisivel = false
}

// Função para verificar e exibir o alerta
function verificarEExibirAlerta(mensagem) {
    if (!alertaVisivel) {
        exibirAlerta(mensagem);
    }
}

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
        verificarEExibirAlerta('Preencha o campo da distância percorrida!')
        return // Termina a função aqui para evitar que o restante do código seja executado
        
    } else {
        // Transformando em números reais os valores de cada imput que vem como texto
        horas = parseFloat(horas)
        minutos = parseFloat(minutos)
        segundos = parseFloat(segundos)
        distancia = parseFloat(distancia)

        // Se cair aqui neste else, esconde o alerta.
        ocultarAlerta()

        // Agora que tenho a distancia em número, posso verificar se ela é igual a zero
        if (distancia === 0) {
            verificarEExibirAlerta('Informe um número maior que zero no campo da distância percorrida!')
            return // Termina a função aqui para evitar que o restante do código seja executado
            
        } else {
            // Transformar segundos e horas em minutos
            // e somar a quantidade de minutos total
            var totalMinutos = (horas * 60) + minutos + (segundos / 60)

            // Validando se a soma acima é igual a zero,
            // pois do jeito que o programa ficou, ele acaba aceitando zero
            // em todos os campos do tempo
            if (totalMinutos === 0) {
                limpaTempo()
                verificarEExibirAlerta('Insira corretamente o tempo percorrido!')
                return // Termina a função aqui para evitar que o restante do código seja executado
                
            } else {
                var paceNaoFormatado = totalMinutos / distancia
                console.log(paceNaoFormatado)

                // Transformar minutos com casa decimal em minutos e segundos
                var minutosInteiros = parseInt(paceNaoFormatado)
                var segundosRestantes = (paceNaoFormatado - minutosInteiros) * 60
                
                // Exibindo o resultado
                // Poderia ainda criar uma variável 'pace' na qual eu concatenaria os
                // minutos inteiros, os segundos restantes e a string '/km'
                tempoPercorrido.innerHTML = `Seu tempo: ${horas}h ${minutos}min ${segundos}s`
                distanciaPercorrida.innerHTML = `Sua distância: ${distancia}km <br>`
                resultado.innerHTML = `Seu PACE é de:<br>${minutosInteiros} minutos e ${parseInt(segundosRestantes)} segundos a cada km`
    
                // Ocultando o botão CALCULAR PACE
                // Habilitando o botão NOVO CÁLCULO
                document.getElementById('instrucao').style.display = 'none'
                document.getElementById('entradas').style.display = 'none'
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
    ocultarAlerta()
    limpaTempo()
    document.getElementById('distancia').value = '' 
    // Habilita novamente o botão CALCULAR PACE
    // Oculta novamente o botão NOVO CÁLCULO
    resultado.innerHTML = ''
    tempoPercorrido.innerHTML = ''
    distanciaPercorrida.innerHTML = ''
    document.getElementById('instrucao').style.display = 'block'
    document.getElementById('entradas').style.display = 'block'
    document.getElementById("novoCalculo").style.display = "none"
    document.getElementById("calcularPace").style.display = "block"
}