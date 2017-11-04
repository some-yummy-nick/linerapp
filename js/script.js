$(document).ready(function () {

  (function () {
    $.each($("a"), function () {
      if ($(this).attr("href") == "" || $(this).attr("href") == "#") {
        $(this).attr("href", "javascript:void(0)");
      }
    });
  })();

  (function () {
    $("a").click(function () {
      if ($(this).attr("href") == "" || $(this).attr("href") == "#" || $(this).attr("href") == "javascript:void(0)") {
        return false;
      }
      var elementClick = $(this).attr("href");
      $('html,body').stop().animate({scrollTop: $(elementClick).offset().top}, 1000);
      return false;
    });
  })();

});