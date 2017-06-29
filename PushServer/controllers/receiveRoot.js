
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
    
    var body = req.body;
    body = isEmptyObject(body) ? req.query : body;
    var data = body.data;
    if(data){    	
        data = JSON.parse(data);
        for(var id in data){
            var arrOps = data[id];
            //一次推送多条信息
            socket.emitClient(id, 'push_message', arrOps);
        }
    }
    res.end('success');
};




/**
 * 接收信息
 * 请按需重新实现
 */
exports.pushData = function(req, res, next){
    //
    var body = req.body;
    body = isEmptyObject(body) ? req.query : body;
    var data = body.data;
    if(data){
	    socket.pushData(data);
    }else{
    	socket.pushData(body);
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
