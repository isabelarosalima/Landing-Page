create database literacia;
use literacia;

CREATE TABLE usuario(
idUsuario INT PRIMARY KEY auto_increment,
nome VARCHAR(45),
apelido VARCHAR(45),
senha VARCHAR(45),
email varchar(50)
);

drop database literacia;
CREATE TABLE votacao(
idVotacao int primary key auto_increment,
fkUsuario int,
qntOpcao1 int,
qntOpcao2 int,
qntOpcao3 int,
constraint usuarioVotacao foreign key (fkUsuario) references usuario(idUsuario)
);

