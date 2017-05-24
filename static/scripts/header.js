$(document).ready(function(){
  SmoothScrollLinks();
  SetMenu();
  HeaderBehavior();
});

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
    $( ".menu_list" ).slideToggle("slow", function() {
      $( ".hamburger" ).hide();
      $( ".cross" ).show();
    });
  });

  $(".cross, .menu_item").click(function() {
    $( ".menu_list" ).slideToggle("slow", function() {
      $( ".cross" ).hide();
      $( ".hamburger" ).show();
    });
  });
}


function HeaderBehavior()
{
  topPos = $(document).scrollTop();
  numWindows = 100*(topPos/parseFloat($(window).outerHeight()));
  numWindows = Math.round(numWindows)/100.0;
  if (numWindows < 1)
  {
    if($(".header").hasClass("stuckTop"))
    {
      $(".header").removeClass("stuckTop");
    }
    windowWidth = $(document).outerWidth();
    logoWidth = 101;//$("#svg_logo").outerWidth();
    startPos = ((windowWidth - logoWidth));
    endPos = (-1*startPos);
    currOffset = linearFunction(0,0,1,endPos,numWindows);
    $("#svg_logo").css("margin-left", String(currOffset) + "px");
  }
  else
  {
    if(!$(".header").hasClass("stuckTop"))
    {
      $(".header").addClass("stuckTop");
    }
  }
  window.requestAnimationFrame(HeaderBehavior);
}


function linearFunction(start_x, start_y, final_x, final_y, curr_x)
{
  m = (final_y-start_y)/(final_x - start_x);
  b = final_y - m*final_x;
  curr_y = m*curr_x + b;
  curr_y = Math.round(curr_y*100)/100.0;
  return curr_y;
}