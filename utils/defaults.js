

module.exports = {

    gdfal: {
        name: "",
        ID: "",
        modules: {
            GREET: {
                hi: false,
                joinText: "Welcome to the Server %username%!",
                greetChan: ""
            },
            FWELL: {
                hi: false,
                joinText: "%username% has left us!",
                greetChan: ""
            },
            NSFW: true,
            GOODIES: true,
            LEVELS: true,
            LVUP: true,
            DROPS: false,
            GOODMOJI: "<:rubine:343314186765336576> ",
            GOODNAME: 'Rubine',
            ANNOUNCE: false,
            PREFIX: "+",
            MODROLE: {},
            LANGUAGE: 'en',
            DISABLED: ['cog'],
            AUTOROLES: [],
            statistics: {
                commandsUsed: {},
                rubineHistory: 0
            }

        },

        channels: {}
    },

    //CHANS
    cdfal: {
        name: "",
        ID: "",
        modules: {
            DROPSLY: 0,

            NSFW: false,
            GOODIES: true,
            LEVELS: true,
            LVUP: true,
            DROPS: true,
            DISABLED: ['cog']
        }
    },

    //USRS
    udefal: {
        name: "",
        ID: "",
        modules: {
            PERMS: 3,
            level: 0,
            exp: 0,
            goodies: 0,
            coins: 0,
            medals: [0,0,0,0,0,0,0,0],
            expenses: {
                putaria: 0,
                jogatina: 0,
                drops: 0,
                trade: 0
            },
            earnings: {
                putaria: 0,
                jogatina: 0,
                drops: 0,
                trade: 0
            },
            dyStreak: 5,
            daily: 1486595162497,
            persotext: "",
            rep:0,
            bgID:"5zhr3HWlQB4OmyCBFyHbFuoIhxrZY6l6",
            skin: 'default',
            skinsAvailable: ['default'],

            build: {
                STR: 10,
                DEX: 10,
                CON: 10,
                INT: 10,
                WIS: 10,
                CHA: 10,
                weaponA: "none",
                weaponB: "none",
                shield: "none",
                armor: "none",
                invent: [],
                skills: [],
                HP: 100,
                MP: 50
            },
            fun: {
                waifu: undefined,
                shiprate: {}
            },
            statistics: {
                commandsUsed: {}

            }
        }
    }

}
