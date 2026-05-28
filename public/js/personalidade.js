let numeroDaQuestaoAtual = 0
 
const quantidadeDeQuestoes = listaDeQuestoes.length
 
let pontuacoes = {
    debut: 0,
    fearless: 0,
    speakNow: 0,
    red: 0,
    reputation: 0,
    lover: 0,
    folklore: 0,
    evermore: 0,
    midnights: 0,
    ttpd: 0,
    "1989": 0
}
 
function iniciarQuiz() {
    document.getElementById('telaInicial').style.display = 'none'
    document.getElementById('telaJogo').style.display    = 'flex'
    document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes
    preencherQuestao(0)
}
 
function preencherQuestao(i) {
    const questao = listaDeQuestoes[i]
    numeroDaQuestaoAtual = i
    document.getElementById('spanNumeroDaQuestaoAtual').innerHTML = i + 1
    document.getElementById('spanQuestaoExibida').innerHTML = questao.pergunta
    document.getElementById('labelOpcaoUm').innerHTML   = questao.alternativaA
    document.getElementById('labelOpcaoDois').innerHTML = questao.alternativaB
    document.getElementById('labelOpcaoTres').innerHTML  = questao.alternativaC
    document.getElementById('labelOpcaoQuatro').innerHTML = questao.alternativaD
    desmarcarAlternativas()
}
 
function desmarcarAlternativas() {
    const options = document.getElementsByName('option')
    options.forEach(op => op.checked = false)
}
 
function submeter() {
    const options = document.getElementsByName('option')
    let respostaSelecionada = null
    options.forEach(op => {
        if (op.checked) respostaSelecionada = op.value
    })
    if (respostaSelecionada == null) {
        alert('Escolha uma alternativa!')
        return
    }
 
    const questao = listaDeQuestoes[numeroDaQuestaoAtual]
    const albums  = questao.pontuacao[respostaSelecionada]
    for (let i = 0; i < albums.length; i++) {
        pontuacoes[albums[i]]++
    }
 
    numeroDaQuestaoAtual++
    if (numeroDaQuestaoAtual < quantidadeDeQuestoes) {
        preencherQuestao(numeroDaQuestaoAtual)
    } else {
        finalizarQuiz()
    }
}
 
function finalizarQuiz() {
    document.getElementById('telaJogo').style.display  = 'none'
    document.getElementById('telaFinal').style.display = 'flex'
 
    // --- calculo álbum vencedor ---
    let maiorPontuacao = 0
    let albumFinal = ""
    for (let album in pontuacoes) {
        if (pontuacoes[album] > maiorPontuacao) {
            maiorPontuacao = pontuacoes[album]
            albumFinal = album
        }
    }
 
    // --- pontuação total acumulada ---
    let pontuacaoTotal = 0
    for (let album in pontuacoes) {
        pontuacaoTotal += pontuacoes[album]
    }
 
    let mensagem = ""
    if (albumFinal == "1989") {
        mensagem = "Você é uma pessoa livre, divertida e ama aventuras inesquecíveis."
    } else if (albumFinal == "folklore") {
        mensagem = "Você é uma pessoa introspectiva, criativa e transforma sentimentos em arte <br>(e tem muito bom gosto!!)"
    } else if (albumFinal == "reputation") {
        mensagem = "Você é uma pessoa que parece misteriosa por fora, mas sente tudo intensamente."
    } else if (albumFinal == "lover") {
        mensagem = "Você acredita no amor e enxerga beleza nas pequenas coisas."
    } else if (albumFinal == "midnights") {
        mensagem = "Você vive no próprio universo e pensa demais de madrugada."
    } else if (albumFinal == "red") {
        mensagem = "Você sente tudo intensamente e ama com todo o coração."
    } else if (albumFinal == "evermore") {
        mensagem = "Você encontra beleza até na melancolia."
    } else if (albumFinal == "fearless") {
        mensagem = "Você é uma pessoa sonhadora e acredita em finais felizes."
    } else if (albumFinal == "ttpd") {
        mensagem = "Você é uma pessoa que transforma emoções complexas em poesia."
    } else if (albumFinal == "speakNow") {
        mensagem = "Você é dramática, criativa e nunca deixa sentimentos guardados."
    } else if (albumFinal == "debut") {
        mensagem = "Você tem um coração genuíno e valoriza simplicidade."
    }
 
    document.getElementById('spanPontuacaoFinal').innerHTML = `Seu álbum é: <strong>${albumFinal}</strong>`
    document.getElementById('msgFinal').innerHTML = mensagem
 

    var idUsuario = sessionStorage.getItem('ID_USUARIO');
 
    if (!idUsuario) {
        console.warn('Usuário não está logado — resultado não será salvo.');
        return;
    }
 
   fetch('/quiz/albuns', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },

    body: JSON.stringify({
        pontuacao:  pontuacaoTotal,
        fk_usuario: idUsuario,
        album:      albumFinal
    })
})

.then(function(res) {
    return res.json()
})

.then(function(data) {
    console.log('Resultado salvo:', data.mensagem)
})

.catch(function(erro) {
    console.error('Erro ao salvar resultado:', erro)
})
 

}
function tentarNovamente() {
    window.location.reload()
}
function fazerOutroQuiz() {
    window.location.href = "./testes.html"
}