import React, { useState , Row} from 'react';
import { Typography, Button, Input, Form, Checkbox, AutoComplete} from 'antd';
import { Layout } from 'antd'
import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'
import Verifycode from './Components/Verifycode'
import './Login.css'
import { login } from '../utils/utils'
import '@ant-design/pro-form/dist/form.css';

import { message } from 'antd';
import ProForm, { ProFormText, ProFormCaptcha, ProFormCheckbox } from '@ant-design/pro-form';
import { MobileOutlined, MailOutlined } from '@ant-design/icons';

const waitTime = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

class Login extends React.Component {
    constructor(props){
        super(props);
    }

    verifyCodeSucceed = false;

    checkVerifyCode = () => {
        //此处应有验证码的处理
        // alert('成功，接下来将跳转到新页面.');
        // alert("success!");
        // alert(this.verifyCodeSucceed);//调用这个东西来获取验证码是否已经划过了
        if(this.verifyCodeSucceed){
            return true;
        }
        else{
            message.error("请通过验证码确认")
            return false;
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
                <div className="loginProForm">
                <ProForm
                    onFinish={async (values) => {
                        values.remember = (values.remember.length > 0); //因为style的原因，remember是数组，需要修改remember
                        console.log(values);
                        if(this.checkVerifyCode()){
                            login(values).then((res)=>{
                                message.success(res.data.message);
                                this.props.history.push({
                                    pathname:"/loginsucceed",
                                    userData:{
                                        accountId: values.accountId
                                    }
                                });
                            }, (res)=>{
                                message.error(res.data.loginData.message);
                            })
                        }
                        
                    }}
                    submitter={{
                        searchConfig: {
                            submitText: '登录',
                        },
                        render: (_, dom) => dom.pop(),
                        submitButtonProps: {
                            size: 'large',
                            style: {
                                width: '100%',
                            },
                        }
                    }}
                >
                    <h1 style={{textAlign: 'center'}}>欢迎使用阳光医疗服务平台</h1>
                    <ProFormText
                    fieldProps={{
                        size: 'large',
                        prefix: <MobileOutlined />,
                    }}
                    name="accountId"
                    placeholder="请输入手机号"
                    rules={[
                        {
                        required: true,
                        message: '请输入手机号!',
                        },
                        {
                        pattern: /^1\d{10}$/,
                        message: '不合法的手机号格式!',
                        },
                    ]}
                    />
                    <ProFormText.Password
                    fieldProps={{
                        size: 'large',
                    }}
                    name="password"
                    placeholder="请输入密码"
                    rules={[
                        {
                        required: true,
                        message: '请输入密码!',
                        }
                    ]}
                    />
                    <ProFormCheckbox.Group
                    name="remember"
                    layout="horizontal"
                    options={["记住我"]}
                    />
                    <Verifycode caller={this}/>
                </ProForm>
                </div>
            </div>
        );
    };
}

// const { Title } = Typography;
// const layout = {
//     labelCol: { span: 9 },
//     wrapperCol: { span: 6 },
// };
// const tailLayout = {
//     wrapperCol: { offset: 9, span: 6 },
// };
// const submitLayout = {
//     wrapperCol: {align: "center"},
//     // offset: 11, span: 6, 
// };
// const varifyCodeLayout = {
//     wrapperCol: {align: "center"},
// };

// class Login extends React.Component {
//     constructor(props){
//         super(props);
//     }

//     verifyCodeSucceed = false;

//     onFinish = (values) => {
//         //此处应有验证码的处理
//         // alert('成功，接下来将跳转到新页面.');
//         // alert("success!");
//         // alert(this.verifyCodeSucceed);//调用这个东西来获取验证码是否已经划过了
//         if(this.verifyCodeSucceed){
//             alert('成功，接下来将跳转到新页面.');
//             this.props.history.push({
//                 pathname:"/loginsucceed",
//                 query:{
//                     // username: values.username,
//                     // password: values.password,
//                     // remember: values.remember
//                     values:values
//                 }
//             });
//         }
//         else{
//             alert("请通过验证码确认")
//         }
        
//     };

//     onFinishFailed = (errorInfo) => {
//         console.log('Failed:', errorInfo);
//         alert("请填写所有信息！");
//     };
//     getVerifyCodeSuccess = (verifyCodeComponent,success) => {
//         this.verifyCodeSucceed = success;
//     }
//     render(){
//         return(
//             <div>
//                 <Myheader/>
//                 <Navbar/>
//                 <div className="loginBox">
//                 <div  className="loginForm">
//                 <Form
//                 {...layout}
//                 name="basic"
//                 initialValues={{ remember: true }}
//                 onFinish={this.onFinish}
//                 onFinishFailed={this.onFinishFailed}
//                 >
//                 <Form.Item
//                     label="用户名"
//                     name="username"
//                     rules={[{ required: true, message: '请输入用户名.' }]}
//                 >
//                     <Input />
//                 </Form.Item>

//                 <Form.Item
//                     label="密码"
//                     name="password"
//                     rules={[{ required: true, message: '请输入密码.' }]}
//                 >
//                     <Input.Password />
//                 </Form.Item>

//                 <Form.Item {...tailLayout} name="remember" valuePropName="checked">
//                     <Checkbox>记住我</Checkbox>
//                 </Form.Item>

//                 <Form.Item {...varifyCodeLayout}>
//                     <Verifycode caller={this}/>
//                 </Form.Item>

//                 <Form.Item {...submitLayout}>
//                     <Button type="primary" htmlType="submit" align="center" onClick={login}>
//                     登录
//                     </Button>
//                 </Form.Item>
//                 </Form>    
//                 </div>
//                 </div>
//             </div>
//         );
//     };
// }

export default Login;