var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/salvar", function (req, res) {
    quizController.salvar(req, res);
});

router.get("/resultado/:fk_usuario", function (req, res) {
    quizController.buscarResultado(req, res);
});

module.exports = router;