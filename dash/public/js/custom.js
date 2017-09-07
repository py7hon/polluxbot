document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'), 0);

  // Check if there are any nav burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        console.log(target)
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');





      });
    });

        // Add a click event on each of them
    tabs.forEach(function ($tab) {
      $tab.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $tab.dataset.target;
        console.log(target)
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $(tabs).removeClass('is-active');
        $tab.classList.toggle('is-active');
        $(".tabcontainer").removeClass('is-hidden');
        $(".tabcontainer").fadeOut()

        try{count()}catch(e){}

        $($target).delay(700).fadeIn()
        $(".nano").nanoScroller();


      });
    });


  }

});


$(document).ready(function () {




  try{

 $(".nano").nanoScroller();



  var btn = $('#btn');
  var clipboard = new Clipboard(btn);
  }catch(e){

}




  $(".super-filter-button").click(function () {
    var value = $(this).data('filter');

      $(".super-filter-button").removeClass("is-active");


    $(this).addClass("is-active");

    if (value == "all") {
      $(".super-filter-button").removeClass("is-active");
      $('.super-filter').show('1000');
      $(this).addClass("is-active");
    } else {
      $(".super-filter").filter('.' + value).show('3000');
      $(".super-filter").not('.' + value).hide('3000');
    }

  });


  $(".filter-button").click(function () {
    var value = $(this).data('filter');

    if($(this).hasClass("is-active")){
    $(this).removeClass("is-active");
    $(".filter").not('.' + value).show('3000');
      return
    }

    $(this).addClass("is-active");

    if (value == "all") {
      $(".filter-button").removeClass("is-active");
      $('.filter').show('1000');
    $(this).addClass("is-active");
    } else {
      $(".filter").not('.' + value).hide('3000');
    }

  });


  document.addEventListener('DOMContentLoaded', function () {

    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any nav burgers
    if ($navbarBurgers.length > 0) {

      // Add a click event on each of them
      $navbarBurgers.forEach(function ($el) {
        $el.addEventListener('click', function () {

          // Get the target from the "data-target" attribute
          var target = $el.dataset.target;
          var $target = document.getElementById(target);

          // Toggle the class on both the "navbar-burger" and the "navbar-menu"
          $el.classList.toggle('is-active');
          $target.classList.toggle('is-active');

        });
      });
    }

  });


});


$(".asbutton").click(function () {
  $(".asbutton").removeClass("is-active")
  $(this).addClass("is-active")
  let i1 = this.dataset.server
  let i2 = this.dataset.channel
  $.post(`./${i1}/${i2}/`, function (data) {
    $('#results').html(data);
  });
});

      $(window).on('load',function(){

            $(".preloder").fadeOut("slow")
            $(".prelod").fadeIn("slow")
      })
