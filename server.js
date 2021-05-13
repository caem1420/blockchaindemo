var express = require("express");
var cors = require("cors");
var chain = require("./chain");
var app = express();

app.use(cors());
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 


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



app.listen(3000)
