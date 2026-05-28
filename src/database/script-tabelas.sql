CREATE DATABASE mirrorballinsights;
USE mirrorballinsights;
drop database mirrorballinsights;
CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45)NOT NULL,
email VARCHAR(45)NOT NULL UNIQUE,
senha VARCHAR(45)NOT NULL
);
select * from usuario;
CREATE TABLE quiz (
idQuiz INT PRIMARY KEY,
titulo VARCHAR(45)
);
CREATE TABLE questao (
idQuestao INT NOT NULL,
fk_quiz INT NOT NULL,
resposta VARCHAR(45) NOT NULL,
PRIMARY KEY (idQuestao, fk_quiz),
FOREIGN KEY (fk_quiz) REFERENCES quiz(idQuiz)
);
CREATE TABLE tentativa (
    idTentativa INT PRIMARY KEY AUTO_INCREMENT,
    pontuacao INT NOT NULL,
    fk_usuario INT NOT NULL,
    idQuiz INT NOT NULL,
    album VARCHAR(45),

    FOREIGN KEY (fk_usuario)
        REFERENCES usuario(idUsuario),

    FOREIGN KEY (idQuiz)
        REFERENCES quiz(idQuiz)
);
INSERT INTO quiz (idQuiz, titulo) VALUES
    (1, 'Taylor Swift ou Shakespeare?'),
    (2, 'Qual álbum da Taylor você seria?');

alter table tentativa modify column idTentativa VARCHAR(140); 
DROP TABLE tentativa;
select * from tentativa;	
select * from questao;
select * from usuario;