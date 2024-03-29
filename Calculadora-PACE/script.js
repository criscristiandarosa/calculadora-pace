// Validando a entrada dos dados:

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
        let partes = input.value.split(',');
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

// Limpa o campo de distância
function limpaDistancia() {
    document.getElementById('distancia').value = ''
}

// Limpa os campos que mostram o resultado final
function limpaResultado() {
    resultado.innerHTML = ''
    // tempoPercorrido.innerHTML = ''
    // distanciaPercorrida.innerHTML = ''
}

// Variáveis com escopo global para poder utilizá-la no calcular() e no novoCalculo()
let tempoPercorrido = document.getElementById('resumoTempo')
let distanciaPercorrida = document.getElementById('resumoDistancia')
let resultado = document.getElementById('pace')

let alertaVisivel = false

// Função para exibir o alerta
function exibirAlerta(mensagem) {
    document.getElementById('alertaMensagem').innerHTML = mensagem
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

// O site já inicializa com a estilização de onde vai aparecer o resultado removida
//document.getElementById('resultado').classList.remove('esconder')

// ------------------------------------------------------------------------

// Calculando o PACE:
function calcular() {
    // Declarando as variáveis e atribuindo a elas '00' quando vierem vazias,
    // pois o usuário pode preencher só os minutos, por exemplo,
    // achando que o cálculo será feito somente em cima do campo minutos.
    let horas = document.getElementById('horas').value.trim() || '000'
    let minutos = document.getElementById('minutos').value.trim() || '00'
    let segundos = document.getElementById('segundos').value.trim() || '00'
    let distancia = document.getElementById("distancia").value.replace(',','.')

    // Verifica se o campo distância foi preenchido
    if (distancia === '') {
        verificarEExibirAlerta('Preencha o campo da distância percorrida!')
        // Termina a função aqui para evitar que o restante do código seja executado
        
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
            let totalMinutos = (horas * 60) + minutos + (segundos / 60)

            // Validando se a soma acima é igual a zero,
            // pois do jeito que o programa ficou, ele acaba aceitando zero
            // em todos os campos do tempo
            if (totalMinutos === 0) {
                limpaTempo()
                verificarEExibirAlerta('Insira corretamente o tempo percorrido!')
                return // Termina a função aqui para evitar que o restante do código seja executado
                
            } else {
                let paceNaoFormatado = totalMinutos / distancia
                
                // Transformar minutos com casa decimal em minutos e segundos
                let minutosInteiros = parseInt(paceNaoFormatado)
                let segundosRestantes = (paceNaoFormatado - minutosInteiros) * 60
                
                // Quando estiver pronto para mostrar o resultado, retiro a classe que deixou ocultado o elemento resultado
                document.getElementById('resultado').classList.remove('d-none')

                // Exibindo o resultado
                // Poderia ainda criar uma variável 'pace' na qual eu concatenaria os
                // minutos inteiros, os segundos restantes e a string '/km'
                resumoTempo.innerHTML = `Seu tempo: ${horas}h ${minutos}min ${segundos}s`
                resumoDistancia.innerHTML = `Sua distância: ${distancia}km <br>`
                pace.innerHTML = `${minutosInteiros}min e ${parseInt(segundosRestantes)}s a cada km`
                
                // Ocultando os seguintes campos dinamicamente
                document.getElementById('entradas').classList.add('d-none')

                // Ocultando o botão CALCULAR PACE
                // Habilitando o botão NOVO CÁLCULO
                document.getElementById("calcularPace").classList.add('d-none')
                document.getElementById("novoCalculo").classList.add('d-block')
            }
        }
    }  
}

// Quando o usuário clicar em NOVO CÁLCULO:
function novoCalculo() {
    // Limpar os campos preenchidos e esconder o a parte estilizada do resultado
    document.getElementById('resultado').classList.add('d-none')
    // Preciso ocultar o alerta, caso o usuário cair numa validação antes de conseguir finalizar o cálculo e não ter apertado no x para ocultar o alerta
    ocultarAlerta()
    limpaTempo()
    limpaDistancia()  
    limpaResultado()
    // Habilita novamente o botão CALCULAR PACE
    // Oculta novamente o botão NOVO CÁLCULO
    document.getElementById('entradas').classList.remove('d-none')
    document.getElementById("novoCalculo").classList.remove('d-block')
    document.getElementById("calcularPace").classList.remove('d-none')
}