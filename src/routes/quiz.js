const express = require('express');
const router  = express.Router();
const quizController = require('../controllers/quizController');
 
// ─────────────────────────────────────────────────────────────────────────────
// POST — Salvar resultado de cada quiz
// ─────────────────────────────────────────────────────────────────────────────
 
// Quiz "Taylor Swift ou Shakespeare?"
// Body: { idTentativa, pontuacao, fk_usuario }
router.post('/quemdisse', function (req, res) {
    quizController.postResultadoQuemdisse(req, res);
});
 
// Quiz "Qual álbum da Taylor você seria?"
// Body: { idTentativa, pontuacao, fk_usuario, album }
router.post('/albuns', function (req, res) {
    quizController.postResultadoQuizAlbuns(req, res);
});
 
// ─────────────────────────────────────────────────────────────────────────────
// GET — Dados para o dashboard
// ─────────────────────────────────────────────────────────────────────────────
 
// Todos os dados de uma vez (recomendado para o dashboard)
router.get('/todos', function (req, res) {
    quizController.getTodosDadosQuiz(req, res);
});
 
// Média de acertos do quiz "Quem Disse?" separado
router.get('/media-acertos', function (req, res) {
    quizController.getMediaAcertosQuemdisse(req, res);
});
 
// Ranking de álbuns mais escolhidos separado
router.get('/ranking-albuns', function (req, res) {
    quizController.getRankingAlbuns(req, res);
});
 
// ─────────────────────────────────────────────────────────────────────────────
// GET — Histórico de um usuário por quiz
// ─────────────────────────────────────────────────────────────────────────────
 
router.get('/historico/quemdisse/:fk_usuario', function (req, res) {
    quizController.getHistoricoQuemdisse(req, res);
});
 
router.get('/historico/albuns/:fk_usuario', function (req, res) {
    quizController.getHistoricoAlbuns(req, res);
});

router.get('/resultado/:fk_usuario', function(req, res) {
    quizController.getResultadosUsuario(req, res);
});
 
module.exports = router;