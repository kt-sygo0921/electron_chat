import * as React from 'react';
import { hashHistory } from "react-router";
import RoomItem from './RoomItem';
import firebase from 'firebase/firebase-browser';

const ICON_CHAT_STYLE = {
    fontSize: 120,
    color: "#DDD"
}

const FORM_STYLE = {
    display: "flex",
}

const BUTTON_STYLE = {
    marginLeft: 10
}

interface Rooms_state {
    roomName: string;
    rooms: any[]
}

export default class Rooms extends React.Component<any,Rooms_state> {
    db: any;
    constructor(props:any) {
        super(props);
        this.state = {
            roomName:"",
            rooms:[]
        };
        this.db = firebase.database();
        this.handleOnChangeRoomName = this.handleOnChangeRoomName.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }
    componentDidMount() {
        //コンポーネントの初期化時にチャットルームの一覧を取得
        this.fetchRooms();
    }
    handleOnChangeRoomName(e:any) {
        this.setState({
            roomName: e.target.value
        })
    }
    handleOnSubmit(e:any) {
        const { roomName } = this.state;
        e.preventDefault();
        if(!roomName.length) {
            return;
        }
        //Firebaseデータベースに新規チャットルームのデータを作成
        const newRoomRef = this.db.ref("/chatrooms").push();
        const newRoom = {
            description: roomName
        };
        //作成したチャットルームのdescriptionを更新
        newRoomRef.update(newRoom).then(() => {
            //状態を最初期化
            this.setState({roomName:""});
            //チャットルーム一覧を再取得
            return this.fetchRooms().then(()=> {
                //右ペインを作成した詳細画面に遷移させる
                hashHistory.push(`/rooms/${newRoomRef.key}`);
            })
        })
    }
    //チャットルームの一覧の取得処理
    fetchRooms() {
        //Firebaseデータベースからチャットルームを20件取得
        return this.db.ref("/chatrooms").limitToLast(20).once("value").then((snapshot:any)=>{
            const rooms:any = [];
            console.log(snapshot.key)
            snapshot.forEach((item:any) => {
                //データベースから取得したデータをオブジェクトとして取り出す
                rooms.push(Object.assign({key:item.key},item.val()));
            });
            //取得したオブジェクトの配列をコンポーネントのstateにセット
            this.setState({rooms});
        })
    }
    //左ペイン（チャットルーム一覧）の描画処理
    renderRoomList() {
        const {roomId} = this.props.params;
        const {rooms,roomName} = this.state;
        return (
            <div className="list-group">
                {rooms.map((r:any)=><RoomItem room={r} key={r.key} selected={r.key === roomId}/>)}
                <div className="list-group-header">
                    <form style={FORM_STYLE} onSubmit={this.handleOnSubmit}>
                        <input type="text" className="form-control" placeholder="New room" onChange={this.handleOnChangeRoomName} value={roomName}/>
                        <button className="btn btn-default" style={BUTTON_STYLE}>
                            <span className="icon icon-plus"/>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
    //右ペイン（チャットルーム詳細）の描画処理
    renderRoom() {
        if(this.props.children) {
            return this.props.children;
        } else {
            return(
                <div className="text-center">
                    <div style={ICON_CHAT_STYLE}>
                        <span className="icon icon-chat"/>
                    </div>
                    <p>
                        Join a chat room from the sidebar or create your chat room.
                    </p>
                </div>
            )
        }
    }
    render(){
        return(
            <div>
                <div className="pane-group">
                    <div className="pane-sm sidebar">{this.renderRoomList()}</div>
                    <div className="pane">{this.renderRoom()}</div>
                </div>
            </div>
        )
    }
}