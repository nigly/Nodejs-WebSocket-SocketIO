//
//  ViewController.swift
//  iOS-WebSocket
//
//  Created by crx on 2017/7/24.
//  Copyright © 2017年 crx. All rights reserved.
//

import UIKit
import Starscream


class ViewController: UIViewController, WebSocketDelegate  {
    
    var socket: WebSocket = WebSocket(url: URL(string: "ws://192.168.5.100:8181/ws")!)

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        connect()
    }
    
    func connect(){
        socket.delegate = self
        socket.connect()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func websocketDidConnect(_ socket: WebSocket) {
        print("------------------->> websocketDidConnect")
        sendMessage()
    }
    
    func sendMessage(){
        socket.write(string: "Hello  World! ")
    }
    
    func websocketDidDisconnect(_ socket: WebSocket, error: NSError?) {
        print("------------------->> websocketDidDisconnect")
    }
    
    func websocketDidReceiveData(_ socket: WebSocket, data: Data) {
        
        print("------------------->> websocketDidReceiveData")
        
    }

    
    func websocketDidReceiveMessage(_ socket: WebSocket, text: String) {
        print("------------------->> websocketDidReceiveMessage")
    }

}

