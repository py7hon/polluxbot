var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'dbx';

var init = function (message,userDB,DB) {




 module.exports = {
    pub:false,
    cmd: cmd,
    perms: 1,
    init: init,
    cat: 'bot'
};







    function dbInsert(table,target,item,object){

    }

    function dbUpdate(table,target,item,object){
         sql.run(`UPDATE ${table} SET ${item} = ${row.points + 1} WHERE ${target} = ${object}`);
    }



    /*

      sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
    if (!row) {
      sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [message.author.id, 1, 0]);
    } else {

      let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));

      if (curLevel > row.level) {
        row.level = curLevel;
        sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
        message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
      }

      sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
    }

  }).catch(() => {
    console.error;
    sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)').then(() => {
      sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [message.author.id, 1, 0]);
    });
  });

  */
