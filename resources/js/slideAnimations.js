$(function() {
  setTimeout(function() {
    $('.homeNewCharitySlide').click(function() {
      $('.charity-form').css("top", "7000px");
      $('.charity-form').animate({
        top: '0'
      }, 500);
      $('.home').animate({
        top: '-180%'
      }, 500);
      $('.charity-form').show();
    });
    $('.homeCardsSlide').click(function() {
      $('.cards').animate({
        left: '0'
      }, 500);
      $('.home').animate({
        left: '180%'
      }, 500);
    });
    $('.newCharityHomeSlide').click(function() {
      $('.charity-form').animate({
        top: '180%'
      }, 500);
      $('.home').animate({
        top: '0'
      }, 500);
      setTimeout(function() {
        $('.charity-form').hide();
      }, 500);
    });
    $('.cardsHomeSlide').click(function() {
      $('.cards').animate({
        left: '-180%'
      }, 500);
      $('.home').animate({
        left: '0'
      }, 500);
    });
  }, 1000);
});
