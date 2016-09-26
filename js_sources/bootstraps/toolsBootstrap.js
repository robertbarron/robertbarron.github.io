var toolsC = new toolsController();
toolsC.setModel(new toolsModel());
toolsC.setTemplateManager(JPLoad);

$('body').on('mouseenter', '#tools .tool', function (e) {
	$(this).removeClass('grayscale');
});

$('body').on('mouseleave', '#tools .tool', function (e) {
	$(this).addClass('grayscale');
});