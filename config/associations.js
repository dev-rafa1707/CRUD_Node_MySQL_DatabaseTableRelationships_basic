const Pessoa = require("../models/pessoa")
const Endereco = require("../models/endereco")

Pessoa.hasOne(Endereco,{onDelete:"CASCADE"})
Endereco.belongsTo(Pessoa,{foreingKey:"pessoaId"})

module.exports = {Pessoa, Endereco}