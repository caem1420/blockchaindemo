var express = require("express");
var cors = require("cors");
var chain = require("./chain");
var app = express();

app.use(cors());
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 


var blockChain = new chain();

app.get("/crearBloque", (req, res) => {
    blockChain.crearBloque();
    res.send({ status: true, data: "Exitoso" });
})

app.get("/listBlockChain", (req, res) => {
    if (blockChain.blockChain.length != 0) {
        res.send({ status: true, data: blockChain.blockChain });
    } else {
        res.send({ status: false, data: "No data" });
    }
})


app.get("/cambiarData", (req, res) => {
    if ((parseInt(req.query.index) > 0 || parseInt(req.query.index) == 0) && req.query.data) {
        blockChain.registrarData(parseInt(req.query.index), req.query.data).then(data => {
            res.send({ status: true, data: "Exitoso" })
        }).catch(err=>{
            res.send({ status: false, data: err })
        })
    } else {
        res.send({ status: false, data: "missing query params" });
    }
})

app.patch("/cambiarData", (req, res) => {
    if ((parseInt(req.body.index) > 0 || parseInt(req.body.index) == 0) && req.body.data) {
        blockChain.registrarData(parseInt(req.body.index), req.body.data).then(data => {
            res.send({ status: true, data: "Exitoso" })
        }).catch(err=>{
            res.send({ status: false, data: err })
        })
    } else {
        res.send({ status: false, data: "missing query params" });
    }
})


app.listen(3000)
