const Sequelize=require("Sequelize");
const connection= require('./database');

const Respostas=connection.define('respostas',{

    corpo:{
        type:Sequelize.TEXT,
        allowNull:false,
    },
    PerguntaID:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }
});

Respostas.sync({force:false});

module.exports = Respostas;
