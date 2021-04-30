const chain = require("./chain");


var BlockChain = new chain();


BlockChain.crearBloque();
console.log(BlockChain.blockChain)

for(var i = 0; i<=10; i++){
    BlockChain.registrarData("1", "2", "carlos es lo menjor")
}
console.log(BlockChain.blockChain)