var _port = 3000;//port
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var path = require('path');

module.exports = function(app, isDebug){
    //express基本配置
    app.set('port', process.env.PORT || _port);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    if(isDebug){
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, '../', 'public')));
    }
};

