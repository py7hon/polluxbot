const fs = require("fs");
const gear = require('../../gearbox.js')
const paths = require("../../paths.js");
const PixelCore = require('canvasutil').PixelCore
const pixelProcessor = new PixelCore();
const Pixly = require("pixel-util");
const Jimp = require("jimp");
const Canvas = require("canvas");
const opentype = require("opentype.js");
const drawText = require("node-canvas-text").default;
const locale = require('../../../utils/multilang_b');
const mm = locale.getT();

const cmd = 'shop';
const init = async function (message, userDB, DB) {
let loading = false;
    try {

        const Server = message.guild;
        const Channel = message.channel;
        const Author = message.author;
        let addRea = false;
        try {
            const Member = Server.member(Author);
            addRea = Server.member(message.botUser.user)
                .permissionsIn(message.channel)
                .hasPermission("ADD_REACTIONS")
        } catch (e) {}
        const LANG = message.lang;


        const userData = userDB.get(Author.id).modules

        const v = {
            welcome: "**Welcome to the Medal Shop!**",
            loading: ":hourglass:",
            shopTimeout: "timeout",
            checkoutConfirm: "Confirm",
            checkoutCancel: "Cancel",
            return: "return",
            cancel: "cancel",
            confirm: "confirm",
            noReact: "Choose a Medal to buy below. Type the Number to select, or `<` and `>` to switch pages",
            withReact: "Choose a Medal to buy below. Type the Number to select. Click ⬅ and ➡ to switch pages"

        }

        let inst = "";
        addRea ? inst = v.withReact : inst = v.noReact;

        let bucket = [],
            pages = [],
            globalPeeji = 0;

        if (!userData.medalInventory) {
            gear.paramDefine(Author, "medalInventory", [])
        }
        const inventory = userData.medalInventory
        let il = inventory.length

        if(!userData.medals){
            gear.paramDefine(Author,"medals",[0,0,0,0,0,0,0,0])
        }
        let equippedMedals = userData.medals
        const m = JSON.parse(fs.readFileSync(paths.LISTS + "shop.json", 'utf8'))
        const menu = m.menu

        const okMoji = gear.emoji("yep")
        const nopeMoji = gear.emoji("nope")

        //Pages Division
        let ml = menu.length
        for (i = 0; i < ml; i += 18) {
            pages.push(menu.slice(i, i + 18))
        }

        // -> CANVAS

        //-> FONTS
        Canvas.registerFont(paths.FONTS + "/visitor1.ttf", {
            family: 'Visitor'
        });
        Canvas.registerFont(paths.FONTS + "/product-sans-bold.ttf", {
            family: 'Product',
            weigth: "bold"
        });
        Canvas.registerFont(paths.FONTS + "/product-sans-reg.ttf", {
            family: 'Product',
            weigth: "normal"
        });
        //
        const mainframe = new Canvas.Image;
        mainframe.src = await Pixly.createBuffer(paths.BUILD + "store/mainframe.png").then(b => {
            return b;
        });
        const planks = new Canvas.Image;
        planks.src = await Pixly.createBuffer(paths.MEDALS + "planks.png").then(b => {
            return b;
        });
        const propic = new Canvas.Image;
        const avi = Author.avatarURL.replace("2048", "32") || Author.defaultAvatarURL
        propic.src = await Pixly.createBuffer(avi).then(b => {
            return b;
        });

        // --- --- ---    --- --- ---    --- --- ---    --- --- ---    --- --- ---    --- --- ---



        /* /-------------------------------------------------------------------/**/


        Channel.send(v.loading)
            .then(async wc => {
                sendShop(await renderPage(0))
                    .then(r => {
                        wc.edit(v.welcome).then(m => m.delete(10000))
                        reactNresponse(r, 0)
                    })
            })


        /**/
        /**/
        /* /-------------------------------------------------------------------/**/


        async function reactNresponse(msg, index) {
            pageWatcher(msg, index)
            optionWatcher(msg, index)
        };

        async function optionWatcher(shopMsg, index) {
            const responses = await Channel.awaitMessages(res =>
                res.author.id === Author.id && (
                    (/^\d+$/.test(res.content) && (
                        parseInt(res.content) >= 1 ||
                        parseInt(res.content) <= 18
                    ))
                ), {
                    max: 1,
                    time: 30000
                }
            ).catch(e => console.error(e));
            if (!shopMsg) return;
            if (responses.size === 0) {
                shopMsg.delete().then(x => Channel.send(v.shopTimeout).catch(e => console.error(e))).catch(e => console.error(e))
                return empty()
            } else {

                let rea = parseInt(responses.first().content) - 1;


                            let owned = false;
                   let emojifile = pages[globalPeeji][rea][1]

                        for (a = 0; a < il; a++) {

                        var o = inventory[a].includes(emojifile)
                        if (o == true) {
                            owned = true
                            break;
                        }
                    }

                if (owned){
                    Channel.send("repeated").then(m => m.delete(5000)).catch(e => console.error(e));
                    responses.first().delete().catch(e => console.error(e));
                    return optionWatcher(shopMsg, index);
                };
                if (!gear.checkGoods(pages[globalPeeji][rea][2], Author)) {
                    Channel.send("no $").then(m => m.delete(5000)).catch(e => console.error(e));
                    responses.first().delete().catch(e => console.error(e));
                    return optionWatcher(shopMsg, index);
                };


                responses.first().delete().catch(e => console.error(e));
                await empty();
                await Channel.send({
                    files: [paths.MEDALS + pages[globalPeeji][rea][1] + ".png"]
                }).then(icon => bucket.push(icon))


                Channel.send(`**${pages[globalPeeji][rea][0]}**
${pages[globalPeeji][rea][2]}${gear.emoji("rubine")}
`).then(async m => {
                    bucket.push(m)
                    shopMsg.delete().catch(e => console.log("shopmes"))
                    await m.react("🆗")
                        .then(r => m.react("❌")
                            .then(r => m.react("↩")
                                .then(rr => processCheckout("react", m))
                            )
                        )
                        .catch(e => Channel.send("`ok` "+okMoji+" : : `c` "+nopeMoji)
                            .then(m2 => {
                                processCheckout("respond", m2)
                            })
                        )
                })

            }
        };
        async function pageWatcher(shopMsg, index) {
  console.log("\n-------------\n pageWATCH \n--------------\n")
            globalPeeji = index
            if (!shopMsg) return;

                 let respond;
            if (!addRea) {
                if (index === 0 && pages.length > 1) {
                    console.log("First Page with Next")
                     respond = await Channel.awaitMessages(res =>
                        shopMsg &&
                        res.author.id === Author.id &&
                        res.content === ">", {
                           max: 1
                        }
                    ).catch(e => console.error(e));

                    console.log("1B")
                } else if (index = pages.length - 1) {
                    console.log("Last Page")
                    console.log(2)
                     respond = await Channel.awaitMessages(res =>
                        shopMsg &&
                        res.author.id === Author.id &&
                        res.content === "<", {
                            max: 1
                        }
                    ).catch(e => console.error(e));

                } else {
                    console.log("Sideways")
                    console.log(3)
                     respond = await Channel.awaitMessages(res =>
                        shopMsg &&
                        res.author.id === Author.id &&
                        (
                            res.content === "<" ||
                            res.content === ">"
                        ), {
                            max: 1
                        }
                    ).catch(e => console.error(e));
                }
                if (respond.size === 0) {
                    return
                } else {
                    if (!shopMsg) return;
                    console.log("X")
                    let res = respond.first().content;
                  respond.first().delete().catch(e=>{"OK"})

                    if (res === ">") return shift(index, shopMsg, 1);
                    if (res === "<") return shift(index, shopMsg, -1);
                }

            } else {

                if (index === 0 && pages.length > 1) {
                    shopMsg.react("➡")
                } else if (index = pages.length - 1) {
                    shopMsg.react("⬅")
                } else {
                    shopMsg.react("⬅").then(r => shopMsg.react("➡"))
                }

                if (!shopMsg) return;

                const responses = await shopMsg.awaitReactions(react =>
                    react.users.has(Author.id), {
                        maxEmojis: 1
                    }
                ).catch(e => console.error(e));
                if (responses.size === 0) {
                    empty()
                } else {

                    let rea = responses.first().emoji

                    if (rea == "➡") {
                        return shift(index, shopMsg, 1)
                    }
                    if (rea == "⬅") {
                        return shift(index, shopMsg, -1)
                    }
                }
            }
        };

        async function renderPage(index) {
            const canvas = new Canvas(400, 300);
            const base = canvas.getContext('2d');
            index = index || 0;

            let currentPage = pages[index]

            let images = [];
            let cpl = currentPage.length
            for (i = 0; i < cpl; i++) {
                let minipath = paths.MEDALS + currentPage[i][1] + ".png"
                if (!currentPage[i][1]) {

                    minipath = paths.MEDALS + "0.png"
                }
                let neo = await new Canvas.Image;
                neo.src = await Pixly.createBuffer(minipath).then(b => {
                    return b;
                });
                await images.push(neo)
            }

            await base.drawImage(mainframe, 0, 0);

            let star_x = 132
            let star_y = 99

            let iter = 0;
            for (y = 0; y < 8; y++) {
                for (x = 0; x < 6; x++) {
                    if (!images[iter]) break;
                    let emojifile = currentPage[iter][1]
                    let price = gear.miliarize(currentPage[iter][2])

                    var owned = false;
                    for (a = 0; a < il; a++) {

                        var o = inventory[a].includes(emojifile)
                        if (o == true) {
                            owned = true
                            break;
                        }
                    }

                    if (owned) {
                        price = "--- "
                        base.antialias = 'bilinear';
                        base.patternQuality = 'best';
                        await base.drawImage(images[iter], star_x + x * 43, star_y + y * 65);
                        await base.drawImage(planks, star_x + x * 43 - 1, star_y + y * 65 - 1);
                    } else {
                        await base.drawImage(images[iter], star_x + x * 43, star_y + y * 65);
                    }

                    base.font = '10px Visitor';
                    base.fillStyle = '#2b2b2b';
                    let tw = base.measureText(price).width
                    await base.fillText(price, star_x + x * 43 + 27 - tw, star_y + y * 65 + 38);
                    await base.drawImage(propic, 23, 238, 30, 30);
                    iter++

                }
            }

            let titleFont = opentype.loadSync(paths.FONTS + "/product-sans-bold.ttf");
            let cashText = gear.miliarize(userData.goodies, true);
            let USR = Author.username
            let TAG = Author.tag
            if (Server) {
                let DPL = Server.member(Author).displayName
            } else {
                let DPL = Author.username
            }
            base.font = '14px Product,Sans';


         let tagsx = await gear.tag(base, TAG)

         let l=equippedMedals.length
         let medals=0;
         for(i=0;i<l;i++){
             if(equippedMedals[i]!==0 && equippedMedals[i]!==undefined) medals++;
         }

         let medalcount = await gear.tag(base,medals+" /",'24px Product,Sans')
         let invcount = await gear.tag(base,inventory.length,'24px Product,Sans')

                //----

            let wid;
            tagsx.width > 100 ? wid = 100 : wid = tagsx.width;
            await base.drawImage(tagsx.item, 20, 208, wid, tagsx.height);
            await base.drawImage(medalcount.item, 60, 240, medalcount.width, medalcount.height);
            await base.drawImage(invcount.item, 90, 240, invcount.width, invcount.height);

            //BOUNDS
            let headerRect = {
                x: 246,
                y: 60,
                width: 100,
                height: 25
            }
            let drawRect = false;

            drawText(base, cashText, titleFont, headerRect, {
                minSize: 5,
                maxSize: 25,
                vAlign: 'middle',
                hAlign: 'right',
                fitMethod: 'box',
                textFillStyle: "#2b2b2b",
                drawRect: drawRect
            });
            await canvas
            return canvas

        };
        async function sendShop(canvas, editMessage) {

            if(loading==true){
                return console.log("sendSHOP REJECTED".red)
            }
            console.log("\n-------------\n sendSHOP \n--------------")



            return new Promise(async resolve => {
                loading = true
            console.log("sendshop in promise")
                await Channel.send(inst, {
                    files: [{
                        attachment: await canvas.toBuffer(),
                        name: "shop.png"
                    }]
                }).then(m => {
            console.log("processing then")
                    //m.delete(30000).then(d=> resolve(false))
                    if (editMessage) editMessage.delete().catch(e => console.error(e));
            console.log("return resolver")
                    loading = false
                    return resolve(m)
                })
            });
        };
        async function processCheckout(action, m1) {

            bucket.push(m1)

            if (action === "react") {
                const responses = await m1.awaitReactions(react =>
                    react.users.has(Author.id), {
                        maxEmojis: 1,
                        time: 30000

                    }
                ).catch(e => console.error(e));
                if (responses.size === 0) {
                    Channel.send(v.checkoutTimeout).catch(e => console.error(e))
                    empty()
                } else {

                    let rea = responses.first().emoji


                    if (rea == "🆗") {
                              await empty();
                        Channel.send(v.checkoutConfirm).catch(e => console.error(e))
                    }
                    if (rea == "❌") {
                              await empty();
                        Channel.send(v.checkoutCancel).catch(e => console.error(e))
                    }
                    if (rea == "↩") {
                              await empty();
                        return await sendShop(await renderPage(globalPeeji)).then(r => reactNresponse(r, globalPeeji));
                    }

                }

            } else if (action === "respond") {
                const responses = await Channel.awaitMessages(res =>
                    res.author.id === Author.id && (
                        res.content.includes("confirm") ||
                        res.content.includes("cancel") ||
                        res.content == "c" ||
                        res.content == "ok" ||
                        res.content == v.return ||
                        res.content == v.confirm ||
                        res.content == v.cancel
                    ), {
                        max: 1,
                        time: 30000
                    }
                ).catch(e => console.error(e));
                if (responses.size === 0) {
                    Channel.send(v.checkoutTimeout).catch(e => console.error(e))
                } else {
                    let res = responses.first().content

                    if (res === "ok" || res.startsWith("co") || res === v.confirm) {
                    await empty();
                        Channel.send(v.checkoutConfirm).catch(e => console.error(e))
                    }
                    if (res === "c" || res.startsWith("ca") || res === v.cancel) {
                    await empty();
                        Channel.send(v.checkoutCancel).catch(e => console.error(e))
                    }

                }

            }

        };

        async function shift(i, m, inc) {
            let page = await renderPage(i + inc)
            return await sendShop(page, m).then(r => {
                bucket.push(r)
                pageWatcher(r, i + inc)
            });
        }
        async function empty() {
            return new Promise(async resolve => {
                let bl = bucket.length
                for (i = 0; i < bl; i++) {
                    await bucket[i].delete().catch(e => {
                        return
                    });

                }
                return resolve(true)
            })
        };


    } catch (e) {
        console.log(e)
    }
} // MODULE END


module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
