import { json } from 'express';
import conexao from './banco.js'
// criando o CRUD

// Função que lê a tabela de alunos do BD
function ler(res) {

const sql = "SELECT * FROM alunos ORDER BY nome";


// conectando ao BD
conexao.query(sql, (erro, resultados) => {
    if(resultados.length === 0) {
        res.status(204).end(); // 204 = Sem conteúdo. O método .end() para qualquer comunicação.
        return;
    }

    if(erro) {
        res.status(400).json(erro.code);     // 400 BAD REquest - requisição inválida.
    } else {
        res.status(200).json(resultados); // deu certo, exibir os resultados
    }
})
}


// Inserindo alunos

function inserir(aluno, res) {

    const sql = "INSERT INTO alunos SET ?"; // o trecho "SET ?" estão vindo do MYSQL2 e a ? recebe os dados e atribui na ordem. Proteção contra Injection e Tratamento de Strings vindos do módulo MYSQL2

    conexao.query(sql, aluno, (erro) => {
        if(erro){
            res.status(400).json(erro.code);    // 400 - requisição inválida e informa o código do erro.
        } else {
            res.status(201).json({ "status": "Aluno inserido!"});   // 201 - criado e apresenta a mensagem Aluno inserido!.
            // res.status(201).end();
        }
    })
}


// Função que exibe UM aluno
function lerUm(id, res) {
    const sql = "SELECT * FROM alunos WHERE id = ?";

    conexao.query(sql, id, (erro, resultados) => {

        // checando se existe conteúdo
        if(resultados.length === 0){
            res.status(204).end();
            return;
        }

        // if erro ou resultado
        if(erro){
            res.status(400).json(erro.code);
        } else {
            res.status(200).json(resultados);
        }
    });
}



// ATUALIZAR aluno
// Essa função vai receber um id, os dados aluno e res.
function atualizar(id, aluno, res) {
    const sql = "UPDATE alunos SET ? WHERE id = ?";

    // para passar mais de um parâmetro usamos o array. Dentro dele a ordem importa, pois precisa corresponder ao SQL acima.
    conexao.query(sql, [aluno, id], (erro, resultados) => {
        if(erro) {
            res.status(400).json(erro.code);
        } else {
            // res.status(200).json({"status" : "Atualizado com sucesso!"});

            // spread operator (operador de "espalhamento" de objeto)
            res.status(200).json( {...aluno, id } );
        }
    });
}

export { ler, inserir, lerUm, atualizar };
