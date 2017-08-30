    $('.advtog').click(function () {
      $('.advanced').attr('disabled', !this.checked)
      $('.unadvanced').attr('disabled', this.checked)
    });
    $('.disableCheck').click(function () {
      var tg = $(this).data("target")
      console.log(tg)
      $(".thres" + tg).attr('disabled', !this.checked)
    })

    $(".itm").click(function () {
      $(".pgs").hide()
      $(".itm").removeClass("is-active")
      $(this).addClass("is-active")
      console.log($(this).data("target"))
      $("#" + $(this).data("target")).show()
    })
