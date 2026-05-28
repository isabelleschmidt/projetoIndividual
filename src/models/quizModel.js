var database = require("../database/config");

function salvar(fk_usuario, idquiz, pontuacao, album) {

    var instrucaoSql = `
        INSERT INTO tentativa (id_tentativa, pontuacao, fk_usuario, idquiz, album)
        VALUES (UUID(), ${pontuacao}, ${fk_usuario}, ${idquiz}, ${album ? `'${album}'` : null})`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarResultado(fk_usuario) {

    var instrucaoSql = `
        SELECT t.pontuacao, t.album, t.idquiz, q.titulo
        FROM tentativa t
        JOIN quiz q ON t.idquiz = q.idquiz
        WHERE t.fk_usuario = ${fk_usuario}
        ORDER BY t.idquiz`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvar,
    buscarResultado
}