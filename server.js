var express = require("express");
var cors = require("cors");
var chain = require("./chain");
var app = express();

app.use(cors());
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

var wallets = [
    {
        "dir": "1",
        "balance": 100000
    },

    {
        "dir": "2",
        "balance": 100000
    },
    {
        "dir": "3",
        "balance": 100000
    },
    {
        "dir": "4",
        "balance": 100000
    },
    {
        "dir": "5",
        "balance": 100000
    },
    {
        "dir": "6",
        "balance": 100000
    },
    {
        "dir": "7",
        "balance": 100000
    },
    {
        "dir": "8",
        "balance": 100000
    },
    {
        "dir": "9",
        "balance": 100000
    },
    {
        "dir": "10",
        "balance": 100000
    }
]
var blockChain = new chain();

app.get("/crearBloque", (req, res) => {
    try {
        blockChain.crearBloque();
        res.send({ status: true, data: "Exitoso" });
    } catch (error) {
        res.send(res.send({ status: false, data: error }))
    }
})

app.get("/listBlockChain", (req, res) => {
    if (blockChain.blockChain.length != 0) {
        console.log(JSON.stringify(blockChain.blockChain))
        res.send({ status: true, data: blockChain.blockChain});
    } else {
        res.send({ status: false, data: "No data" });
    }
})


app.get("/cambiarData", (req, res) => {
    if(req.query.dir1 && req.query.dir2 && req.query.data){
        blockChain.registrarData(req.query.dir1, req.query.dir2, req.query.data)
        res.send({ status: true, data: "Exitoso" })
    }else{
        res.send({ status: false, data: "missing query params" });
    }
})

app.get("/consultarDir", (req, res)=>{
    if(req.query.dir){
        var temp = {
            envio : [],
            recibido : []
        }
        blockChain.blockChain.forEach(block=>{
            block.data.forEach(transaction=>{
                if(transaction.dir1 == req.query.dir || transaction.dir2 == req.query.dir){
                    if(transaction.dir1 == req.query.dir){
                        temp.envio.push(transaction.data)
                    }else{
                        temp.recibido.push(transaction.data)
                    }
                }
            })
        })
        res.send(temp)
    }else{
        res.send({ status: false, data: "missing query params" })
    }
})

app.patch("/cambiarData", (req, res) => {
    try {
        if(req.body.dir1 && req.body.dir2 && req.body.data){
            blockChain.registrarData(req.body.dir1, req.body.dir2, req.body.data)
            res.send({ status: true, data: "Exitoso" })
        }else{
            res.send({ status: false, data: "missing query params" });
        }
    } catch (error) {
        res.send(res.send({ status: false, data: error }))
    }
})

app.post("/walet/login", (req, res)=>{
    var waletComplete = null; 
    if(req.body.id){
        walets.forEach(wall=>{
            if(wall.dir == req.body.id){
                waletComplete = wall
            }
        })
        if(waletComplete){
            res.send({status: true, data: walletComplete})
        }else{
            res.send({status: false, data: "No se encontro la Walet"})
        }
    }
})


app.get("/wallet/consultarFondos", (req, res)=>{
    if(req.query.dir){
         walets.forEach(wall=>{
            if(wall.dir == req.body.id){
                waletComplete = wall.balance
            }
        })
        if(waletComplete){
            var temp = {
                envio : [],
                recibido : []
            }
             blockChain.blockChain.forEach(block=>{
                block.data.forEach(transaction=>{
                    if(transaction.dir1 == req.query.dir || transaction.dir2 == req.query.dir){
                        if(transaction.dir1 == req.query.dir){
                            temp.envio.push(parseInt(transaction.data))
                        }else{
                            temp.recibido.push(parseInt(transaction.data))
                        }
                    }
                })
            })

            temp.recibido.forEach(valor=>{
                walletComplete += parseInt(valor)
            })

             temp.envio.forEach(valor=>{
                walletComplete -= parseInt(valor)
            })
            res.send({status: true, data: walletComplete})
        }else{
            res.send({status: false, data: "No se encontro la Walet"})
        }
    }
})


app.listen(3000)
