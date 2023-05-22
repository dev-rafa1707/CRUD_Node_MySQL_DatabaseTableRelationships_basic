const Product = require('../models/product');
const controller = {}

controller.getAll = async (req, res) => {
    try{
        const products = await Product.findAll({
            // include: Cor
        })
        res.status(200).json(products)
    }catch(error){
        res.status(500).json(error)
    }
}

controller.getById = async (req, res) => {
    const {produtoId} = req.params
    try{
        const product = await Product.findByPk(produtoId)
        //const productX = await Product.findAll({
        //    where:{
        //        descricao:req.params.palavra
        //    }
        //})
        res.status(200).json(product)
    }catch(error){ 
        res.status(422).json("Ocorreu um erro ao buscar o item. " + error)
    }
}

controller.create = async (req, res) => {
    let {descricao,preco} = req.body

    try{
        const produto = await Product.create({descricao,preco})
        res.status(200).json(produto)
    }catch(error){ 
        res.status(422).send("Ocorreu um erro ao cadastrar o item. " + error)
    }

}

controller.update = async (req, res) => {
    const {produtoId} = req.params
    const {descricao,preco} = req.body
    try{
        const produto = await Product.findByPk(produtoId)
        produto.descricao = descricao
        produto.preco = preco
        await produto.save()
        res.status(200).json(produto)
    }catch (error){
        res.status(422).send("Ocorreu um erro ao atualizar o item. " + error)
    }
}

controller.delete = async (req, res) => {
    const {produtoId} = req.params
    try{
        const produto = await Product.findByPk(produtoId)

        if (!produto){
            res.status(422).send("Produto não existe!")
        }

        await produto.destroy()
        res.status(200).json(produto)
    }catch (error){
        res.status(422).send("Ocorreu um erro ao remover o item. " + error)
    }
}

module.exports = controller