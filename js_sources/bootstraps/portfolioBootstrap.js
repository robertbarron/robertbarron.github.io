var portfolioC = new portfolioController();
portfolioC.setModel(new portfolioModel());
portfolioC.setTemplateManager(JPLoad);

$('body').on('click', '#portfolio .hover-all .action-portfolio', function (e) {
	var clicked = $(this);
	if (!clicked.parent().hasClass('hidden')) {
		clicked.parent().siblings('#forward').removeClass('hidden');
		clicked.parent().addClass('hidden');
		setTimeout(function() {
			clicked.parent().remove();
		},600);
		portfolioC.getPortfolio();
		setTimeout(function () {
			portfolioC.checkMobile();
		},500);
	}
});

$('body').on('click', '#portfolio #backward, #portfolio #forward', function (e) {
	var clicked = $(this),
		type = clicked.attr('data-type'),
		container = $('body #portfolio .portfolio-container'),
		mask = $('body #portfolio .portfolio-container .mask'),
		current = container.attr('data-current');
		if (current >= 0 && type !=1)
			$('#portfolio #backward').removeClass('hidden');

		if (current == 1 && type == 1)
			$('#portfolio #backward').addClass('hidden');

		if (current >= 16 && type == 2)
			$('#portfolio #forward').addClass('hidden');
		
		if (current == 17 && type !=2)
			$('#portfolio #forward').removeClass('hidden');

		if (current == 0 && type == 1)
			return;
		if (current == 17 && type == 2)
			return;

		if (type == 1) {
			current-=1;
			container.attr({'data-current':current});
			var newT = container.width()*current;
			mask.css({
				'-webkit-transform' : 'translate(-' + newT + 'px,0)',
    			'transform' : 'translate(-' + newT + 'px,0)'
			});
		} else {
			current = parseInt(current) + 1;
			container.attr({'data-current':current});
			var newT = container.width()*current;
			mask.css({
				'-webkit-transform' : 'translate(-' + newT + 'px,0)',
    			'transform' : 'translate(-' + newT + 'px,0)'
			});
		}
		//Add Effect on each revealed item
		// $('body #portfolio .portfolio-container .mask .item').removeClass('fadeInUp')
		// var who = $('body #portfolio .portfolio-container .mask .item');
		// $(who[current]).addClass('fadeInUp');
});

$('body').on('swipeleft', '#portfolio, #portfolio .portfolio-container', function (e) {
  var clicked = $(this),
	container = $('body #portfolio .portfolio-container'),
	mask = $('body #portfolio .portfolio-container .mask'),
	current = container.attr('data-current');
	
	e.stopImmediatePropagation();

	if (current >= 16)
		$('#portfolio #forward').addClass('hidden');
	if (current == 17)
		return;

	current = parseInt(current) + 1;
	container.attr({'data-current':current});
	var newT = container.width()*current;
	mask.css({
		// 'margin-left': '-' + (current*100) + '%'
		'-webkit-transform' : 'translate(-' + newT + 'px,0)',
    	'transform' : 'translate(-' + newT + 'px,0)'
	});
	//Add Effect on each revealed item
	// $('body #portfolio .portfolio-container .mask .item').removeClass('fadeInUp')
	// var who = $('body #portfolio .portfolio-container .mask .item');
	// $(who[current]).addClass('fadeInUp');
});

$('body').on('swiperight', '#portfolio, #portfolio .portfolio-container', function (e) {
	var clicked = $(this),
		type = clicked.attr('data-type'),
		container = $('body #portfolio .portfolio-container'),
		mask = $('body #portfolio .portfolio-container .mask'),
		current = container.attr('data-current');

		e.stopImmediatePropagation();
		if (current >= 0)
			$('#portfolio #backward').removeClass('hidden');

		if (current == 1)
			$('#portfolio #backward').addClass('hidden');

		if (current == 0)
			return;

		current-=1;
		container.attr({'data-current':current});
		var newT = container.width()*current;
		mask.css({
			'-webkit-transform' : 'translate(-' + newT + 'px,0)',
    		'transform' : 'translate(-' + newT + 'px,0)'
		});
		//Add Effect on each revealed item
		// $('body #portfolio .portfolio-container .mask .item').removeClass('fadeInUp')
		// var who = $('body #portfolio .portfolio-container .mask .item');
		// $(who[current]).addClass('fadeInUp');
});