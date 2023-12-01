create database literacia;
use literacia;

CREATE TABLE usuario(
idUsuario INT PRIMARY KEY auto_increment,
nome VARCHAR(45),
apelido VARCHAR(45),
senha VARCHAR(45),
email varchar(50)
);

CREATE TABLE votacao(
idVotacao int primary key auto_increment,
fkUsuario int,
qntOpcao1 int,
qntOpcao2 int,
qntOpcao3 int,
constraint usuarioVotacao foreign key (fkUsuario) references usuario(idUsuario)
);

CREATE TABLE resenhas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fkidUsuario_resenha INT,
    nome VARCHAR(255) NOT NULL,
    documento BLOB NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_nome (nome),
    constraint usuarioResenha foreign key resenhas(fkidUsuario_resenha) references usuario(idUsuario)
);

-- selects separados
	select sum(qntOpcao1) as Mulherzinhas, sum(qntOpcao2) as JogosVorazes, sum(qntOpcao3) as OsMiseraveis from votacao;
	select * from usuario;
	select * from votacao;

--  Selecionar todas as votações com informações do usuário correspondente:
	SELECT votacao.idVotacao, votacao.qntOpcao1, votacao.qntOpcao2, votacao.qntOpcao3, usuario.nome as nome_usuario
	FROM votacao
	JOIN usuario 
		ON votacao.fkUsuario = usuario.idUsuario;

-- Contar o número total de votos de cada usuário:
	SELECT usuario.nome, 
       SUM(votacao.qntOpcao1 + votacao.qntOpcao2 + votacao.qntOpcao3) as total_votos
	FROM usuario
	JOIN votacao
		ON usuario.idUsuario = votacao.fkUsuario
	GROUP BY usuario.nome;

-- Selecionar a média de votos para cada opção agrupada por usuário
	SELECT usuario.nome as nome_usuario,
       AVG(votacao.qntOpcao1) as media_opcao1,
       AVG(votacao.qntOpcao2) as media_opcao2,
       AVG(votacao.qntOpcao3) as media_opcao3
	FROM usuario
	JOIN votacao
		ON usuario.idUsuario = votacao.fkUsuario
	GROUP BY usuario.nome;



