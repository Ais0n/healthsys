import React, { useState } from 'react';
import { Typography, Button, Input, Form, Checkbox } from 'antd';
import { Layout } from 'antd'
import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'
import './Register.css'
import Myfooter from './Components/Myfooter';
class RegisterSucceed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "正在加载..."
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
                let msg = "注册成功，" + s + "秒后跳转到登录页面...";
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
                    pathname: "/login",
                });
                return;
            }
            timer = setTimeout(f, 1000);
        }, 1000);
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
RegisterSucceed.contextTypes = { router: () => React.PropTypes.func.isRequired };
export default RegisterSucceed;