const ex = require('express')
const mon = require('mongoose')
const corx = require('cors')

require('./models/Artigo')
const artigoy = mon.model('artigox')

const app = ex()

app.use(ex.json())

app.use((req, res, next) => {
   // console.log('Acessou o Middleware!')
   res.header('Access-Control-Allow-Origin', '*')
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
   app.use(cors())
    next()
})

mon.connect('mongodb://localhost/celke',{
     useNewUrlParser: true,
     useUnifiedTopology: true
}).then(() => {
    console.log('Conexão com MongoDB realizada com sucesso!')
}).catch((erro) => {
    console.log('Erro: Conexão com MongoDB não realizada com sucesso!')
})

app.get('/', (req, res) => {
    artigoy.find({}).then((artigo) => {
        return res.json(artigo)
}).catch((erro) => {
    return res.status(400).json({
        error: true,
        message: "Nenhum artigo encontrado!"
    })
})
})

app.get('/artigo/:id', (req, res) => {
    artigoy.findOne({_id:req.params.id}).then((artigo) => {
        return res.json(artigo)
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    })
})


app.post('/artigo', (req, res) => {
    const artigoxx = artigoy.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: 'Error: Artigo não foi cadastrado com sucesso!'
        })

        return res.status(400).json({
            error: false,
            message: 'Artigo cadastro com sucesso!'
        })
    })
    
})

app.put('/artigo/:id', (req, res) => {
    const artigo2 = artigoy.updateOne({_id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: 'Error: artigo não foi editado com sucesso!'
        })

        return res.json({
            error: false,
            message: 'Artigo editado com sucesso!'
        })
    })
})

app.delete('/artigo/:id', (req, res) => {
    const artigo3 = artigoy.deleteOne({_id: req.params.id}, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: 'Error: Artigo não foi apagado com sucesso!'
        })

        return res.json({
            error: false,
            message: "Artigo apagado com sucesso!"
        })
    })
})


app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080/")
})