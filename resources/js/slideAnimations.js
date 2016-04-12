$(function() {
  setTimeout(function() {
    $('.homeNewCharitySlide').click(function() {
      $('.charity-form').animate({
        left: '180%'
      }, 500);
    });
    $('.homeCardsSlide').click(function() {
      console.log('it works');
      $('.cards').animate({
        left: '0'
      }, 500);
    });
  }, 1000);
});
