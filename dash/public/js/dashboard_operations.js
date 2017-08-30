

// PICK BACKGROUND OPTION
$(window).bind('beforeunload', function(){

  if(unsaved===true){

  return 'wait';
  }
});


$(".itm").click(function () {
    $(".pgs").hide()
  $(".itm").removeClass("is-active")
  $(this).addClass("is-active")
  console.log($(this).data("target"))
  $("#"+ $(this).data("target")).show()
})


$(".bgpick img").click(function () {
  $(".userbg").attr("src", $(this).attr('src'))
  $("#savebg").removeAttr("disabled")
   unsaved = true;
})

// BACKGROUND COMMIT

$("#savebg").click(function () {
  var d = $("#userbg").attr("src");
  var data = d.replace("/backdrops/", "").replace(".png", "");
  commit("background", data)
})
$("#previewbg").click(function () {
  var d = $("#userbg").attr("src");
        $("#userbp").attr("src", d)

})


$("#previewmedals").click(function () {
  var data = JSON.parse(localStorage.getItem("medals"))
  refreshMeds(data)
})


$("#savemedals").click(function () {
  var data = JSON.parse(localStorage.getItem("medals"))
  commit("medals", data)
})


$("#prevabout").click(function () {
  var data = $("#abo").val()
  $("#ptxmock").html(data)

  $("#resetabout").click(function () {
  var data = $("#ptxtdef").html()
  console.log(data)
  $("#ptxmock").html(data)
  $("#abo").val(data)
  })
  })

$("#saveabout").click(function () {
  var data = $("#abo").val()


    if (data == "") {

    swal({
      title: "Save it Empty?",
      text: "You are saving nothing as your personal text, are you sure?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d61c1c",
      confirmButtonText: "No, lemme fix it!",
      cancelButtonColor: "#1c47d6",
      cancelButtonText: "Yes, I'm sure",
      closeOnConfirm: true,
      closeOnCancel: false

    }, function (isConfirm) {
      if (isConfirm) {
        return;
      } else {
        commit("about", data)
      }
    })
  }else{
        commit("about", data)

  }



})


$("#allsave").click(function () {

  var data = {};
  var d = $("#userbg").attr("src");
  data.bg = d.replace("/backdrops/", "").replace(".png", "");
  data.md = JSON.parse(localStorage.getItem("medals"));
  data.tx = $("#abo").val();
  commit("all",data)

})

$("#allprev").click(function () {

  var data = {};
  var d = $("#userbg").attr("src");
  data.bg = d.replace("/backdrops/", "").replace(".png", "");
  data.md = JSON.parse(localStorage.getItem("medals"));
  data.tx = $("#abo").val();
      refreshMeds(data.md);
        $("#ptxmock").html(data.tx);
        var pdata = "/backdrops/" + data.bg + ".png";
        $("#userbp").attr("src", pdata)

})



function commit(op, data) {

  // setTimeout(function () {
  var postage = $.post("/commitProfile", {
    operation: op,
    data: data
  })
  console.log(postage.done())

  //==>
  postage.done(function (res) {
    console.log(res)

    swal({
      title: res.t,
      text: res.m,
      type: res.s,
      confirmButtonColor: res.c,
      confirmButtonText: res.b,
      closeOnConfirm: true,
      // showLoaderOnConfirm: true,
    }, function () {
        if (res.s != "success") return;
          unsaved = false;
      if (op=="medals")refreshMeds(data);
      if (op=="about")$("#ptxmock").html(data);
      if (op=="background"){
        var pdata = "/backdrops/"+data+".png";
        $("#userbp").attr("src", pdata)
         $("#bgov").attr("src", pdata)
        }
      if (op == "all") {

        refreshMeds(data.md);
        $("#ptxmock").html(data.tx);
        var pdata = "/backdrops/" + data.bg + ".png";
        $("#userbp").attr("src", pdata)
      }
      // $("#savebg").addAttr("disabled")
    })

    /*
    if (res.stats == "") {



    }
    if (res.stats == "") {

    }
    if (res.stats == "") {

    }
      */

  })
  //  }, 2000)

}



function isAuth() {

  $.post("/checklogin").fail(function () {
    window.location.replace("/auth");
  })
}



var correctCards = 0;
$(function () {

  var lastPlace;
  $("#cardPile").sortable({
    connectWith: ".sortable"
  })
  $("#cardPile li, .slotya li").disableSelection();
  $('.drag').draggable({
    connectWith: ".sortable",
    revert: "invalid",
    helper: 'clone',
    appendTo: 'body',
    zIndex: 99998
      //    , snap: "#slots ul li"
      //   , snapMode: "inner"
      //    , snapTolerance: 40

      ,
    start: function (event, ui) {
      $(this).hide()
      $(this).css({
        'cursor': 'grabbing'
      });
      lastPlace = $(this).parent();
    },
    stop: function (event, ui) {
      seeEquips()
      $(this).show()
      $(this).css({
        'cursor': 'grab'
      });
      lastPlace = $(this).parent();
    }
  });
  $('.dropB').droppable({
    connectWith: ".sortable",

    drop: function (event, ui) {
      $(this).removeClass("over")
      $(this).removeClass("dropa")

      $(lastPlace).removeClass("dropt")
      var dropped = ui.draggable;
      var droppedOn = this;
      $(dropped).detach().prependTo($(droppedOn));
      //$(dropped).detach().css({top: 0,left: 0}).prependTo($(droppedOn));
    }
  })


  $('.drop').droppable({
    hoverClass: "dropa",
    over: function (event, ui) {
      $(this).addClass("over")
    },
    out: function (event, ui) {
      $(this).removeClass("over")
    },
    drop: function (event, ui) {

      seeEquips()


      $(this).removeClass("over")
      $(lastPlace).removeClass("dropt")
      $(this).addClass("dropt")
      console.log("DROP  " + this)
      var dropped = ui.draggable;
      var droppedOn = this;
      if ($(droppedOn).children().length > 0) {
        $(droppedOn).children().detach().prependTo($(lastPlace));
      }
      $(dropped).detach().prependTo($(droppedOn));
      // .css({top: 0,left: 0})
    }
  });
});

function seeEquips() {
  var medals = []
  var slots = $("#equipped").children();

  for (i = 0; i < slots.length; i++) {
    try {
      medals.push([slots[i].children[0].dataset.medal,slots[i].children[0].dataset.medname ])

    } catch (e) {
      medals.push([0, 0])

    }
  }
  unsaved = true;
  $("#savemedals").removeAttr("disabled")
  localStorage.setItem("medals",JSON.stringify(medals));

}

function refreshMeds(medals){
  var data =""
  for (i=0; i<8;i++){
    data += '<img src="/medals/'+medals[i][0]+'.png">'
  }
  $("#medalmocks").html(data)

}



        var options = {
          useEasing: true,
          useGrouping: true,
          separator: '.',
          decimal: '.',
        };

      function count(){

        $.each($('.countup'), function (X) {
          var count = $(this).data("count"),
              numAnim = new CountUp(this, 0, count, 0,2,options);
            setTimeout(function(){

              numAnim.start();
            },X*100)
          });
      }
count()



