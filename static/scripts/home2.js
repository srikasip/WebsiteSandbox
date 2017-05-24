$(document).ready(function(){
  LoadCarousel();
  SmoothScrollLinks();
  SetMenu();
  ClearInstaWall();
  HeaderBehavior();
});

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
function ClearInstaWall()
{
  $("li.feed-item.juicer.image-post").css("display", "none");
}
function LoadCarousel()
{
  var $item = $('.carousel .item'); 
  var $wHeight = $(window).height();
  $item.eq(0).addClass('active');
  $item.height($wHeight); 
  $item.addClass('full-screen');

  $('.carousel img').each(function() {
    var $src = $(this).attr('src');
    var $color = $(this).attr('data-color');
    $(this).parent().css({
      'background-image' : 'url(' + $src + ')',
      'background-color' : $color
    });
    $(this).remove();
  });

  $(window).on('resize', function (){
    $wHeight = $(window).height();
    $item.height($wHeight);
  });

  $('.carousel').carousel({
    interval: 6000,
    pause: "false"
  });

  // $(".carousel").on("slid.bs.carousel",function(){
  //   isWhite = $(".carousel-indicators li.active").attr("data-attr");
  //   if(isWhite == "darkImg")
  //   {
  //     $(".carousel-caption").css("color", "#fff");
  //     $("#svg_logo").css("fill", "#fff");
  //     $(".toppings").css("fill", "#000");
  //     //$(".toppings").css("fill", "#00cdcd");
  //   }
  //   else
  //   {
  //     $(".carousel-caption").css("color", "#222");
  //     $("#svg_logo").css("fill", "#222");
  //     $(".toppings").css("fill", "#fff");
  //   }
  // });
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

function linearFunction(start_x, start_y, final_x, final_y, curr_x)
{
  m = (final_y-start_y)/(final_x - start_x);
  b = final_y - m*final_x;
  curr_y = m*curr_x + b;
  curr_y = Math.round(curr_y*100)/100.0;
  return curr_y;
}