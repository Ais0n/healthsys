import './Myheader.css';
import { Button, Input, Divider} from 'antd';
import logo from '../../pic/icon.png';
import React from 'react';
import {withRouter} from 'react-router-dom'

const { Search } = Input;

const onsearch = () => {
    console.log("search")
}

class Myheader extends React.Component {
    constructor(props){
        super(props);
    }
    login = () => {
        this.props.history.push("/login");
    }
    register = () => {
        this.props.history.push("/register");
    }
    logout = () => {
        console.log("logout");
        localStorage.removeItem("userInfo");
        setTimeout(()=>{this.setState({});}, 3000);
    }

    check = () => {
        let storage = JSON.parse(localStorage.getItem("userInfo"));
        let time = new Date().getTime();
        let result = null;
        console.log(storage);
        if (storage) {
            let obj = storage;
            if (time < obj.expire) {
                result = obj.res.data;
            } else {
                localStorage.removeItem("userInfo");
            }
        }
        
        if (result) {
            return (
                <>
                <div className="info">欢迎您，{result.userData.userName}！</div>
                <div className="button"><Button type="primary" onClick={this.logout}>注销</Button></div>
                </>
            )
        } else {
            return (
                <>
                <div className="button"><Button type="primary" onClick={this.login}>登录</Button></div>
                <div className="button"><Button type="primary" onClick={this.register}>注册</Button></div>
                </>
            )
        }
        
    }

    render(){
        return(
            <div className="header">
                <img className="logo" src={logo} alt=""></img>
                <div className="title">阳光医疗服务平台</div>
                <div className="search"><Search placeholder="站内搜索" onSearch={onsearch} style={{ width: "100%" }} /></div>
                <Divider type="vertical" className="vertical-split-line"/>
                {this.check()}
            </div>
        );
    };
};

export default withRouter(Myheader);

