$(function() {
  setTimeout(function() {
    $('.homeNewCharitySlide').click(function() {
      console.log('it works');
      $('.charity-form').animate({
        left: '180%'
      }, 500);
    });
  }, 1000);
});
