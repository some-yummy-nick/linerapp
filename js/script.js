$(document).ready(function () {

  addVoidForLinks($("a"));
  scrollLinks($("a"));
  setEqualHeight($(".row>.col"));
  hamburger('js-hamburger', "js-menu");
});