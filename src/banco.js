import mysql from 'mysql2';

// configurando a conexão
const conexao = mysql.createConnection({
    /* LOCAL */
    // host: 'localhost',
    // user: 'root',
    // password: '',
    // database: 'escola'

    /* REMOTO */
    host: 'srv28.prodns.com.br',
    user: 'webmaio1_alu22',
    password: 'senac*123',
    database: 'webmaio1_esc22'
});


// conectando ao bando de dados
// conexao.connect();

conexao.connect ( erro => {
    if(erro) {
        console.error(`Erro ao conectar: ${erro.message}`);
    } else {
        console.log(`Banco conectado em: ${conexao.config.host}`);
    }
});

export default conexao;

