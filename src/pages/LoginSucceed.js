import React, { useState } from 'react';
import { Typography, Button, Input, Form, Checkbox} from 'antd';
import { Layout } from 'antd'
import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'
import './Login.css'

class LoginSucceed extends React.Component {
    values=""
    constructor(props){
        super(props);
        this.state = {
            msg: ""
        }
    }

    componentDidMount() {
        this.timeTransition(5);//根据接口返回的时间
    }
    timeTransition = (s) => {
        let timer = null;
        let _this = this;
        setTimeout(function f() {
            if (s >= 0) {
                let msg = "登录成功，" + s + "秒后跳转到首页...";
                _this.setState({
                    msg
                });
                --s;
            } else {
                _this.setState({
                    msg: ""
                });
                clearTimeout(timer);
                _this.props.history.push({
                    pathname: "/",
                });
                return;
            }
            timer = setTimeout(f, 1000);
        }, 1000);
    }

    render(){
        return(
            <div>
            <Myheader/>
            <Navbar/>
                <div className="successInfo">
                    <h1>{this.state.msg}</h1>
                    <text>{this.props.location.query.userId}</text>
                </div>
              
            </div>
      )
    }
}
LoginSucceed.contextTypes = {router:()=>React.PropTypes.func.isRequired};
export default LoginSucceed