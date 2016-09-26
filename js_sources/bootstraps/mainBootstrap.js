var mainC = new mainController();
mainC.setModel(new mainModel());
mainC.setTemplateManager(JPLoad);

mainC.init(function (response) {
	if (response) {
		presentationC.init();
		aboutme.init();
		skills.init();
		portfolioC.init();
		toolsC.init();
		mainC.scrollListener();
		contactC.init();
	}
});

$( window ).resize(function() {
	presentationC._center();
});

window.onload=function() {
	console.log('wara');
};