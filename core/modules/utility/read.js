var i2b = require("imageurl-base64");
var gear = require("../../gearbox.js");
const Vision = require('@google-cloud/vision')

var cmd = 'read';
var init = async function (message, userDB, DB) {

    let args = message.content.split(" ").slice(1)[0]




    i2b(args, async function (err, img) {
        if (err){
            let nwurl = await gear.getImg(message)
             if (!nwurl) return message.channel.send("INVALID IMAGE URL");
            return i2b(nwurl,(err,b64)=> vere(b64.base64,message))
        }
        vere(img.base64,message)
    });
}

function vere(base64,message){
        const vision = Vision({
            projectId: 'grape-spaceship-123',
            keyFilename: './Pollux-b0f6c7eb29f4.json'
        });
        vision.textDetection(
                {content:base64}
            )
            .then(async(results) => {
                console.log(results)
                const detections = await results[0].fullTextAnnotation.text
                message.channel.send(detections)
            })
            .catch((err) => {
                message.channel.send("Error")
                console.error('ERROR:', err);
            });
    }

module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'util'
};
