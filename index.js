import express from "express";
import { ler, inserir, lerUm, atualizar } from "./src/aluno.js";

const app = express();
const porta = 3000;

// Configurando suporte ao formato JSON
app.use(express.json());

// Configurando suporte a dados de inputs de formulários
app.use(express.urlencoded({extended : true}) );



// ROTAS

// Rota (endpoint) para a raiz da API
app.get('/', (req, res) => {
    res.send(`É um dia lindo para aprender sobre APIs`);
});

// Rota (endpoint) para exibir todos os alunos
app.get('/alunos', (req, res) => {
    // res.send(`Exibe TODOS os alunos`);
    ler(res);
});

// Rota (endpoint) para exibir um único aluno
app.get('/alunos/:id', (req, res) => {
    // res.send(`Exibe dados de UM aluno.`)

    const id = parseInt(req.params.id);
    lerUm(id, res);
});

// Rota (endpoint) para INSERIR alunos
app.post('/alunos', (req, res) => {
    // res.send(`ADICIONA aluno.`)

    // capturando os dados a partir do corpo da requisição
    const novoAluno = req.body;

    // executando a função inserir e passando os parâmetros novoAluno e res.
    inserir(novoAluno, res);
});

// Rota (endpoint) para atualizar TODOS os dados do aluno
app.put('/alunos/:id', (req, res) => {
    res.send(`ATUALIZA TODOS os dados de um aluno.`)
});

// Rota (endpoint) para atualizar ALGUNS/TODOS os dados do aluno
app.patch('/alunos/:id', (req, res) => {
    // res.send(`ATUALIZA ALGUNS/todos os dados de um aluno.`)

    //  capturar id
    const id = parseInt(req.params.id);
    //  dados do aluno
    const aluno = req.body;
    atualizar(id, aluno, res);
});

// Rota (endpoint) para EXCLUIR aluno
app.delete('/alunos/:id', (req, res) => {
    res.send(`EXCLUI aluno.`)
});


// Configurando o servidor
app.listen(porta, () => {
    console.log('Servidor express rodando...');
});

