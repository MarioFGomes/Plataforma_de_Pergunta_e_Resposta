const Sequelize=require("Sequelize")
const connection=new Sequelize('guiaperguntas','root','root123',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports=connection;