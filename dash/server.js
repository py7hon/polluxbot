const express = require('express');
const config = require('./config.js');
const passport = require("passport");
const fs = require("fs");
const session = require("express-session");
const {
  Strategy
} = require("passport-discord");
const  CookieStrategy = require("passport-cookie");
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');


const gear = require("../core/gearbox.js")

const app = express();

const index = require('./routes/index');
const users = require('./routes/users');
const bgse = require('./routes/bgse');
const dash = require('./routes/dashboard');
  const defaults = require("../utils/defaults.js")



exports.init = (bot, DB, userDB) => {

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  var lepat = __dirname
  const path = require('path');
  var scopes = ['identify','guilds', 'guilds.join'];


  passport.use(new CookieStrategy(
  function(token, done) {
    User.findByToken({ token: token }, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  }
));



  passport.use(new Strategy({
    clientID: "271394014358405121",
    clientSecret: config.secret,
    callbackURL: "http://localhost:5000/callback",
    scope: scopes,
    passReqToCallback:true
  }, function (req, accessToken, refreshToken, profile, done) {

    process.nextTick(function () {

      return done(null, profile);
    });

  }));


     app.use(sassMiddleware({
      /* Options */
      src: path.join(__dirname, 'public/sass'),
      dest: path.join(__dirname, 'public/css'),
      debug: true,
      outputStyle: 'compressed',
      prefix:  '/css'
  }));


  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');




  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());

  app.use(sassMiddleware({
  src: path.join(__dirname, 'public/sass'),
  dest: path.join(__dirname, 'public/css'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
  , prefix:  '/css'
}));

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'public/images')));



  app.use('/bgs', bgse);

  /*
  function cookie(req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined)
  {
    //no: set a new cookie
    var rand=Math.random().toString();
    rand=rand.substring(2,rand.length);
    res.cookie('cookieName',cook, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  }
  else
  {
    // yes, cookie was already present
    console.log('cookie exists', cookie);
  }
  next(); // <-- important!
};

  */



  app.use('/users', bgse);
  app.use('/dasha', checkAuth, dash);
  //app.use('/', bgse);
  app.use(session({
    secret: 'adobo the cato',
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.get('/auth',  passport.authenticate('discord', {
    scope: scopes
  }), function (req, res) {});



  app.get('/callback',
    passport.authenticate('discord', {
      failureRedirect: '/'
    }),
    function (req, res) {

    console.log(req._fromParam)

        let backURL=req.header('Referer') || '/';


    try{
    res.render("callback",{redire:backURL})



    }catch(e){

    res.redirect('/')
    }
    } // auth success
  );

  app.get('/redir', async function (req, res) {
  res.render("callback")

  })
  app.get('/dash', checkAuth, async function (req, res, next) {


      console.log(req.user)


      //  if (!req.isAuthenticated()) return  res.send('not logged in :(');




      let USR = req.user
      let UDB = userDB.get(USR.id)

      if (UDB == undefined) {
        return "SHIT"
      }

      // app.engine("html", require("ejs").renderFile);
      //app.set("view engine", "html");
      res.render('dash', {
        pix: `https://cdn.discordapp.com/avatars/${USR.id}/${USR.avatar}.png`,
        name: `${USR.username}#${USR.discriminator}`,
        uname: USR.username,
        discriminator: USR.discriminator,
        rubys: UDB.modules.goodies,
        exp: UDB.modules.exp,
        level: UDB.modules.level,
        ptxt: UDB.modules.persotext,
        background: `images/backdrops/${UDB.modules.bgID}.png`,

      });
      // res.json(req.user);


    } // auth success
  );
  app.get('/bgg', function (req, res, next) {
    console.log(req.token)

     res.send(Object.keys(req))


    var user = userDB.get("88120564400553984").modules

    let updir = __dirname + "/"
    var rerities = ["UR", "SR", "R", "U", "C"]

    let imgbox = {}
    let imn = []
    let TAGS = JSON.parse(fs.readFileSync(updir + "public/js/grimoire.json", "utf8"))
    for (let i = 0; i < 5; ++i) {
      let RAR = rerities[i]
      imgbox[RAR] = []
      let path = "images/backdrops/"
      let files = fs.readdirSync(updir + "public/" + path + RAR)
      for (let y = 0; y < files.length; ++y) {

        imn = files[y].split(".")[0]
        var filepath = path + RAR + "/" + files[y]
        imgbox[RAR].push([filepath, imn])
      }
    }
    //console.log(imgbox)


    let USR = req.user
    console.log("\n\n\n\n\n\nUSR")
    console.log(USR)

    let userinfo = {

    }

    if (USR) {
      let UDB = userDB.get(USR.id)
      let bg = UDB.modules.bgID || "5zhr3HWlQB4OmyCBFyHbFuoIhxrZY6l6"
      userinfo = {
        pix: `https://cdn.discordapp.com/avatars/${USR.id}/${USR.avatar}.png`,
        name: `${USR.username}#${USR.discriminator}`,
        uname: USR.username,
        discriminator: USR.discriminator,
        rubys: UDB.modules.goodies,
        exp: UDB.modules.exp,
        level: UDB.modules.level,
        bg: `images/backdrops/${bg}.png`
      }
    }
    console.log("USINFO:")
    console.log(userinfo)

    res.render('bgs', {
      title: 'Pollux: Profile Backgrounds',
      imgboxe: imgbox,
      tags: TAGS,
      user: user,
      userinfo: userinfo
    });

  });


  app.get('/myGuilds',checkAuth, function (req, res) {


      let USR = req.user
      let UDB = userDB.get(USR.id)



    let guilds = USR.guilds
    console.log(guilds)
    let gs = guilds.length

    let ginfo = []

    for (i=0;i<gs;++i){
      console.log("sss")
      console.log(guilds[i].name)
      let g = guilds[i]
      let avi = "http://t5.rbxcdn.com/6f511c48046c3583b6ad0c1e65321c82"
      let perms = "noinfo"
      let ind = 10
      let hasPollux = false
      if(g.icon!=null) avi = `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png`

        if(bot.guilds.has(g.id))hasPollux = true;

      try{
        let thisG = bot.guilds.get(g.id)
        let mem = thisG.members.get(USR.id)

        if(thisG.members.has(bot.user.id))hasPollux = true;
        if(mem.hasPermission("ADMINISTRATOR",true)||mem.hasPermission("MANAGE_GUILD",true)){
          perms = "adm"
          ind = 1
        }else{
          perms = "commoner"
          ind = 3
        }
      }catch(e){
        perms="noinfo"
        ind="noinfo"
      }

      if(DB.get(g.id)!=undefined){
        let thisG = bot.guilds.get(g.id)
        let mem = thisG.members.get(USR.id)
        let thisG_DB = DB.get(g.id)

        if(thisG_DB.modules.MODROLE && mem.roles.has(thisG_DB.modules.MODROLE)){
          perms = "mod"
          ind = 2
        }

      }else{
        if(!bot.guilds.has(g.id))ind = 11
      }

      if (g.owner){
       ind = 0
        perms = "owner";
      }

      let nme = g.name
      ginfo.push({icon:avi,name:nme,perms:perms,present:hasPollux,ind:ind,id:g.id})

    }

    let usinfo = userBasics(USR)

    console.log(ginfo)
    console.log("\n\n\n\n")

    ginfo.sort(compare)


    function compare(a, b) {
      return a.ind-b.ind
    }

    console.log(ginfo)

    res.render('guilds', {
      title: 'Pollux: Your Guilds',
      guilds: ginfo,
      userinfo:usinfo

    });



  });


    app.get('/myGuilds/:id', checkAuth, function (req, res) {
   let dbpars =DB.get(req.params.id);
    if (dbpars == undefined){
      serverSetup(bot.guilds.get(req.params.id))
      dbpars = DB.get(req.params.id);
    }
      let g = req.user.guilds.filter(ge=>ge.id==req.params.id)[0]
      let gg = bot.guilds.get(req.params.id)
      dbpars.avi = `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png`
      dbpars.id= req.params.id;
       let USR = userBasics(req.user)
      res.render('myGuild',{
        title: "GUILD SETTINGS",
        server: dbpars,
        userinfo: USR,
        bot:bot,
        sv:gg
      })
  });



    app.get('/dashboard', checkAuth, function (req, res) {
   let dbpars =userDB.get(req.user.id);
    if (dbpars == undefined){
      userSetup(bot.users.get(req.user.id))
      dbpars = userDB.get(req.user.id);
    }
       let USR = userBasics(req.user)
      res.render('dash',{
        title: "Dashboard",
        user: dbpars,
        userinfo: USR,
        bot:bot
      })
  });


      app.get('/myGuilds/:id1/:id2', checkAuth, function (req, res) {
   let dbpars =DB.get(req.params.id1);
    if (dbpars == undefined){
      serverSetup(bot.guilds.get(req.params.id1))
      dbpars = DB.get(req.params.id1);
    }
        let chpars = dbpars.channels[req.params.id2]

        dbpars.id=req.params.id1
        chpars.id=req.params.id2
        chpars.modules.DROPSLY = bot.channels.get(req.params.id2).DROPSLY

      res.render('channel',{
        server: dbpars,
        channel: chpars,
        bot:bot,
        COMMANDS:getComms()
      })

  });



  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });








  app.listen(5000, function (err) {
    if (err) return console.log(err)
    console.log('Listening at http://localhost:5000/')
  })






  function checkAuth(req, res, next) {


    if (req.isAuthenticated()) return next();


    return res.redirect('/auth')

  }

  function userBasics(USR){
    try{
      return {
        pix: `https://cdn.discordapp.com/avatars/${USR.id}/${USR.avatar}.png`,
        name: `${USR.username}#${USR.discriminator}`,
        uname: USR.username,
        id: USR.id,
        discriminator: USR.discriminator
      }
    }catch(e){
      return undefined
    }
  }



app.get('/commands', async function(req, res, next) {

 let cm= cmsSetup(req)
  res.render('cmdList', { title: 'Command List', jason:cm.json,alias:cm.aliases, commands:cm.CMS, userinfo:userBasics(req.user) });
});

app.get('/info', async function(req, res, next) {
  let u=userBasics(req.user)
    res.render('info', { title: 'Information', userinfo:userBasics(req.user) });
})

app.post('/cmlist', async function(req, res, next) {

  try{

  let cm= cmsSetup(req)
  res.render('commandine', { title: 'Command List B', jason:cm.json,alias:cm.aliases, commands:cm.CMS, userinfo:userBasics(req.user) });
  }catch(e){
    res.send("ERROR")
  }
});

  function cmsSetup(req){
      let lang =  req.query.lang || "en";
  let json = JSON.parse(fs.readFileSync(__dirname+"/../utils/lang/"+lang+"/translation.json"))
  let aliases = JSON.parse(fs.readFileSync(__dirname+"/../core/aliases.json"))
  let CMS =  getComms();

    return {
      lang:lang,
json:json,
aliases:aliases,
CMS:CMS
    }

  }

  app.post('/buy', checkAuth, function (req, res) {


try{



    let usr = bot.users.get(req.user.id)
    let monpass = gear.checkGoods(req.body.required, usr)




    let responsePack = {
      goods: gear.userDB.get(usr.id).modules.goodies,
      stats: false
    }

    let bgInv = gear.userDB.get(usr.id).modules.bgInventory
    if(bgInv==undefined)bgInv=["5zhr3HWlQB4OmyCBFyHbFuoIhxrZY6l6"];
    if (bgInv.includes(req.body.name) || req.body.name == "5zhr3HWlQB4OmyCBFyHbFuoIhxrZY6l6") {
      return res.send({
        goods: 0,
        stats: "POSSESS"
      })
    } else if (monpass) {
      gear.paramDefine(usr, "bgID", req.body.name)
      responsePack.stats = "OK"
      res.send(responsePack)

    } else {
      responsePack.stats = "NOFUNDS"
      res.send(responsePack)

    }

  }catch(e){
    console.log(e)
  };
  });


    app.post('/paramtoggle/:id1/:id2/:id3', checkAuth, function (req, res) {
      try{
        let l1 = bot.channels.get(req.params.id1)
      let l2 = req.params.id2

      let l3;

        req.params.id3 == "true" ? l3=true : l3=false
      gear.paramDefine(l1,l2,l3)



    res.sendStatus(200)
      }catch(e){
        console.log(e)
        res.sendStatus(500)
      }
  });
    app.post('/paramaddrem/:id1/:id2/:id3/:id5', checkAuth, function (req, res) {
      try{
        let l1 = bot.channels.get(req.params.id1)
        let l2 = req.params.id2
        let l3 = req.params.id3
        let l5 = req.params.id5



      if(l5=="add")gear.paramAdd(l1,l2,l3);
      else if(l5=="remove")gear.paramRemove(l1,l2,l3);
      else res.sendStatus(500);




    res.sendStatus(200)
      }catch(e){
        console.log(e)
        res.sendStatus(500)
      }
  });


   app.get('/', function (req, res) {

     let USR = req.user
let usinfo = userBasics(USR) || undefined;

    res.render("cpv",{
  userinfo:usinfo

    })

  });



  app.post('/checklogin', checkAuth, function (req, res) {
    res.sendStatus(200)

  });









  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    res.render('404');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  module.exports = app





          function serverSetup(guild) {


    if (!DB.get(guild.id)||DB.get(guild.id)==undefined) {

        console.log(('          --- - - - - = = = = = = Setting Up Guild:'.yellow + guild.name).bgBlue)

        DB.set(guild.id, defaults.gdfal)

        var gg = DB.get(guild.id);
        gg.name = guild.name;
        gg.ID = guild.id;
        if (guild.region === 'brazil') gg.modules.LANGUAGE = "dev";
        DB.set(guild.id, gg);

        guild.channels.forEach(element => {
            if (element.type != 'voice') {
                console.log('Setting Up Channel:'.white + element.name)

                var GGD = DB.get(guild.id)
                GGD.channels[element.id] = defaults.cdfal
                DB.set(guild.id, GGD)
                var gg = DB.get(guild.id)
                gg.channels[element.id].name = element.name
                DB.set(guild.id, gg)

            }
        });
    } else {

        gear.normaliseGUILD(guild,DB)
    }

}
        function channelSetup(element, guild) {

    console.log('Setting Up Channel:'.white + element.name + " from " + guild.name)
    //  DB.get(guild.id).channels[element.id] =
    //element.mods = DB.get(guild.id).channels[element.id].modules;
    var GGD = DB.get(guild.id)
    GGD.channels[element.id] = defaults.cdfal
    DB.set(guild.id, GGD)
    var gg = DB.get(guild.id)
    gg.channels[element.id].name = element.name
    gg.channels[element.id].ID = element.id
    DB.set(guild.id, gg)

} //DB
        function userSetup(user) {

    if (!userDB.get(user.id)) {
        console.log('Setting Up Member:' + user.username)

        userDB.set(user.id, defaults.udefal)

        var uu = userDB.get(user.id)
        uu.name = user.username
        uu.ID = user.id
        userDB.set(user.id, uu)

    } else {
        gear.normaliseUSER(user, userDB, DB)
    }
} //DB

}

