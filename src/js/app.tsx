import * as React from 'react';
import {render} from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import Login from './Login';
import Signup from './Signup';
import Rooms from './Rooms';
import Room from './Room';

import firebase from 'firebase/firebase-browser';


const appRouting = (
    <Router history={hashHistory}>
        < Route path ="/">
            < Route path = "login" component ={ Login} />
            < Route path = "signup" component ={ Signup} />
            < Route path = "rooms" component ={ Rooms}>
                < Route path =":roomId" component ={ Room} />
            </ Route >
        </ Route >
    </Router>

);

//Routingの初期化
if(!location.hash.length) {
    location.hash ='#/login';
}


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBuDPnpn5LkVQYoVW7RAzaO1Y5MJVAwCzk",
    authDomain: "electron-chat-4f7cb.firebaseapp.com",
    databaseURL: "https://electron-chat-4f7cb.firebaseio.com",
    projectId: "electron-chat-4f7cb",
    storageBucket: "electron-chat-4f7cb.appspot.com",
    messagingSenderId: "781329836770"
  };
firebase.initializeApp(config);


//Applicationの描画
render(appRouting,document.getElementById("app"));