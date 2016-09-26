var portfolioController = function () {
	this.templateManager;
	this.model;
};

portfolioController.prototype = {
	constructor : portfolioController,
	lastCompany : '',
	NUMBER_OF_PROJECTS : 0,

	setTemplateManager : function (templateManager) {
		this.templateManager = templateManager;
	},

	setModel : function (model) {
		this.model = model;
	},

	init: function () {
		var _this = this,
			status = false;
		this._render('templates/portfolio.html', $('#portfolio'), function (response) {
			if (response) {
				if (_this.checkHover()) {
					_this.getPortfolio();
					setTimeout(function () {
						_this.checkMobile();
						mainC.setPortfolioId($('#main #portfolio'));
					},1000);
				}
			}
		});
	},

	indicator: function() {
		var container = $('#main #portfolio');
		container.find('#swipe-indicator').addClass('rubberBand');
		setTimeout(function () {
			container.find('#swipe-indicator').addClass('display-none');
			setTimeout(function () {
				container.find('#swipe-indicator').removeClass('display-none');
			},200);
			setTimeout(function () {
				container.find('#swipe-indicator').addClass('display-none');
			},2200);
		},3000);
	},

	addTags: function (item) {
		var find = ', ',
			re = new RegExp(find, 'g');
		item = item.replace(re, '</span><span>');

		return '<span>' + item + '</span>';
	},

	getPortfolio: function () {
		var _this = this,
			itemTemplate = 'templates/portfolio-item.html',
			lastItem = 'templates/portfolio-item-last.html',
			$id = $('#portfolio .portfolio-container .mask');

		this.model.getPortfolio(function (response) {
			response = response.items;
			_this.NUMBER_OF_PROJECTS = response.length;
			for (index = 0 ; index < response.length; index++) {
				response[index].tools = _this.addTags(response[index].tools);
				_this._append(itemTemplate, $id, response[index]);
			}
		});
	},

	checkMobile: function () {
		var container = $('#portfolio .portfolio-container'),
			width = container.width();
		if (width < 1000 && width >= 640) {
			container.addClass('mobile');
			container.find('.item-container').width(width);
			container.find('.item').width(width);
		} else if (width < 640) {
			width = width-40;
			container.width(width);
			container.parent().addClass('tiny-mobile');
			container.find('.mask').width(width * this.NUMBER_OF_PROJECTS);
			container.find('.item-container').width(width);
			container.find('.item').width(width);
		}
	},

	checkHover: function () {
		var container = $('#portfolio .hover-all'),
			display = container.css('display');
			if (display == 'none')
				return true;
			else
				return false;
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

	_concat: function (template, data, callback) {
		var _this = this;

		this.templateManager.getView(template, false, function (response) {
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
		this.templateManager.getView(template, false, function (response) {
			if (response) {
				if (data.company != _this.lastCompany) {
					_this.lastCompany = data.company;
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