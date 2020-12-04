const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const perguntaModel = require('./models/modelPerguntas');
const respostaModel = require('./models/modelRespostas');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//setando qual view engine usarei, no caso, o ejs
app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/views'));
//setando arquivos estaticos no css
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', async(req, res)=>{
    //com o objeto {raw:true} virá apenas os dados crus do db
    await perguntaModel.findAll({raw: true, order: [
        ['id','DESC'] //ASC = crescente, DESC = decrescente
    ]}).then((dados)=>{
        res.render('index',{
            titulo: 'home | guiaperguntas',
            perguntas: dados
        });
    }).catch((erro)=>{
        res.send('erro, não foi encontrado nenhum dado.');
    })
})
app.get('/perguntar',(req, res)=>{
    res.render('perguntar',{
        titulo: 'perguntar | guiaperguntas'
    });
})
app.get('/pergunta/:id', async(req, res)=>{
    const {id} = req.params;
    const aviso = '';
    const dados = await perguntaModel.findOne({raw: true, where: {id}});
    const dadosRespostas = await respostaModel.findAll({raw: true, where: {perguntaId: id}, order: [['id','DESC']]});
    if(!dados){
        return res.redirect('/');
    }
    
    res.render('pergunta',{
        titulo: 'pesgunta | guiaperguntas',
        item: dados,
        itemRespostas: dadosRespostas,
    })
})
app.post('/salvaresposta', async(req, res)=>{
    const {id, resposta} = req.body;
    if(!id){
        return res.redirect(`/`);
    }
    if(!resposta){
        return res.redirect(`/pergunta/${id}`);
    }
    await respostaModel.create({
        corpo: resposta,
        perguntaId: id
    }).then(()=>{
        res.redirect(`/pergunta/${id}`);
    })
});
app.post('/salvarpergunta', async (req, res)=>{
    const {titulo, descricao } = req.body;
    const task = await perguntaModel.create({
        titulo,
        descricao
    }).then(()=>{
        res.redirect('/');
    });
})
app.get('/*', (req, res)=>{
    res.render('404', {
        titulo: 'error 404 | guiaperguntas'
    });
});
app.listen(3000, (erro)=>{
    if(erro){
        return console.log('erro ao iniciar o serviço.');
    }
    console.log('Api rodando!');
})