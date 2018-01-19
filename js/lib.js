function setEqualHeight(columns) {
  var tallestcolumn = 0;
  columns.each(function () {
    var currentHeight = $(this).height();
    console.log(currentHeight);
    if (currentHeight > tallestcolumn) {
      tallestcolumn = currentHeight;
    }
  });
  columns.height(tallestcolumn);
}

function scrollLinks(links) {
  links.click(function () {
    if ($(this).attr("href") == "" || $(this).attr("href") == "#" || $(this).attr("href") == "javascript:void(0)") {
      return false;
    }
    var elementClick = $(this).attr("href");
    $('html,body').stop().animate({scrollTop: $(elementClick).offset().top}, 1000);
    return false;
  });
}

function addVoidForLinks(links) {
  $.each(links, function () {
    if ($(this).attr("href") == "" || $(this).attr("href") == "#") {
      $(this).attr("href", "javascript:void(0)");
    }
  });
}

function addPhoneMask(element) {
	var phone = document.querySelectorAll(element);

	Array.prototype.forEach.call(phone, function (child) {
		phoneMask = new IMask(child, {
			mask: '{8} 000 000-00-00'
		});
	});
}

//Доступный hamburger https://foxland.fi/simple-accessible-svg-menu-hamburger-animation
function hamburger(element, menu) {
  var button = document.getElementById(element),
	  overlay = document.querySelector(".js-overlay");
    menu = document.getElementById(menu);
    function toggleMenu() {
	    if (-1 !== button.className.indexOf('opened')) {
		    button.className = button.className.replace(' opened', '');
		    button.setAttribute('aria-expanded', 'false');
		    menu.className = menu.className.replace(' active', '');
		    menu.setAttribute('aria-expanded', 'false');
		    overlay.classList.remove("active");

	    } else {
		    button.className += ' opened';
		    overlay.classList.add("active");
		    button.setAttribute('aria-expanded', 'true');
		    menu.className += ' active';
		    menu.setAttribute('aria-expanded', 'true');
	    }
    }
    button.addEventListener("click",toggleMenu);


  overlay.addEventListener("click",function () {
	  toggleMenu();
  })
}