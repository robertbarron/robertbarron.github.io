var aboutmeController = function () {
	this.templateManager;
};

aboutmeController.prototype = {
	constructor : aboutmeController,

	setTemplateManager : function (templateManager) {
		this.templateManager = templateManager;
	},
	
	scrollToElement: function (tipo) {
		var _this = this,
			$id = undefined;

		if (tipo == 'development') {
			$id = $('body #main #portfolio');
			$id.find('.action-portfolio').click();
			
			$('html, body').animate({
				scrollTop: $id.offset().top
			}, 1000);
		} else if (tipo == 'skills') {
			$id = $('body #main #skills');

			$('html, body').animate({
				scrollTop: $id.offset().top
			}, 1000);
		} else if (tipo == 'resume') {
			window.open('//robertobarron.com/resume/roberto_barron_resume.pdf', '_blank', 'fullscreen=yes')
		}
	},


	init: function () {
		var _this = this,
			status = false;
		this._render('templates/about-me.html', $('#aboutme'), function (response) {
			if (response) {
				if (_this.checkHover()) {
					_this.getPortfolio();
					setTimeout(function () {
						_this.checkMobile();
					},1000);
				}
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