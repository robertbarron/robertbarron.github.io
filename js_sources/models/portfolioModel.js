var portfolioModel = function () {
};

portfolioModel.prototype = {
	constructor : portfolioModel,
	
	getPortfolio: function (callback) {
		this._apicall("GET","data/portfolio.json", {}, function (error, response) {
			if (!error)
				callback(response);
			else
				callback(false);
		});
	},

	_apicall: function (protocolo, url, data, callback) {
		$.ajax({
			type: protocolo,
			url: url,
			data: data,
			success: function (response) {
				callback(false, response);
			},
			error: function () {
				callback(true, false);
			}
		});
	}

};