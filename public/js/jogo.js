let numeroDaQuestaoAtual = 0
let pontuacaoFinal = 0
let certas = 0
let erradas = 0
const quantidadeDeQuestoes = listaDeQuestoes.length
 
function onloadEsconder() {
}
 
function iniciarQuiz() {
    document.getElementById('telaInicial').style.display = 'none'
    document.getElementById('telaJogo').style.display    = 'flex'
    document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes
    preencherQuestao(0)
    resetarBotoes()
}
 
function preencherQuestao(i) {
    const questao = listaDeQuestoes[i]
    numeroDaQuestaoAtual = i
    document.getElementById('spanNumeroDaQuestaoAtual').innerHTML = i + 1
    document.getElementById('spanQuestaoExibida').innerHTML = questao.pergunta
    document.getElementById('labelOpcaoUm').innerHTML = questao.alternativaA
    document.getElementById('labelOpcaoDois').innerHTML = questao.alternativaB
    habilitarAlternativas(true)
    desmarcarAlternativas()
    limparCoresAlternativas()
}
 
function habilitarAlternativas(habilitar) {
    const options = document.getElementsByName('option')
    options.forEach(op => op.disabled = !habilitar)
}
 
function desmarcarAlternativas() {
    const options = document.getElementsByName('option')
    options.forEach(op => op.checked = false)
}
 
function limparCoresAlternativas() {
    const options = document.getElementsByName('option')
    options.forEach(op => {
        const label = op.labels[0]
        label.classList.remove('text-success-with-bg', 'text-danger-with-bg')
    })
}
 
function resetarBotoes() {
    document.getElementById('btnSubmeter').disabled = false
    document.getElementById('btnProx').disabled = true
    document.getElementById('btnTentarNovamente').style.display = 'none'
    document.getElementById('fzrOutroQuiz').style.display = 'none'
}
 
function submeter() {
    const options = document.getElementsByName('option')
    const algumaMarcada = [...options].some(op => op.checked)
    if (!algumaMarcada) {
        alert('Escolha uma opção antes de confirmar!')
        return
    }
    document.getElementById('btnSubmeter').disabled = true
    document.getElementById('btnProx').disabled     = false
    habilitarAlternativas(false)
    checarResposta()
}
 
function checarResposta() {
    const questao = listaDeQuestoes[numeroDaQuestaoAtual]
    const respostaCorreta = questao.alternativaCorreta
    const options = document.getElementsByName('option')
 
    let labelIdCorreta = null
    options.forEach(op => {
        if (op.value === respostaCorreta) {
            labelIdCorreta = op.labels[0].id
        }
    })
 
    options.forEach(op => {
        if (!op.checked) return
        if (op.value === respostaCorreta) {
            document.getElementById(labelIdCorreta).classList.add('text-success-with-bg')
            certas++
            pontuacaoFinal++
            document.getElementById('spanCertas').innerHTML = certas
        } else {
            document.getElementById(op.labels[0].id).classList.add('text-danger-with-bg')
            document.getElementById(labelIdCorreta).classList.add('text-success-with-bg')
            erradas++
            document.getElementById('spanErradas').innerHTML = erradas
        }
    })
 
    numeroDaQuestaoAtual++
}
 
function avancar() {
    if (numeroDaQuestaoAtual < quantidadeDeQuestoes) {
        preencherQuestao(numeroDaQuestaoAtual)
        resetarBotoes()
    } else {
        finalizarJogo()
    }
}
 
function finalizarJogo() {
    document.getElementById('btnTentarNovamente').style.display = 'block'
    document.getElementById('fzrOutroQuiz').style.display = 'block'
    document.getElementById('telaJogo').style.display  = 'none'
    document.getElementById('telaFinal').style.display = 'flex'
 
    const porcentagem = pontuacaoFinal / quantidadeDeQuestoes
 
    let mensagem  = ''
    let classeMsg = ''
 
    if (porcentagem <= 0.5) {
        mensagem  = 'Não fique triste! É mais difícil do que parece'
        classeMsg = 'text-danger-with-bg'
    } else if (porcentagem < 0.6) {
        mensagem  = 'Muito confuso ou muito bom de chute...mas passa de ano!! Parabéns'
        classeMsg = 'text-warning-with-bg'
    } else if (porcentagem < 1) {
        mensagem  = 'Parabéns!! Você tem bons conhecimentos de música e literatura.'
        classeMsg = 'text-success-with-bg'
    } else {
        mensagem  = 'SWIFTIE NÍVEL HARD! Tay e William se orgulham de você!'
        classeMsg = 'text-success-with-bg'
    }
 
    const acertosTexto = `Você acertou ${pontuacaoFinal} de ${quantidadeDeQuestoes} questões (${Math.round(porcentagem * 100)}%).`
 
    document.getElementById('spanPontuacaoFinal').innerHTML = acertosTexto
    document.getElementById('msgFinal').innerHTML = mensagem
    document.getElementById('msgFinal').classList.add(classeMsg)
 
    
    var idUsuario = sessionStorage.getItem('ID_USUARIO');
 
    if (!idUsuario) {
        console.warn('Usuário não está logado — resultado não será salvo.');
        return;
    }
 
    fetch('/quiz/quemdisse', {
    method: 'POST',

    headers: {
        'Content-Type': 'application/json'
    },

    body: JSON.stringify({
        pontuacao:  pontuacaoFinal,
        fk_usuario: idUsuario
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