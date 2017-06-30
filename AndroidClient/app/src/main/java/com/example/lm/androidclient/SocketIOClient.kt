package com.example.lm.androidclient

import com.safframework.log.L
import io.socket.client.IO
import io.socket.client.Socket
import io.socket.emitter.Emitter


class SocketIOClient {

    private var socket: Socket? = null

    fun connect() {//连接
        socket = IO.socket("http://192.168.5.100:3000/");
        socket!!.on(Socket.EVENT_CONNECT, object : Emitter.Listener {

            override fun call(vararg p0: Any?) {
                L.d("---------------------------------EVENT_CONNECT")
            }
        }).on(Socket.EVENT_ERROR, object : Emitter.Listener {

            override fun call(vararg p0: Any?) {
                L.d("---------------------------------EVENT_ERROR")
            }
        }).on(Socket.EVENT_RECONNECT_FAILED, object : Emitter.Listener {

            override fun call(vararg p0: Any?) {
                L.d("---------------------------------EVENT_RECONNECT_FAILED")
            }
        })
        socket!!.connect()

    }


}
