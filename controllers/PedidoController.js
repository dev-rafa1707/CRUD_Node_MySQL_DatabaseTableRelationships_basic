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

// controller.getAllClient = async (req, res) => {
    
//     const {pessoaId} = req.params

//     try{
//         const pessoa = await Pessoa.findByPk(pessoaId)
//         const pedidos = await Pedido.findAll()

//         for (pedido of pedidos) {
//             console.log(pedido)
//         } 
//     }catch(error){

//     }
// }

controller.getAllClient = async (req, res) => {
    
    const {pessoaId} = req.params
    const pedidosCliente = {}

    console.log(pessoaId)

    try{
        const pessoa = await Pessoa.findByPk(pessoaId)
        const pedidos = await Pedido.findAll()

        for (pedido of pedidos) {
            console.log(pedido)
            if (pedido.pessoaId === pessoa.id) {
                pedidosCliente.push(pedido)
            }
        }res.status(200).json(pedidosCliente) 
    }catch(error){

    }
}



controller.getById = async (req, res) => {

    const {pessoaId} = req.params
    const {pedidoId} = req.params

    try {
        const pessoa = await Pessoa.findByPk(pessoaId)
        const pedido = await Pedido.findByPk(pedidoId, {
            include: Pessoa,
        })

        console.log(pedido)
        console.log(pessoa)

        
        if (pessoa.id != pedido.pessoaId){
            res.status(422).send("Pedido não existe!")
        }

        
        res.status(200).json(pedido)
    }catch(error){
        res.status(422).json("Ocorreu um erro ao buscar o pedido. " + error)
    }
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