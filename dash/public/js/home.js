$(document).ready(function () {

  $(".sadasfdsaf").click(function (e) {
e.preventDefault()


    $.get(this.href, function (data) {
      processAjaxData(data, this.href)
      $("#bods").html(data);
    });
  })
  $(document).keydown(function (e) {
    if (e.keyCode == 8) {
      e.preventDefault();
      var oldURL = document.referrer;
      alert(oldURL);

    }
  });

  window.onpopstate = function (e) {
    if (e.state) {
      $("body").html = e.state.html;
      document.title = e.state.pageTitle;
    }
  };

  function processAjaxData(response, urlPath) {


    console.log(response.html)
    console.log(urlPath)
    $("#bods").html = response.html;
    document.title = response.pageTitle;
    window.history.pushState({
      "html": response.html,
      "pageTitle": response.pageTitle
    }, "", urlPath);
  }



  var i = 0

  var texts = [
 "I can do this shit here",
 "And also this other shit here",
 "Sometimes i do no shit",
 "And even many shit",
 "shit shit shit",
 "Uber lenghted shit text saying I can do revolutionary shit just to show that this text is lengthy as shit"

 ]

  setInterval(function () {
    ++i
    if (i == texts.length) i = 0;
    $("#marq").html(texts[i])
  }, 4800)



  discordWidget.init({
    serverId: '277391723322408960',
    join: true, //allow the user to join with a button. Can be true of false
    alphabetical: false, //sort the channels in alphabetical order. Can be true or false as well?
    hideChannels: ['Channel Name 1', 'Channel Name 2'], //Select channels to hide, write the channel names in the brackets
    showAllUsers: true, //show all online users, even if not in voice call. Can be true or false
    allUsersDefaultState: true, //set if the user section is expanded or not by default. Can be true or false
    showNick: true //Set if the user's nickname is shown. Can be true or false
  });
  discordWidget.render();


  // return
  /// setTimeout(function(){

  // $.get( "/comprev", function( data ) {



  // $( "body" ).html( data );
  //  });

  //  },3000)



});

