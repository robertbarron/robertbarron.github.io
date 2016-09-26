var contactController = function () {
	this.templateManager;
	this.model;
};

contactController.prototype = {
	constructor : contactController,
	marker : '',
	setTemplateManager : function (templateManager) {
		this.templateManager = templateManager;
	},

	init: function () {
		var _this = this;
		this._render('templates/contact.html', $('#contact'), function (response) {
			if (response)
				setTimeout(function () {
					_this.loadMap();
				});
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

	loadMap: function () {
		var _this = this,
			myLatLng = {lat: 19.3771617, lng: -99.1488427},
			map = new google.maps.Map(document.getElementById('map'), {
				zoom: 13,
    		center: myLatLng,
    		scrollwheel: false,
				navigationControl: false,
  			mapTypeControl: false,
    		styles : _this.styleMap()
			});

			setTimeout(function () {
				_this.marker = new google.maps.Marker({
					map: map,
			    draggable: false,
			    animation: google.maps.Animation.DROP,
			    icon: 'images/marker.png',
			    position: myLatLng
				});
			},3000);
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
	},

	styleMap: function () {
		return [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];
	},
	
	isEmail : function (value, callback) {
		if (value.length > 5) {
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
				callback(true);
			else
				callback(false);
		} else {
			callback(false);
		}
	}
};