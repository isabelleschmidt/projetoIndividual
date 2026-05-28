const quizModel = require('../models/quizModel');
 
// ─────────────────────────────────────────────────────────────────────────────
// POST — Salvar resultado do quiz "Taylor Swift ou Shakespeare?"
// Body esperado: { idTentativa, pontuacao, fk_usuario }
// ─────────────────────────────────────────────────────────────────────────────
 function postResultadoQuemdisse(req, res) {

    var pontuacao = req.body.pontuacao;
    var fkUsuario = req.body.fk_usuario;

    if (pontuacao === undefined || !fkUsuario) {

        return res.status(400).json({
            mensagem: 'Campos obrigatórios: pontuacao e fk_usuario.'
        });
    }

    quizModel.salvarResultado(pontuacao, fkUsuario, 1)

        .then(function(resultado) {

            res.status(201).json({
                mensagem: 'Resultado salvo com sucesso!'
            });
        })

        .catch(function(erro) {

            console.log(erro);

            res.status(500).json(erro.sqlMessage);
        });
}
 
// ─────────────────────────────────────────────────────────────────────────────
// POST — Salvar resultado do quiz "Qual álbum da Taylor você seria?"
// Body esperado: { idTentativa, pontuacao, fk_usuario, album }
// ─────────────────────────────────────────────────────────────────────────────
function postResultadoQuizAlbuns(req, res) {

    var pontuacao = req.body.pontuacao;
    var fkUsuario = req.body.fk_usuario;
    var album     = req.body.album;

    if (pontuacao === undefined || !fkUsuario || !album) {

        return res.status(400).json({
            mensagem: 'Campos obrigatórios: pontuacao, fk_usuario e album.'
        });
    }

    quizModel.salvarResultado(pontuacao, fkUsuario, 2, album)

        .then(function(resultado) {

            res.status(201).json({
                mensagem: 'Resultado salvo com sucesso!'
            });
        })

        .catch(function(erro) {

            console.log(erro);

            res.status(500).json(erro.sqlMessage);
        });
}// ─────────────────────────────────────────────────────────────────────────────
// GET — Média de pontuação no quiz "Quem Disse?" (para o dashboard)
// ─────────────────────────────────────────────────────────────────────────────
 
function getMediaAcertosQuemdisse(req, res) {
    quizModel.mediaAcertosQuemdisse()
        .then(function (resultado) {
            res.json(resultado[0] || null);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}
 
// ─────────────────────────────────────────────────────────────────────────────
// GET — Ranking de álbuns mais escolhidos (para o dashboard)
// ─────────────────────────────────────────────────────────────────────────────
 
function getRankingAlbuns(req, res) {
    quizModel.rankingAlbuns()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}
 
// ─────────────────────────────────────────────────────────────────────────────
// GET — Histórico do usuário no quiz "Taylor ou Shakespeare?"
// ─────────────────────────────────────────────────────────────────────────────
 
function getHistoricoQuemdisse(req, res) {
    var fkUsuario = req.params.fk_usuario;
 
    if (!fkUsuario) {
        return res.status(400).json({ mensagem: 'Parâmetro obrigatório: fk_usuario.' });
    }
 
    quizModel.historicoQuemdisseUsuario(fkUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}
 
// ─────────────────────────────────────────────────────────────────────────────
// GET — Histórico do usuário no quiz "Qual álbum você seria?"
// ─────────────────────────────────────────────────────────────────────────────
 
function getHistoricoAlbuns(req, res) {
    var fkUsuario = req.params.fk_usuario;
 
    if (!fkUsuario) {
        return res.status(400).json({ mensagem: 'Parâmetro obrigatório: fk_usuario.' });
    }
 
    quizModel.historicoAlbunsUsuario(fkUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}
 
// ─────────────────────────────────────────────────────────────────────────────
// GET — Todos os dados dos quizzes de uma vez (para o dashboard)
// ─────────────────────────────────────────────────────────────────────────────
 
function getTodosDadosQuiz(req, res) {
    Promise.all([
        quizModel.mediaAcertosQuemdisse(),
        quizModel.rankingAlbuns()
    ])
    .then(function (resultados) {
        res.json({
            mediaAcertosQuemdisse: resultados[0][0] || null,
            rankingAlbuns:         resultados[1]    || []
        });
    })
    .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function getResultadosUsuario(req, res) {

    var fkUsuario = req.params.fk_usuario;

    if (!fkUsuario) {

        return res.status(400).json({
            mensagem: 'fk_usuario é obrigatório'
        });
    }

    quizModel.buscarResultadosUsuario(fkUsuario)

        .then(function(resultado) {

            res.json(resultado);
        })

        .catch(function(erro) {

            console.log(erro);

            res.status(500).json(erro.sqlMessage);
        });
}
 
module.exports = {
    postResultadoQuemdisse,
    postResultadoQuizAlbuns,
    getMediaAcertosQuemdisse,
    getRankingAlbuns,
    getHistoricoQuemdisse,
    getHistoricoAlbuns,
    getTodosDadosQuiz,
    getResultadosUsuario
};