var toolsModel = function () {
};

toolsModel.prototype = {
	constructor : toolsModel,
	
	getTools: function (callback) {
		this._apicall("GET","data/tools.json", {}, function (error, response) {
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