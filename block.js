var SHA256 = require("crypto-js/sha256")
var transaction = require("./transaction")
class block {
	constructor(index, prev = "0000000000000000000000000000000000000000000000000000000000000000") {
		this.index = index;
		this.nonce = 0;
		this.data = [];
		this.prev = prev;
		this.hash = "";
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
		this.data.push(new transaction(data.dir1, data.dir2, data.data));
	}


}

module.exports = block;
