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

export { ler };
