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


# Other code

	node shell

	npm install

	node app.js 
	or
	node app.js debug

	debug http://ip:port/index.html
	or 
	http://ip:port/index2.html




data server --> http --> pushData --> node WebSocketServer --> websocket --> client 



# java push data code


	public static String post(String request, List<BasicNameValuePair> params) {
		String html = "";
		try {
			CloseableHttpClient httpclient = HttpClients.createDefault();
			HttpPost httppost = new HttpPost(request);
			UrlEncodedFormEntity formEntity = new UrlEncodedFormEntity(params, "UTF-8");  
			httppost.setEntity(formEntity);
			HttpResponse response = httpclient.execute(httppost);
			HttpEntity entity = response.getEntity();
			html = EntityUtils.toString(entity);
			httpclient.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
		}
		return html;
	}

	public static void main(String[] args) {
		int i = 0;
		for (;;) {
			i++;
			String value = " Hello! " + i;
			JSONObject data = new JSONObject();			
			data.put("data", value);
			
			BasicNameValuePair basicNameValuePair = new BasicNameValuePair("data", data.toJSONString());
			List<BasicNameValuePair> values = new ArrayList<BasicNameValuePair>(0);
			values.add(basicNameValuePair);
			state = post("http://192.168.5.101:8888/pushData", values);
			try {
				Thread.sleep(5000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}







