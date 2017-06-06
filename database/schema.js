 module.exports = {
     users: `(
id TEXT             ,
name                TEXT,
exp                 INTEGER,
level               INTEGER,
goodies             INTEGER,
coins               INTEGER,
medals              TEXT,
expenses_putaria    INTEGER,
expenses_jogatina   INTEGER,
expenses_drops      INTEGER,
expenses_trade      INTEGER,
earnings_putaria    INTEGER,
earnings_jogatina   INTEGER,
earnings_drops      INTEGER,
earnings_trade      INTEGER,
dyStreak            INTEGER,
daily               INTEGER,
persotext           TEXT,
skin                TEXT,
skinsAvailable      TEXT
)`,

     medals: `(
userid TEXT ,
medal_1 INTEGER,
medal_2 INTEGER,
medal_3 INTEGER,
medal_4 INTEGER,
medal_5 INTEGER
)`,

     skins: `(
userid TEXT ,
default INTEGER,
red     INTEGER,
skin_2 INTEGER,
skin_3 INTEGER,
skin_4 INTEGER,
skin_5 INTEGER
)`,

     build: `(
userid TEXT ,
STR INTEGER,
 DEX        INTEGER,
 CON        INTEGER,
 INT        INTEGER,
 WIS        INTEGER,
 CHA        INTEGER,
 HP         INTEGER,
 MP         INTEGER
)`,


     servers: `(
id TEXT ,
name        TEXT,
NSFW        INTEGER,
GOODIES     INTEGER,
LEVELS      INTEGER,
LVUP        INTEGER,
DROPS       INTEGER,
GOODMOJI    TEXT,
GOODNAME    TEXT,
ANNOUNCE    INTEGER,
PREFIX      TEXT,
MODROLE     TEXT,
LANGUAGE    TEXT
)`,

     channels: `(
id          TEXT ,
DROPSLY     INTEGER,
NSFW        INTEGER,
GOODIES     INTEGER,
LEVELS      INTEGER,
LVUP        INTEGER,
DROPS       INTEGER
    )`,

     modules: `(
servID  TEXT,
chanID  TEXT
    )`


 }
