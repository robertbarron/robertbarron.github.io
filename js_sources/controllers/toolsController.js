var toolsController = function () {
	this.templateManager;
	this.model;
};

toolsController.prototype = {
	constructor : toolsController,
	lastName : '',

	setTemplateManager : function (templateManager) {
		this.templateManager = templateManager;
	},

	setModel : function (model) {
		this.model = model;
	},

	init: function () {
		var _this = this;
		this._render('templates/tools.html', $('#tools'), function (response) {
			if (response) {
				_this.getTools();
				// setTimeout(function () {
				// 	_this.setRandomHover();
				// },300);
			}
		});
	},

	getTools: function () {
		var _this = this,
			itemTemplate = 'templates/tool-item.html',
			$id = $('#tools .tools-container');

		this.model.getTools(function (response) {
			response = response.tools;
			for (index = 0 ; index < response.length; index++) {
				_this._append(itemTemplate, $id, response[index]);

				if (index >= (response.length-1) )
					$('#tools .tools-container').append('<div class="clear"></div>');
			}
		});
	},

	_render: function (template, idSection, callback) {
		var _this = this;
		
		this.templateManager.getView(template, true, function (response) {
			if (response) {
				_this.templateManager.$loadView(response, idSection, undefined);
				if (callback)
					callback(true);
			}
		});
	},

	_callRandom: function () {
		var items = $('#tools .tools-container .effect-romeo'),
			var1 = Math.floor((Math.random() * items.length) + 1),
			var2 = Math.floor((Math.random() * items.length) + 1),
			var3 = Math.floor((Math.random() * items.length) + 1),
			var4 = Math.floor((Math.random() * items.length) + 1),
			var5 = Math.floor((Math.random() * items.length) + 1),
			var6 = Math.floor((Math.random() * items.length) + 1),
			var7 = Math.floor((Math.random() * items.length) + 1),
			var8 = Math.floor((Math.random() * items.length) + 1),
			var9 = Math.floor((Math.random() * items.length) + 1),
			var10 = Math.floor((Math.random() * items.length) + 1),
			var11 = Math.floor((Math.random() * items.length) + 1),
			var12 = Math.floor((Math.random() * items.length) + 1);

		setTimeout(function () {
			$(items[var1]).addClass('hover-this');
		},500);
		setTimeout(function () {
			$(items[var2]).addClass('hover-this');
		},1000);
		setTimeout(function () {
			$(items[var3]).addClass('hover-this');
		},1500);
		setTimeout(function () {
			$(items[var4]).addClass('hover-this');
		},2000);
		setTimeout(function () {
			$(items[var5]).addClass('hover-this');
		},2500);
		setTimeout(function () {
			$(items[var6]).addClass('hover-this');
		},3000);
		setTimeout(function () {
			$(items[var7]).addClass('hover-this');
		},3500);
		setTimeout(function () {
			$(items[var8]).addClass('hover-this');
		},4000);
		setTimeout(function () {
			$(items[var9]).addClass('hover-this');
		},4500);
		setTimeout(function () {
			$(items[var10]).addClass('hover-this');
		},5000);
		setTimeout(function () {
			$(items[var11]).addClass('hover-this');
		},5500);
		setTimeout(function () {
			$(items[var11]).addClass('hover-this');
		},6000);
	},

	setRandomHover: function () {
		var $container = $('#tools .tools-container'),
			items = $container.children(),
			_this = this;

		var intervalo = setInterval(function () {
			$container.find('.effect-romeo').removeClass('hover-this');
			_this._callRandom(items);
		},7000);

		this._callRandom(items);
	},

	_concat: function (template, data, callback) {
		var _this = this;

		this.templateManager.getView(template, true, function (response) {
			if (response)
				_this.templateManager.concatenate(response, data, function (result) {
					if (result)
						if (callback)
							callback(result);
				});
		});
	},

	_append : function (template, $id, data, callback) {
		var _this = this;
		this.templateManager.getView(template, true, function (response) {
			if (response) {
				if (data.name != _this.lastName) {
					_this.lastName = data.name;
					_this.templateManager.$appendView(response, $id, data, function (result) {
						if (result)
							if (callback)
								callback(true);
					});
				}
			}
		});

	}
};