var aboutme = new aboutmeController();
aboutme.setTemplateManager(JPLoad);

$('body').on('mouseenter', '#main #aboutme .themes-container .theme', function (e) {
	$(this).find('.image-theme').addClass('bounce');
});

$('body').on('mouseleave', '#main #aboutme .themes-container .theme', function (e) {
	$(this).find('.image-theme').removeClass('bounce');
});

$('body').on('click', '#main #aboutme .themes-container .theme', function (e) {
	var clicked = $(this),
		tipo = clicked.data('type');

	aboutme.scrollToElement(tipo);
});