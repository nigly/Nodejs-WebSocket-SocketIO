var express = require('express');
var app = express();
var server = require('http').Server(app);

//获取命令行参数
var arguments = process.argv.splice(2);
var isDebug = arguments && arguments[0] && arguments[0] === 'debug';

console.log('isDebug : ' + isDebug);

//配置中间件，初始化验证
require('./config/express')(app, isDebug);

//路由、外部调用接口定义
require('./config/routes')(app, isDebug);

//初始化socket.io
require('./config/socket-io').init(server, isDebug);



server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
