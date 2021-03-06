package com.example.lm.androidclient;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);



        new WebSocketClient().startRequest();


        new SocketIOClient().onConnect()
                .onConnectError()
                .onConnectTimeout()
                .onDisconnect()
                .onReconnectFailed()
                .connect();
    }
}
