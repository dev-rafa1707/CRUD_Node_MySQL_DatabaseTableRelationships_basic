const Pessoa = require("../models/pessoa")
const Pedido = require("../models/pedido")
const Produto = require("../models/product")

const controller = {}

controller.getAll = async (req, res) => {
    try{
        const pedidos = await Pedido.findAll({
            include: [{ model: Produto, through: "pedidoProduto" }],
          })
        res.status(200).json(pedidos)
    }catch(error){
        res.status(500).json(error)
    }
}

controller.getById = async (req, res) => {
    
}

controller.create = async (req, res) => {
    const {pessoaId} = req.params
    const {produtosIds} = req.body

    try{
        const pessoa = await Pessoa.findByPk(pessoaId)
        
        if (!pessoa){
            res.status().send("Pessoa não existe!")
        }
        
        const produtos = await Produto.findAll({ where: { id: produtosIds } });
        
        let valorPedido = 0
        for (produto of produtos){
            valorPedido += parseFloat(produto.preco)
        }

        console.log(valorPedido)

        const pedido = await Pedido.create({valor:valorPedido,pessoaId})
        
        await pedido.addProdutos(produtos);
     
        res.status(200).json(pedido)
    }catch(error){ 
        res.status(422).send("Ocorreu um erro ao cadastrar o pedido. " + error)
    }
}

controller.update = async (req, res) => {
    
    
}

controller.delete = async (req, res) => {
    const {pessoaId,pedidoId} = req.params
    try{
        const pessoa = await Pessoa.findByPk(pessoaId)

        if (!pessoa){
            res.status(422).send("Pessoa não existe!")
        }

        const pedido = await Pedido.findByPk(pedidoId)

        if (!pedido){
            res.status(422).send("Pedido não existe!")
        }

        await pedido.destroy()
        res.status(200).json(pedido)
    }catch (error){
        res.status(422).send("Ocorreu um erro ao remover o pedido. " + error)
    }
    
}

module.exports = controller