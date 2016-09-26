var contactC = new contactController();
contactC.setTemplateManager(JPLoad);

$('body').on('click','#main #contact #sendit', function (e) {
	var clickedEl = $(this),
		name=$("#main #contact #name"),
		emails=$("#main #contact #mails"),
		phone=$("#main #contact #phone"),
		descri=$("#main #contact #aboutit"),
		error=false;

	if ( !clickedEl.hasClass('sent') ) {
		if (emails.val().length < 5) {
			emails.attr('placeholder', 'Please, enter a valid email address')
				.addClass('errorForm').focus();
			error=true;
		} else {
			emails.attr('placeholder', 'Email').removeClass('errorForm');
			contactC.isEmail(emails.val(), function (response) {
				if (!response) {
					emails.addClass('errorForm').focus()
						.attr('placeholder', 'Please, enter a valid email address').val('');
					error=true;
				} else {
					emails.removeClass('errorForm').attr('placeholder','Email');
					emails.siblings('.errorMessage').remove();
				}
			});
		}
		if (!error) {
			if (name.val().length < 5) {
				name.attr('placeholder', 'Please, enter a name').addClass('errorForm').focus().val('');
				error=true;
			} else {
				name.attr('placeholder', 'Name').removeClass('errorForm');
			}
		}
		if (!error) {
			if (phone.val().length < 5) {
				phone.attr('placeholder', 'Please, enter a valid phone number')
					.addClass('errorForm').focus().val('');
				error=true;
			} else {
				phone.attr('placeholder', 'Phone').removeClass('errorForm');
			}
		}
		if (!error) {
			if (descri.val().length < 20) {
				descri.val('');
				descri.attr('placeholder', 'Please, be more specific')
					.addClass('errorForm').focus().val('');
				error=true;
			} else {
				descri.attr({
					'placeholder' : 'Message'
				}).removeClass('errorForm');
			}
		}
		if (!error) {
			$('#main #contact #sendIt .normal').addClass('display-none');
			$('#main #contact #sendIt .sending').removeClass('display-none');
			$.post("sendEmail.php",
				{
					'name' : name.val(),
					'mail' : emails.val(),
					'phone': phone.val(),
					'descr': descri.val()
				}, 
				function (data) {
					if (data == "1") {
						$('#error_message')
							.html('There\'s an error sending the message, please try again!');
					} else {
						$('#error_message').html('');
						$('#main #contact #sendIt').text('SENT!');
						name.val('');
						emails.val('');
						phone.val('');
						descri.val('');
					}
				}
			).fail( function() {
				$('#error_message')
							.html('There\'s an error sending the message, please try again!');
			});
		}
	}
});