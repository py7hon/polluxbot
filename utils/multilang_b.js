var reroute;
var setT = (t) => {
    reroute = t;
};
var getT = () => {
    return reroute;
};
 module.exports = {
    setT: setT
    , getT: getT
};
