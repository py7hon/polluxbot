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
  }catch(e){

}



  var btn = document.getElementById('btn');
  var clipboard = new Clipboard(btn);


  $(".super-filter-button").click(function () {
    var value = $(this).attr('data-filter');
    $(this).addClass("active");

    if (value == "all") {
      //$('.filter').removeClass('hidden');
      $('.super-filter').show('1000');
    } else {
      //            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
      //            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
      $(".super-filter").not('.' + value).hide('3000');
      $('.super-filter').filter('.' + value).show('3000');

    }

  });



  $(".filter-button").click(function () {
    var value = $(this).attr('data-filter');
    $(this).addClass("active");



    if (value == "all") {
      //$('.filter').removeClass('hidden');
      $('.filter').show('1000');
    } else {
      //            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
      //            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
      $(".filter").not('.' + value).hide('3000');
      $('.filter').filter('.' + value).show('3000');

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
