var presentationController = function () {
	this.templateManager;
};

presentationController.prototype = {
	constructor : presentationController,

	setTemplateManager : function (templateManager) {
		this.templateManager = templateManager;
	},

	init: function () {
		var _this = this;
		this._render("templates/presentation.html", $('#presentation'));
		setTimeout(function () {
			_this._center();
		},400);
	},

	_center: function () {
		var $id = $('#main #presentation .title-container');
			$container = $('#main #presentation'),
			width = $container.width(),
			size = 510;

		// if (width < 640)
		// 	size = 350;
		// if (width < 400)
		// 	size = 300;
		
    $id.css("position","absolute");
    $id.css("top", Math.max(0, (($container.height() - $id.outerHeight()) / 2) + 
                                                $container.scrollTop()) + "px");
    $id.css("left", Math.max(0, (($container.width() - $id.width()) / 2) + 
                                                $container.scrollLeft()) + "px");
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