const mon = require('mongoose')

const artigo = new mon.Schema({
    titulo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
})

mon.model('artigox', artigo)