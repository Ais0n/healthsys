import React, { useState } from 'react';
import { Typography, Button, Input, Form, Checkbox} from 'antd';
import { Layout } from 'antd'
import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'
import Verifycode from './Components/Verifycode'
import './Login.css'

const { Title } = Typography;
const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 7 },
};
const tailLayout = {
    wrapperCol: { offset: 9, span: 6 },
};
const varifyCodeLayout = {
    wrapperCol: { offset: 9, span: 6 },
};

class Login extends React.Component {
    constructor(props){
        super(props);
    }

    verifyCodeSucceed = false;

    onFinish = (values) => {
        //此处应有验证码的处理
        console.log('Success:', values);
        // alert("success!");
        alert(this.verifyCodeSucceed);//调用这个东西来获取验证码是否已经划过了
        if(this.verifyCodeSucceed){
            this.props.history.push({
                pathname:"/loginsucceed",
                query:{
                    // username: values.username,
                    // password: values.password,
                    // remember: values.remember
                    values:values
                }
            });
        }
        else{
            alert("请通过验证码确认")
        }
        
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        alert("fail!");
    };
    getVerifyCodeSuccess = (verifyCodeComponent,success) => {
        this.verifyCodeSucceed = success;
    }
    render(){
        return(
            <div>
                <Myheader/>
                <Navbar/>
                <div  className="loginForm">
                <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>

                <Form.Item {...varifyCodeLayout}>
                    <Verifycode caller={this}/>
                </Form.Item>

                </Form>

                </div>
            </div>
        );
    };
}

export default Login;