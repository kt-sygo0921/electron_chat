import * as React from 'react';
import {Link,hashHistory} from 'react-router';
import Errors from './Errors';
import firebase from 'firebase/firebase-browser';

const FORM_STYLE = {
    margin:'0 auto',
    padding: 30
};

const SIGNUP_LINK_STYLE = {
    display: 'inline-block',
    marginLeft: 10
};

export default class Login extends React.Component<any,any> {
    error: any;
    constructor(props:any) {
        super(props);
        this.state = {
            email: localStorage.userEmail || '',
            password: localStorage.userPassword || '',
            errors:[]
        };
        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
        this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
        this.handleOnChangeSubmit = this.handleOnChangeSubmit.bind(this);
    }
    handleOnChangeEmail(e:any) {
        this.setState({email:e.target.value});
    }
    handleOnChangePassword(e:any) {
        this.setState({password:e.target.value});
    }
    handleOnChangeSubmit(e:any) {
        const {email,password}:any = this.state;
        const errors = []
        let isValid = true;
        e.preventDefault();
        if(!email.length) {
            isValid = false;
            errors.push(`Email can't be blank.`);
        }
        if(!password.length) {
            isValid = false;
            errors.push(`Password can't be blank.`);
        }
        if(!isValid) {
            //必須入力項目に該当した場合はエラーを表示する
            this.setState({errors});
            return;
        }

        //Firebaseのログイン処理
        firebase.auth().signInWithEmailAndPassword(email,password).then(()=> {
            //次回ログイン簡略化のため、localStrageに値を保存
            localStorage.userEmail = email;
            localStorage.Passoword = password;
            hashHistory.push('/rooms');
        }).catch(()=>{
            //Firebaseでログインエラーとなった場合
            this.setState({errors:['Incorrect email or password']});
        });
    }
    render() {
        return (
            <form style={FORM_STYLE} onSubmit = {this.handleOnChangeSubmit}>
                <Errors errorMessage={this.state.errors}/>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="email" onChange={this.handleOnChangeEmail} value={this.state.email}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={this.handleOnChangePassword} value={this.state.password}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-large btn-default">Login</button>
                    <div style={SIGNUP_LINK_STYLE}>
                        <Link to="signup">create new account</Link>
                    </div>
                </div>
            </form>
        );
    }
}