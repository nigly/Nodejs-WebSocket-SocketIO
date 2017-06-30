
var express = require('express');
var router = express.Router();
var socket = require("../config/socket-io");
var isEmptyObject = function(obj){
    for(var p in obj){
        if(obj[p]){
            return false;
        }
    }
    return true;
};
/**
 * 接收信息
 */
exports.pushMessage = function(req, res, next){
    //req.body为空？？
    var body = req.body;
    body = isEmptyObject(body) ? req.query : body;
    var data = body.data;
    if(data){    	
        data = JSON.parse(data);
        for(var id in data){
            /*var arrOps = body[id];
            arrOps.forEach(function(ops){
                socket.emitClient(id, 'push_message', ops);
            });*/
            var arrOps = data[id];
            //一次推送多条信息
            socket.emitClient(id, 'push_message', arrOps);
        }
    }
    res.end('success');
};




/**
 * 接收信息
 */
exports.pushData = function(req, res, next){
    //req.body为空？？
    var body = req.body;
    
    body = isEmptyObject(body) ? req.query : body;
    var data = body.data;
    if(data){
	    socket.pushData(data);
    }else{
    	socket.pushData("Incorrect number format!");
    	console.log("Incorrect number format!");
    	console.log(body)
    }
    res.end('success');
};

/*

data: {
    [id] : [
        {
            voice: 1,
            menu_id: '',
            count: 0,
            message: '',
            url: ''
        }
    ]
}
*/
