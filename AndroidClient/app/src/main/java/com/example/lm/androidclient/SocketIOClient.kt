package com.example.lm.androidclient

import com.example.lm.androidclient.Config.PUSH_SERVER_IP_PORT
import com.safframework.log.L
import io.socket.client.IO
import io.socket.client.Socket


class SocketIOClient {

    private var socket: Socket? = null

    init {
        if (null == socket) {
            socket = IO.socket("http://" + PUSH_SERVER_IP_PORT);
        }
    }


    fun connect(): SocketIOClient {//连接
        socket!!.connect()
        return this
    }


    fun onConnect(): SocketIOClient {
        socket!!.on(Socket.EVENT_CONNECT) { args ->
            L.d("---------------------------------EVENT_CONNECT")
        }
        return this
    }

    fun onError(): SocketIOClient {
        socket!!.on(Socket.EVENT_ERROR) { args ->
            L.d("---------------------------------EVENT_ERROR")
        }
        return this
    }


    fun onConnectError(): SocketIOClient {
        socket!!.on(Socket.EVENT_CONNECT_ERROR) { args ->
            L.d("---------------------------------EVENT_CONNECT_ERROR")
        }
        return this
    }


    fun onConnectTimeout(): SocketIOClient {
        socket!!.on(Socket.EVENT_CONNECT_TIMEOUT) { args ->
            L.d("---------------------------------EVENT_CONNECT_TIMEOUT")
        }
        return this
    }

    fun onReconnectFailed(): SocketIOClient {
        socket!!.on(Socket.EVENT_RECONNECT_FAILED) { args ->
            L.d("---------------------------------EVENT_RECONNECT_FAILED")
        }
        return this
    }

    fun onDisconnect(): SocketIOClient {
        socket!!.on(Socket.EVENT_DISCONNECT) { args ->
            L.d("---------------------------------EVENT_RECONNECT_FAILED")
        }
        return this
    }


}
