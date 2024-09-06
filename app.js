let listaDeNumerosSorteados = [];
let listaDeNumerosEliminados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    if (campo) {
        campo.innerHTML = texto;
        responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('.texto__paragrafo', 'Escolha um número entre 1 e 10');
    atualizarEliminados(); // Atualiza a lista de eliminados na mensagem inicial
}

exibirMensagemInicial();

function verificarChute() {
    let chute = parseInt(document.querySelector('.container__input').value);

    if (isNaN(chute)) {
        exibirTextoNaTela('.texto__paragrafo', 'Por favor, insira um número válido.');
        return;
    }
    
    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('.texto__paragrafo', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        
        // Adiciona o número secreto à lista de eliminados somente quando o jogador acerta
        listaDeNumerosEliminados.push(numeroSecreto);
        atualizarEliminados(); // Atualiza a caixa de eliminados

    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('.texto__paragrafo', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('.texto__paragrafo', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    document.querySelector('.container__input').value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function atualizarEliminados() {
    let campoEliminados = document.getElementById('eliminados');
    if (campoEliminados) {
        if (listaDeNumerosEliminados.length > 0) {
            campoEliminados.innerHTML = `Números eliminados: ${listaDeNumerosEliminados.join(', ')}`;
        } else {
            campoEliminados.innerHTML = 'Nenhum número eliminado ainda.';
        }

        // Verifica se todos os números foram eliminados e reinicia a lista
        if (listaDeNumerosEliminados.length === numeroLimite) {
            listaDeNumerosEliminados = [];
            campoEliminados.innerHTML = 'Todos os números foram eliminados! A lista foi reiniciada.';
        }
    } else {
        console.error("Elemento com ID 'eliminados' não encontrado.");
    }
}