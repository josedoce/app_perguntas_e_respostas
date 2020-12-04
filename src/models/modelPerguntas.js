const Sequelize = require('sequelize');
const conexao = require('../database/index');

const Pergunta = conexao.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
});
Pergunta.sync({force: false}).then(()=>{}); //obriga a criar tabela se nao existir

module.exports = Pergunta;


