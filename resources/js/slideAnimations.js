$(function() {
  setTimeout(function() {
    var full = false;
    var d = {};
    var speed = 500;
    $('.homeNewCharitySlide').click(function() {
      $('.charity-list').animate({
        left: '0'
      }, 500);
      $('.home').animate({
        left: '-200%'
      }, 500);
    });
    $('.homeCardsSlide').click(function() {
      $('.cards').animate({
        left: '0'
      }, 500);
      $('.home').animate({
        left: '200%'
      }, 500);
    });
    $('.newCharityHomeSlide').click(function() {
      $('.charity-list').animate({
        left: '200%'
      }, 500);
      $('.home').animate({
        left: '0'
      }, 500);
    });
    $('.cardsHomeSlide').click(function() {
      $('.cards').animate({
        left: '-200%'
      }, 500);
      $('.home').animate({
        left: '0'
      }, 500);
    });
    $('.listNewCharitySlide').click(function() {
      $('.charityList').animate({
        left: '200%'
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
        left: '200%'
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
        left: '-200%'
      });
      $('.home').animate({
        left: '0'
      });
      $('.cart').fadeOut();
      $('.home').fadeIn();
      $('.charity-list').fadeIn();
      $('.cards').fadeIn();
    });
    $('.charity>img').on('click', function() {
      var thisCharity = $(this).parent();
      console.log($(thisCharity)[0]);
      if(!full) {
        $('.charity').each(function() {
          if($(this)[0] !== $(thisCharity)[0]){
            $(this).hide();
          }
        });
        d.height = "80vh";
        d.width = "80vw";
        $(this).parent().animate(d, speed, function(){

        });
        full=true;
      } else {
        d.width = "300px";
        d.height = "300px";
        $(this).parent().css("position","");
        $(this).parent().animate(d, speed, function() {
          $('.charity').each(function() {
            if($(this)[0] !== $(thisCharity)[0]) {
              $(this).fadeIn('fast');
            }
          });
        });
        full = false;
      }
    });
  }, 1000);
});
