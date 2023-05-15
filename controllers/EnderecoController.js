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
            res.status(422).send("Endereço não existe!")
        }

        res.status(200).json(endereco)
    }catch(error){ 
        res.status(422).json("Ocorreu um erro ao buscar o item. " + error)
    }
}


controller.update = async (req, res) => {
    // const {pessoaId} = req.params
    // const {nome} = req.body
    // const {rua,cidade} = req.body.endereco
    // try{
    //     const pessoa = await Pessoa.findByPk(pessoaId)

    //     if (!pessoa){
    //         res.status(422).send("Pessoa não existe!")
    //     }

    //     pessoa.nome = nome
    //     await pessoa.save()

    //     const endereco = await Endereco.findOne({
    //         where:{
    //             pessoaId : pessoaId
    //         }
    //     })

    //     if (!endereco){
    //         res.status(422).send("Endereço não existe!")
    //     }

    //     endereco.rua = rua
    //     endereco.cidade = cidade
    //     await endereco.save()

    //     res.status(200).json(pessoa)
    // }catch (error){
    //     res.status(422).send("Ocorreu um erro ao atualizar a pessoa. " + error)
    // }
}



module.exports = controller