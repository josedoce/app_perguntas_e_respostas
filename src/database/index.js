const Sequelize = require('sequelize');

const conexao = new Sequelize('guia_perguntas_projeto','root','gatomolhado',{
    host: 'localhost',
    dialect: 'mysql'
});
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