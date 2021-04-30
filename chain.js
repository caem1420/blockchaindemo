var block = require("./block.js");

class chain {
	constructor() {
		this.blockChain = []
	}

	crearBloque() {
		if (this.blockChain.length == 0) {
			this.blockChain.push(new block(this.blockChain.length))
		} else {
			if (this.blockChain[this.blockChain.length -1 ].data.length == 5) {
				this.blockChain[this.blockChain.length -1 ].hash = this.blockChain[this.blockChain.length -1 ].setHash()
				this.blockChain.push(new block((this.blockChain.length), this.blockChain[this.blockChain.length - 1].hash))
			} else {
				throw ("se tienen que llenar 5 transacciones antes de empezar un nuevo bloque")
			}
		}
	}

	async registrarData(dir1, dir2, data) {
		try {
			if(this.blockChain[this.blockChain.length -1 ].data.length < 5){
				await this.blockChain[this.blockChain.length -1 ].setData({dir1: dir1, dir2:dir2, data:data});
			}else{
				this.crearBloque();
				await this.blockChain[this.blockChain.length -1].setData({dir1: dir1, dir2:dir2, data:data});
			}
		} catch (error) {
			throw error;
		}
	}

	cerrarBloque(){
		this.blockChain[this.blockChain.length -1 ].setHash()
	}

}

module.exports = chain;
