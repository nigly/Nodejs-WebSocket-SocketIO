$(function () {
    var isConnected = false;
    var isLogined = false;
    var socket = io.connect('192.168.5.100:3000');
    var receiveContent = $('#receiveContent');

    //收到server的连接确认
  //收到server的连接确认
    socket.on('connect',function(){
        $('#status').html('链接成功.......');
        isConnected = true;
        socket.emit('login', {
            id: '0',
            name: 'void'
        });
        console && console.log('connected is ok');
    });

    socket.on('message',function(param){
        console.log(param);
        receiveContent.html(param.message);
    });

    $('#btn_login').click(function(){
        var userId = $('#userId').val();
        var userName = $('#userName').val();
        
        console.log(userId + '    ' + userName)
        console.log('isConnected    ' + isConnected)
        
        if(!isConnected) return;
        

        if(isLogined){
            alert('已经登录');
            return false;
        }

        if(userId == '' || userName == ''){
            alert('请填写用户id及姓名');
            return false;
        }

        isLogined = true;
        socket.emit('login', {
            id: userId,
            name: userName
        });
    });

    $('#btn_send').click(function(){
    	
    	console.log(909090)
        $.ajax({
            url: 'http://192.168.5.100:3000/pushData',
            type: 'post',
            data: {key:'value'}
        });
    });
});
