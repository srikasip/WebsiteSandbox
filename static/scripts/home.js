$(document).ready(function(){
  SmoothScrollLinks();
  SetMenu();
  //SetCarousel();
});

function SetCarousel()
{
  $(".sceneHolder").slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
  });
}

function SmoothScrollLinks()
{
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    var windowHeight = $(window).outerHeight();
    if(target.length) {
      event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
  });
}
function SetMenu()
{
  topPos = $(".header").outerHeight();
  $(".menu_list").css("top", "3.5em");
  $(".menu_list").css("right", "16px");
  $( ".cross" ).hide();
  $( ".menu_list" ).hide();
  $( ".hamburger" ).click(function() {
    $( ".menu_list" ).slideToggle( "slow", function() {
      $( ".hamburger" ).hide();
      $( ".cross" ).show();
    });
  });

  $( ".cross, .menu_item").click(function() {
    $( ".menu_list" ).slideToggle( "slow", function() {
      $( ".cross" ).hide();
      $( ".hamburger" ).show();
    });
  });
}