function getComms() {
  let path = __dirname + "/../core"
  let files = fs.readdirSync(path + "/modules")
  let COMMANDS = {}
      COMMANDS.list=[]
      COMMANDS.tree={}

  for (i = 0; i < files.length; i++) {
    let filedir = path + "/modules/" + files[i]

    if (files[i] != "dev" &&
        files[i] != "experimental" &&
        files[i] != "owner" &&
        files[i] != "infra" &&
        files[i] != "eastereggs"
    ){

      let morefiles = fs.readdirSync(filedir)

      for (y = 0; y < morefiles.length; y++) {

        if (morefiles[y] != "imgreactor.js") {

          COMMANDS.list.push(morefiles[y].replace(".js", ""))
          if(!COMMANDS.tree[files[i]])COMMANDS.tree[files[i]]=[];
          COMMANDS.tree[files[i]].push(morefiles[y].replace(".js", ""))
        }

      }
    }

  }

  return COMMANDS
}



/*
form(method='POST' action='/bgga')
    div.form-group
      label(for='name') Genre:
      input#name.form-control(type='text', placeholder='Fantasy, Poetry etc.' name='name' value=(undefined===genre ? '' : genre.name))
      input#thing.form-control(type='text', placeholder='Fantasy, Poetry etc.' name='thing' value=(undefined===genre ? '' : genre.name))
    button.button.is-primary(type='submit') Submit
    */
