var quizModel = require("../models/quizModel");

function salvar(req, res) {

    var { fk_usuario, idquiz, pontuacao, album } = req.body;

    console.log("Salvando resultado do quiz...");

    quizModel.salvar(fk_usuario, idquiz, pontuacao, album).then(function (resultado) {
        if (resultado.affectedRows > 0) {
            res.status(201).json({ mensagem: "Resultado salvo com sucesso." });
        } else {
            res.status(204).send("Nenhum resultado salvo.");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao salvar o resultado.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarResultado(req, res) {

    var fk_usuario = req.params.fk_usuario;

    console.log("Buscando resultados do usuário " + fk_usuario);

    quizModel.buscarResultado(fk_usuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado.");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os resultados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    salvar,
    buscarResultado
}