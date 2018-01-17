$(document).ready(function () {

	addVoidForLinks($("a"));
	scrollLinks($(".js-scroll"));
	setEqualHeight($(".row>.col"));
	hamburger('js-hamburger', "js-menu");

	var mq = window.matchMedia("(max-width: 1374px)");
	if (mq.matches) {

		var mySwiper = new Swiper('.js-swiper-prices', {
			loop:true,
			autoHeight: true,
			pagination: {
				el: '.swiper-pagination',
				clickable:true
			}
		})
	}else{
		// setEqualHeight($(".swiper-slide"));
	}
});