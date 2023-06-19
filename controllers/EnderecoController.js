const Pessoa = require("../models/pessoa")
const Endereco = require("../models/endereco")

const controller = {}

controller.getAll = async (req, res) => {
    try{
        const enderecos = await Endereco.findAll({
            include: Pessoa
        })
        res.status(200).json(enderecos)
    }catch(error){
        res.status(500).json(error)
    }
}

controller.getById = async (req, res) => {
    const {pessoaId} = req.params

    try{
        const endereco = await Endereco.findByPk(pessoaId,{
            include: Pessoa,
        })
        
        if (!endereco){
            return res.status(404).json({ message: 'Endereço não existe'});
        }

        res.status(200).json(endereco)
    }catch(error){ 
        res.status(422).json("Ocorreu um erro ao buscar o item. " + error)
    }
}






module.exports = controller