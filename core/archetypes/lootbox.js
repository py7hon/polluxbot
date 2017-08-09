const fs = require("fs");
const gear = require("../gearbox.js");

const STAMPBASE = __dirname+"/../../resources/lists/stamps.json"
const BGBASE = __dirname+"/../../resources/lists/backgrounds.json"
const MEDALBASE = __dirname+"/../../resources/lists/medals.json"
const COLORBASE = __dirname+"/../../resources/lists/colors.json"
const FLAIRBASE = __dirname+"/../../resources/lists/flairs.json"




/*
0~5 -   Rubine
6~8 -   Rubine+
9~10 -  Background
11~12 - Medal
13~15 - Jades
16~17 - Jades
*/

/*
SIZES
======
1 - Tiny
3 - Medium
5 - Large
8 - Humongous
======

RARITY
======
1 - Common      1001 -  2500
2 - Uncommon    581  -  1350
3 - Rare        121  -  580
4 - Super Rare  11   -  120
5 - Ultra Rare  1    -  10
======
*/




     values =
     {
        C:1,
        U:2,
        R:3,
        SR:4,
        UR:5
        }


class Lootbox {
  constructor(rarity, size) {
    this.rarity = rarity ||"C";
    this.size = size || 3;
    this.content = []
    this.stakes = 0
    this.prizes = {
        medals: [],
        bgs: [],
        stamps:[],
        rubines:[],
        jades:[],
        items:[],
        colors:[]
    }
  }

    reroll(){
        this.stakes++
        this.prizes = {
        medals: [],
        bgs: [],
        stamps:[],
        rubines:[],
        jades:[],
        items:[],
        colors:[]
    }
        this.open()

    }


    getStamps(rarity) {
        let base = JSON.parse(fs.readFileSync(STAMPBASE))


        let prize = base[rarity][gear.randomize(0, base[rarity].length-1)]
        console.log("PRIZE:"+prize)
        this.prizes.stamps.push([rarity,prize])
    }

    getJades(rarity) {
        let rar= values[rarity]
        let rr = gear.randomize(8,10)

        this.prizes.jades.push([rarity,Math.floor(rar*(gear.randomize(80,100))*18/10)])
    }
    getBG(rarity) {
        let base = JSON.parse(fs.readFileSync(BGBASE))
        let prize = base[rarity][gear.randomize(0, base[rarity].length-1)]

        console.log("PRIZE:"+prize)
        this.prizes.bgs.push([rarity,prize])
    }
    getMedal(rarity) {
        let base = JSON.parse(fs.readFileSync(MEDALBASE))

        let prize = base[rarity][gear.randomize(0, base[rarity].length-1)]
        console.log("PRIZE:"+prize)
        this.prizes.medals.push([rarity,prize])
    }
    getRubines(rarity) {
        let rar= values[rarity]
        let rr = gear.randomize(80,100)
        console.log("RAR:  "+rar +" * "+rr)
        this.prizes.rubines.push([rarity,Math.floor(rar*(rr)/4)])
    }


    rarityCheck() {
        let a = Math.floor(Math.random() * (2500 - 1 + 1) + 1);
        switch (true) {
            case a <= 10:
                return "UR"
                break;
            case a <= 120:
                return "SR"
                break;
            case a <= 580:
                return "R"
                break;
            case a <= 1350:
                return "U"
                break;
            default:
                return "C"
                break;
        }
    }

    checkout(USER) {

        let p = this.prizes

        for (i=0;i<p.medals.length;++i)gear.paramAdd(USER,"medalInventory",p.medals[i]);
        for (i=0;i<p.stamps.length;++i)gear.paramAdd(USER,"mstampInventory",p.stamps[i]);
        for (i=0;i<p.bgs.length;++i)gear.paramAdd(USER,"bgInventory",p.bgs[i]);
        for (i=0;i<p.colors.length;++i)gear.paramAdd(USER,"colorInventory",p.colors[i]);
        for (i=0;i<p.items.length;++i)gear.paramAdd(USER,"INVENTORY",p.items[i]);
        for (i=0;i<p.jades.length;++i)gear.paramIncrement(USER,"rubines",p.rubines[i])
        for (i=0;i<p.rubines.length;++i) gear.paramIncrement(USER,"jades",p.jades[i])

    }



        getPrize(finder, rarity) {

        switch (true) {

            case finder <= 5:
                return this.getRubines(rarity)
                break;
            case finder <= 8:
                return this.getRubines(rarity)
                break;
            case finder <= 10:
                return this.getBG(rarity)
                break;
            case finder <= 12:
                return this.getMedal(rarity)
                break;
            case finder <= 15:
                return this.getJades(rarity)
                break;
            case finder <= 17:
                return this.getStamps(rarity)
                break;
            default:
                return this.getRubines(rarity)
                break;
        }

    }

        open() {
        return new Promise(async resolve => {


            let ff = gear.randomize(0, 17)
            this.getPrize(ff, this.rarity)

            for (i = 1; i < this.size; ++i) {
            let f = gear.randomize(0, 17)
                let r = this.rarityCheck()
                await this.getPrize(f, r);
            }
            return resolve(this.prizes)
        })
    }

}

module.exports={
    Lootbox: Lootbox
}
