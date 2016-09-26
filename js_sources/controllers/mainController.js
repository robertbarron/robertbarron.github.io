var mainController = function () {
	this.templateManager;
	this.model;
};

mainController.prototype = {
	constructor : mainController,
	skillsContainer: undefined,
	portfolioContainer: undefined,

	setModel : function (model) {
		this.model = model;
	},

	setSkillId: function ($id) {
		this.skillsContainer = $id;
	},

	setPortfolioId: function ($id) {
		this.portfolioContainer = $id;
	},

	setTemplateManager : function (templateManager) {
		this.templateManager = templateManager;
	},
	
	scrollListener: function () {
		var container = $('#presentation'),
			width = container.width(),
				_this = this;
			
		$(window).on( "scroll", function (e) {
			var current = $(window).scrollTop();

			if (!_this.skillsContainer.hasClass('loaded')) {
				if (current >= (_this.skillsContainer.offset().top-300) ) {
					_this.skillsContainer.addClass('loaded');
					skills.loadCircles();
				}
			}
			if (!_this.portfolioContainer.hasClass('loaded') && 
					_this.portfolioContainer.hasClass('tiny-mobile') 
			) {
				if (current >= (_this.portfolioContainer.offset().top-400) ) {
					_this.portfolioContainer.addClass('loaded');
					portfolioC.indicator();
				}
			}
			if (width >= 400) {
				if (current > 10){
					$('#main .presentation-container').addClass('out');
					$('#main #presentation').addClass('out');
				} else if (current < 300) {
					$('#main #presentation').removeClass('out');
					$('#main .presentation-container').removeClass('out');
				}
				

				var headerTagline = $('#main #presentation .presentation-container .content'),
				offsetTagline = headerTagline.offset().top,
				yPosTagline = -($(window).scrollTop()/headerTagline.attr('data-speed'));
				headerTagline.css({
					'-webkit-transform':'translateY('+yPosTagline+'px)',
					'transform':'translateY('+yPosTagline+'px)'
				});
			}
		});
	},

	init: function (callback) {
		this._render("templates/init.html", $('#main'), function (response) {
			if (response)
				callback(true);
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
	}
};