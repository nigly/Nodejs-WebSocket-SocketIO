var receive = require("../controllers/receiveRoot");

module.exports = function(app, isDebug){

    app.all('/pushMessage', receive.pushMessage);
    
    app.all('/pushData', receive.pushData);

};
