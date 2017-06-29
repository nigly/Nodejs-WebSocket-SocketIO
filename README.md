# Android-Nodejs-WebSocket
Android+OkHttp3+Nodejs+WebSocketServer


# Client  code 

class WebSocketClient{

    private val WS_IP_PORT = "192.168.5.101:8181"
    
    private var client: OkHttpClient? = null
    private var webSocket: WebSocket? = null
    
    @Synchronized fun startRequest() {
        if (null == client) {
            client = OkHttpClient()
        }
        if (null == webSocket) {
            val request = Request.Builder()
                    .url("ws://" + WS_IP_PORT + "/ws")
                    .addHeader("Origin", "http://" + WS_IP_PORT)
                    .build()
            webSocket = client!!.newWebSocket(request, EchoWebSocketListener())
        }
    }

    private fun sendMessage(webSocket: WebSocket?) {
        webSocket!!.send("Hello!")
        webSocket!!.send(ByteString.decodeHex("Hello!"))
    }


    fun closeWebSocket(){
        if (null != webSocket) {
            webSocket!!.close(NORMAL_CLOSURE_STATUS, "Goodbye!")
            webSocket = null
        }
    }

    fun destroy(){
        if (null != client) {
            client!!.dispatcher().executorService().shutdown()
            client = null
        }
    }

    fun resetWebSocket(){
        synchronized(WebSocketClient::class.java) {
            webSocket = null
        }
    }

    inner class EchoWebSocketListener : WebSocketListener() {

        override fun onOpen(webSocket: WebSocket?, response: Response?) {
            super.onOpen(webSocket, response)
            L.d("------------------------------------ onOpen")
            sendMessage(webSocket!!)
        }

        override fun onClosed(webSocket: WebSocket?, code: Int, reason: String?) {
            super.onClosed(webSocket, code, reason)
            L.d("------------------------------------ onClosed")
        }

        override fun onClosing(webSocket: WebSocket?, code: Int, reason: String?) {
            super.onClosing(webSocket, code, reason)
            L.d("------------------------------------ onClosing")
        }

        override fun onFailure(webSocket: WebSocket?, t: Throwable?, response: Response?) {
            super.onFailure(webSocket, t, response)
            L.d("------------------------------------ onFailure ", t!!.message)
        }

        override fun onMessage(webSocket: WebSocket?, bytes: ByteString?) {
            super.onMessage(webSocket, bytes)
            L.d("------------------------------------ onMessage", bytes!!.toString())
        }

        override fun onMessage(webSocket: WebSocket?, text: String?) {
            super.onMessage(webSocket, text)
            L.d("------------------------------------ onMessage" + text!!)
        }
    }
}



#Server code

	var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({ port: 8181 });

	wss.on('connection', function (ws) {
    		console.log('client connect...');
		//监听消息发送事件
		 ws.on('message', function (message) {
			console.log("getMessage" + message);
		});
    		//客户端关闭
    		ws.on('close', function () {
    			console.log('client disconnect...');
    		}); 
	});










