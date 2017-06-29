var clients = [];

var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({ port: 8181 });

wss.on('connection', function (ws) {
    console.log('client connect...');
	
	//监听消息发送事件
    ws.on('message', function (message) {
        console.log("我接收到了 ---------->>>    "+message);
    });
	
    //客户端关闭
    ws.on('close', function () {
    	console.log('client disconnect...');
    });
    
});





var Server = require('socket.io');
var _ = require("lodash");
var arrClient = [];
var io = null;

exports.init = function(server, isDebug){
    io = new Server().listen(server);

    //设置可以传输数据类型
    io.set('transports', [
        'websocket',
        'flashsocket',
        'htmlfile',
        'polling'
    ]);


    io.on('connection', function (socket) {
    	
        var client = {
            socket  : socket,
            socketId: socket.id
        };

        //进入链接
        socket.on('login', function(objUser){
            console.log('user : ' + objUser.name + ' login ...');
            client.user = objUser;
            client.userId = objUser.id;

            arrClient.push(client);
        });
        //

        //监听退出事件
        socket.on('disconnect', function () {
            //去除掉线对象
            _.remove(arrClient, function(obj) {
                return obj.socketId === socket.id;
            });

            if(client.user){
                console.log('user : 1' + client.user.name + ' disconnect ...');
            }else{
                console.log('user : 2 undefined disconnect ...');
            }
        });
    });
};

/**
 * 对对应客户发送信息
 * @param id
 * @param event
 * @param param
 */
exports.emitClient = function(id, event, param){
    var clients = _.where(arrClient, { 'userId': id });
    //console.log(clients);
    if(!clients || clients.length == 0){
        console.log('没有找到 id : ' + id + ' 的人，推送失败！');
        return false;
    }
    clients.forEach(function(client){
        var socket = client.socket;
        if(io && socket){
            console.log('in send to '+client.user.name+' ....');
            console.log(param);
            socket.emit(event, param);
        }
    });
};


/**
 * 向客户端发送信息
 * @param param
 */
exports.pushData = function(param){
    var clients = wss.clients
    
    if(!clients || clients.length == 0){
        //console.log('没有需要推送的客户端！');
        return false;
    }
    
    clients.forEach(function(client){
    	client.send(param)
    });
    
    console.log("已把【" + param + "】推送了(" + clients.length + ")人")
};
