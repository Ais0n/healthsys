import React, { useState } from 'react';
import { Typography, Button, Input, Form, Checkbox } from 'antd';
import { Layout } from 'antd'
import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'
import localStorage from 'localStorage'
import './Login.css'
import Myfooter from './Components/Myfooter';

class LoginSucceed extends React.Component {
    values = ""
    constructor(props) {
        super(props);
        this.state = {
            msg: "正在登录..."
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
                let msg = (_this.props.location.query ? "登录成功！" : "您访问的页面不存在！") + s + "秒后跳转到首页...";
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

    getUserInfo = () => {
        let user = JSON.parse(localStorage.getItem("userInfo"));
        console.log(user);
    }

    render() {
        return (
            <div>
                <Myheader />
                <Navbar />
                <div className="successInfo">
                    <h1>{this.state.msg}</h1>
                </div>
                <Myfooter/>
            </div>
        )
    }
}
LoginSucceed.contextTypes = { router: () => React.PropTypes.func.isRequired };
export default LoginSucceed