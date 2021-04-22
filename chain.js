var block = require("./block.js");

//var block1 = new block(1, "carlos es lo mejor")
//console.log("Hash -> ", block1.hash.toString())
//console.log("Nonce ->", block1.nonce.toString())

class chain {
	constructor() {
		this.blockChain = []
		this.perraBlock = {}
	}

	crearBloque() {
		if (this.blockChain.length == 0) {
			this.blockChain.push(new block(this.blockChain.length, ""))
		} else {
			this.perraBlock = this.blockChain
			this.blockChain.push(new block((this.blockChain.length), "", this.blockChain[this.blockChain.length - 1].hash))
		}
	}

	async registrarData(index, data) {
		try {
			if (index <= this.blockChain.length) {
				await this.blockChain[index].setData(data);
				for (var i = 0; i < this.blockChain.length; i++) {
					if (i != 0) {
						this.blockChain[i].prev = this.blockChain[i - 1].hash
						this.blockChain[i].hash = await this.blockChain[i].setHash();
					}
				}
			}
			return true;
		} catch (error) {
			throw error;
		}
	}

}

module.exports = chain;

// var chain1 = new chain();

// chain1.crearBloque();
// chain1.crearBloque();
// chain1.crearBloque();

// chain1.registrarData(1, "carlos es lo mejor").then(data=>{
// 	console.log(chain1.blockChain)
// })
