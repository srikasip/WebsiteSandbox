$(document).ready(function(){
  ClearInstaWall();
});

function ClearInstaWall()
{
  $("li.feed-item.juicer.image-post").css("display", "none");
}