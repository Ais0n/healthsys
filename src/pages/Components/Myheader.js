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
    render(){
        return(
            <div className="header">
                <img className="logo" src={logo} alt=""></img>
                <div className="title">阳光医疗服务平台</div>
                <div className="search"><Search placeholder="站内搜索" onSearch={onsearch} style={{ width: 200 }} /></div>
                <div className="vertical-split-line" />
                <div className="button"><Button type="primary" onClick={this.login}>登录</Button></div>
                <div className="button"><Button type="primary" onClick={this.register}>注册</Button></div>
            </div>
        );
    };
};

export default withRouter(Myheader);

