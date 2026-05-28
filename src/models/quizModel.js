var database = require("../database/config");

// ================================
// SALVAR RESULTADO DOS QUIZZES
// ================================

function salvarResultado(pontuacao, fkUsuario, idQuiz, album = null) {

    console.log("ACESSEI O QUIZ MODEL");

    var instrucaoSql = `
        INSERT INTO tentativa
        (pontuacao, fk_usuario, idQuiz, album)
        VALUES
        (${pontuacao},
         ${fkUsuario},
         ${idQuiz},
         ${album ? `'${album}'` : 'NULL'});
    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

// ================================
// MÉDIA QUIZ QUEM DISSE
// ================================

function mediaAcertosQuemdisse() {

    var instrucaoSql = `
        SELECT
            COUNT(*) AS total_jogadas,
            SUM(pontuacao) AS total_acertos,
            ROUND(AVG(pontuacao), 1) AS media_acertos
        FROM tentativa
        WHERE idQuiz = 1;
    `;

    return database.executar(instrucaoSql);
}

// ================================
// RANKING ÁLBUNS
// ================================

function rankingAlbuns() {

    var instrucaoSql = `
        SELECT
            album,
            COUNT(*) AS total_escolhas,
            ROUND(
                COUNT(*) * 100.0 /
                (SELECT COUNT(*) FROM tentativa WHERE idQuiz = 2),
            1) AS percentual

        FROM tentativa

        WHERE idQuiz = 2

        GROUP BY album

        ORDER BY total_escolhas DESC;
    `;

    return database.executar(instrucaoSql);
}

// ================================
// HISTÓRICO QUEM DISSE
// ================================

function historicoQuemdisseUsuario(fkUsuario) {

    var instrucaoSql = `
        SELECT
            idTentativa,
            pontuacao

        FROM tentativa

        WHERE fk_usuario = ${fkUsuario}
        AND idQuiz = 1;
    `;

    return database.executar(instrucaoSql);
}

// ================================
// HISTÓRICO ÁLBUNS
// ================================

function historicoAlbunsUsuario(fkUsuario) {

    var instrucaoSql = `
        SELECT
            idTentativa,
            album

        FROM tentativa

        WHERE fk_usuario = ${fkUsuario}
        AND idQuiz = 2;
    `;

    return database.executar(instrucaoSql);
}

function buscarResultadosUsuario(fkUsuario) {

    var instrucaoSql = `
        SELECT
            idQuiz AS idquiz,
            pontuacao,
            album

        FROM tentativa

        WHERE fk_usuario = ${fkUsuario}

        ORDER BY idTentativa DESC;
    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {

    salvarResultado,

    mediaAcertosQuemdisse,

    rankingAlbuns,

    historicoQuemdisseUsuario,

    historicoAlbunsUsuario,

    buscarResultadosUsuario
}