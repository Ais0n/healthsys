import React, { useState , Row} from 'react';
import { Typography, Button, Input, Form, Checkbox} from 'antd';
import { Layout } from 'antd'
import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'
import Verifycode from './Components/Verifycode'
import './Register.css'

const { Title } = Typography;
const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 6 },
};
const tailLayout = {
    wrapperCol: { offset: 9, span: 6 },
};
const submitLayout = {
    wrapperCol: {align: "center"},
    // offset: 11, span: 6, 
};
const varifyCodeLayout = {
    wrapperCol: {align: "center"},
};

class Register extends React.Component {
    constructor(props){
        super(props);
    }

    verifyCodeSucceed = false;

    onFinish = (values) => {
        //此处应有验证码的处理
        // alert('成功，接下来将跳转到新页面.');
        // alert("success!");
        // alert(this.verifyCodeSucceed);//调用这个东西来获取验证码是否已经划过了
        if(this.verifyCodeSucceed){
            alert('成功，接下来将跳转到新页面.');
            this.props.history.push({
                pathname:"/regsucceed",
                query:{
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
        alert("请填写所有信息！");
    };
    getVerifyCodeSuccess = (verifyCodeComponent,success) => {
        this.verifyCodeSucceed = success;
    }
    render(){
        return(
            <div>
                <Myheader/>
                <Navbar/>
                <div className="registerBox">
                <div  className="registerForm">
                <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                >
                <Form.Item
                    label="用户名/手机号码"
                    name="username"
                    rules={[{ required: true, message: '请输入您的手机号码.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请设置一个密码.' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...varifyCodeLayout}>
                    <Verifycode caller={this}/>
                </Form.Item>

                <Form.Item {...submitLayout}>
                    <Button type="primary" htmlType="submit" align="center">
                    注册
                    </Button>
                </Form.Item>

                </Form>
                
                </div>
                </div>
            </div>
        );
    };
}

export default Register;