$(function() {
  setTimeout(function() {
    $('.homeNewCharitySlide').click(function() {
      $('.charity-list').animate({
        left: '0'
      }, 500);
      $('.home').animate({
        left: '-180%'
      }, 500);
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
      $('.charity-list').animate({
        left: '180%'
      }, 500);
      $('.home').animate({
        left: '0'
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
    $('.listNewCharitySlide').click(function() {
      $('.charityList').animate({
        left: '180%'
      }, 500);
      $('.newCharity').animate({
        left: '0'
      }, 500);
    });
    $('.newCharityListSlide').click(function() {
      $('.charityList').animate({
        left: '0'
      }, 500);
      $('.newCharity').animate({
        left: '180%'
      }, 500);
    });
    $('.homeCartShow').click(function() {
      $('.cart').fadeIn(500);
      $('.home').fadeOut();
      $('.charity-list').fadeOut();
      $('.cards').fadeOut();
    });
    $('.homeFadeIn').click(function(event) {
      $('.cards').animate({
        left: '-180%'
      });
      $('.home').animate({
        left: '0'
      });
      $('.cart').fadeOut();
      $('.home').fadeIn();
      $('.charity-list').fadeIn();
      $('.cards').fadeIn();
    });
  }, 1000);
});
