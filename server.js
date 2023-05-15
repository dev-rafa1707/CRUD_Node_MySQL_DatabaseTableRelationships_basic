const express = require("express")
const routes = require("./routes/routes")
require("./config/associations")

const server = express()
const PORT = 3000

server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(routes)


server.listen(PORT,()=>{
    console.log("Servidor executando na porta "+PORT)
})