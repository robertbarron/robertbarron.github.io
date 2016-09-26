var skillsController = function () {
	this.templateManager;
};

skillsController.prototype = {
	constructor : skillsController,
	oDiagram: undefined,

	setTemplateManager : function (templateManager) {
		this.templateManager = templateManager;
	},
	
	animateBars: function (type, bar) {
		var _this = this,
			MAX_AGE = 15,
			interval = undefined,
			loop = 30,
			years = parseFloat(bar.data('years')),
			percentage = (years * 100) / MAX_AGE,
			width = $('#main #skills').width();

		bar.find('.fill-bar').animate({
			'width' : percentage + '%'
		}, 1000*type);

		interval = setInterval(function () {
			if (loop <= 0)
				clearInterval(interval);
			else {
				if (width > 500)
					bar.find('.fill-bar').text(  parseFloat(years / loop--).toFixed(2) + ' Years'    );
				else
					bar.find('.fill-bar').text(  parseFloat(years / loop--).toFixed(0) + ' Yrs'    );
			}
		},30);
	},

	animateCircle: function (circle) {
		var _this = this,
			interval = undefined,
			loop = 0,
			percentage = circle.data('percentage');

		interval = setInterval(function () {
			if (loop == percentage)
				clearInterval(interval);
			else
				circle.addClass('p' + loop).removeClass('p' + (loop-1));

			loop++;
		},20);
	},

	loadCircles: function () {
		var _this = this;

		for (var i = 1; i < 6; i++) {
			_this.animateCircle($('#skills .skills-container .c100[data-type="' + i + '"]'));
			_this.animateBars(i, $('#skills .diagram-container .skills .bar-item[data-type="' + i + '"]'));
		}
	},

	init: function () {
		var _this = this,
			status = false;
		this._render('templates/skills.html', $('#skills'), function (response) {
			mainC.setSkillId($('body #skills') );
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