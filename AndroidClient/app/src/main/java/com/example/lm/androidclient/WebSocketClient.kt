package com.example.lm.androidclient

import com.example.lm.androidclient.Config.WS_IP_PORT
import com.safframework.log.L
import okhttp3.*
import okio.ByteString


class WebSocketClient{


    private val NORMAL_CLOSURE_STATUS = 1000
    private var client: OkHttpClient? = null
    private var webSocket: WebSocket? = null
    @Synchronized fun startRequest() {
        if (client == null) {
            client = OkHttpClient()
        }
        if (webSocket == null) {
            val request = Request.Builder()
                    .url("ws://" + WS_IP_PORT + "/ws")
                    .addHeader("Origin", "http://" + WS_IP_PORT)
                    .build()
            val listener = EchoWebSocketListener()
            webSocket = client!!.newWebSocket(request, listener)

        }
    }

    private fun sendMessage() {
        webSocket!!.send("Hello!")
        webSocket!!.send(ByteString.decodeHex("Abcd"))
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
            L.d("------------------", "onOpen")
            sendMessage()
        }

        override fun onClosed(webSocket: WebSocket?, code: Int, reason: String?) {
            super.onClosed(webSocket, code, reason)
            L.d("------------------", "onClosed")
            destroy()
            resetWebSocket()
        }

        override fun onClosing(webSocket: WebSocket?, code: Int, reason: String?) {
            super.onClosing(webSocket, code, reason)
            L.d("------------------", "onClosing")
        }

        override fun onFailure(webSocket: WebSocket?, t: Throwable?, response: Response?) {
            super.onFailure(webSocket, t, response)
            L.d("------------------", "onFailure " + t!!.message)
            destroy()
            resetWebSocket()
        }

        override fun onMessage(webSocket: WebSocket?, bytes: ByteString?) {
            super.onMessage(webSocket, bytes)
            L.d("------------------", "onMessage ----->>" + bytes!!.toString())
        }

        override fun onMessage(webSocket: WebSocket?, text: String?) {
            super.onMessage(webSocket, text)
            L.d("------------------", "onMessage  ----->" + text!!)
        }

    }
}
