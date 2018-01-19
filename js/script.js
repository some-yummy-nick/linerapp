$(document).ready(function () {

	addVoidForLinks($("a"));
	scrollLinks($(".js-scroll"));
	hamburger('js-hamburger', "js-menu");
	addPhoneMask(".js-phone");

	var mq = window.matchMedia("(max-width: 1374px)");
	if (mq.matches) {

		var mySwiper = new Swiper('.js-swiper-prices', {
			loop: true,
			autoHeight: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			}
		})
	}
	(function () {
		validate.init({
			messageValueMissing: "Пожалуйста заполните поле",
			messageTypeMismatchEmail: email.title,
			fieldClass: 'error', // The class to apply to fields with errors
			errorClass: 'error-message'
		})
	})();

});