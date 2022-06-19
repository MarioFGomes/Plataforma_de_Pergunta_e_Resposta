const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection= require('./database/database');
const PerguntaModel=require('./database/Perguntas');
const Resposta=require('./database/Resposta');

//Data Base

connection
.authenticate()
.then(()=>{
    console.log("Conexão ao Banco de dados realizada com sucesso")
})
.catch((msgErro)=>{
    console.log(msgErro);
});

app.set('view engine','ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended:false}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
 
    PerguntaModel.findAll({raw:true ,order:[['id','DESC']]}).then((pergunta) => {
        res.render('index',{
            perguntas:pergunta
        });
    })
  
});

app.get('/perguntar', (req, res) => {
 
    res.render('page/Perguntar');
 });

 app.post('/salvarpergunta', (req, res) => {

    let titulo = req.body.titulo;
    let pergunta=req.body.pergunta;

    PerguntaModel.create({
        titulo: titulo,
        descricao: pergunta
    }).then(() => {
        res.redirect("/");
    });
 });

 app.get('/pergunta/:id', (req, res) => {
 
        let id=req.params.id;
        PerguntaModel.findOne({where: {id: id}}).then(pergunta => {
            if(pergunta!=undefined){
                Resposta.findAll({
                    where: {PerguntaID: pergunta.id},
                    order:[['id','DESC']]
                }).then(respostas=>{
                    res.render('page/pergunta',{pergunta,respostas});
                });
                
            }else{
                //não encontrada
                res.redirect("/");
            }
        })
 });


 app.post('/responder', (req, res) => {

    let corpo = req.body.corpo;
    let perguntaid=req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        PerguntaID: perguntaid
    }).then(() => {
        res.redirect("/pergunta/"+perguntaid);
    });
 });


app.listen(8080,() => {console.log("Servidor rodando")});