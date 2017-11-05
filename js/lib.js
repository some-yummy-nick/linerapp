function setEqualHeight(columns){
  var tallestcolumn = 0;
  columns.each(function(){
    var currentHeight = $(this).height();
    console.log(currentHeight);
    if(currentHeight > tallestcolumn){
      tallestcolumn = currentHeight;
    }});
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