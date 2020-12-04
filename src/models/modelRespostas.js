const Sequelize = require('sequelize');
const conexao = require('../database/index');

const Resposta = conexao.define('resposta',{
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    perguntaId: {
        //referencia a pergunta, todo pergunta tem varias respostas.
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});
Resposta.sync({force: false}).then(()=>{}); //obriga a criar tabela se nao existir

module.exports = Resposta;
