const Sequelize = require('sequelize');

const conexao = new Sequelize(process.env.DATABASE_URL);
//conectando ao banco
conexao
    .authenticate()
    .then(()=>{
        console.log('Conexão feita com sucesso!');
    })
    .catch((erro)=>{
        console.log(erro);
    })
module.exports = conexao;