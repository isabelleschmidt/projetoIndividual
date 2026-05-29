const express = require('express');
const router  = express.Router();
const quizController = require('../controllers/quizController');
 

router.post('/quemdisse', function (req, res) {
    quizController.postResultadoQuemdisse(req, res);
});
 

router.post('/albuns', function (req, res) {
    quizController.postResultadoQuizAlbuns(req, res);
});
 

router.get('/todos', function (req, res) {
    quizController.getTodosDadosQuiz(req, res);
});
 
router.get('/media-acertos', function (req, res) {
    quizController.getMediaAcertosQuemdisse(req, res);
});
 
router.get('/ranking-albuns', function (req, res) {
    quizController.getRankingAlbuns(req, res);
});
 
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