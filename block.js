var SHA256 = require("crypto-js/sha256")
class block {
	constructor(index, data, prev = "0000000000000000000000000000000000000000000000000000000000000000") {
		this.index = index;
		this.nonce = 0;
		this.data = data;
		this.prev = prev;
		this.hash = this.setHash();
	}

	setHash() {
		var hashNew;
		for (var x = 0; x <= 500000; x++) {
			hashNew = SHA256(this.index.toString() + x.toString() + this.data.toString() + this.prev.toString()).toString()
			if (hashNew.substr(0, 4) === "0000") {
				this.nonce = x;
				return hashNew;
			}

		}
	}

	setData(data) {
		this.data = data;
		this.hash = this.setHash();
	}


}

module.exports = block;
