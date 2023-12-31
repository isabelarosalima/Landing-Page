var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    // if (resultadoAutenticar.length == 1) {
                    //     console.log(resultadoAutenticar);

                    //     aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                    //         .then((resultadoAquarios) => {
                    //             if (resultadoAquarios.length > 0) {
                                    res.json({
                                        idUsuario: resultadoAutenticar[0].idUsuario,
                                        email: resultadoAutenticar[0].email,
                                        // senha: resultadoAutenticar[0].senha,
                                    });
                    //             } else {
                    //                 res.status(204).json({ aquarios: [] });
                    //             }
                    //         })
                    // } else if (resultadoAutenticar.length == 0) {
                    //     res.status(403).send("Email e/ou senha inválido(s)");
                    // } else {
                    //     res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    // }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var apelido = req.body.apelidoServer;
    var senha = req.body.senhaServer;
    var email = req.body.emailServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (apelido == undefined) {
        res.status(400).send("Seu apelido está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, apelido)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function dashboard(req, res) {
   
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.dashboard()
            .then(
                function (resultado) {
                    res.json({
                        livro1: resultado[0].Mulherzinhas,
                        livro2: resultado[0].JogosVorazes,
                        livro3: resultado[0].OsMiseraveis

                    });
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    // }
}


function enqueteResultado(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var usuario = req.body.usuarioServer;
    var qnt1 = req.body.qnt1Server;
    var qnt2 = req.body.qnt2Server;
    var qnt3 = req.body.qnt3Server;

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.enqueteResultado(qnt1, qnt2, qnt3, usuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}




module.exports = {
    autenticar,
    cadastrar,
    dashboard,
    enqueteResultado
}