import React, { useState, Row } from 'react';
import { Typography, Button, Input, Form, Checkbox, Select, Cascader, Radio } from 'antd';
import { Layout } from 'antd'
import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'
import Verifycode from './Components/Verifycode'
import './Register.css'
import { message } from 'antd';
import { userRegister } from '../utils/utils'
// import ProForm, { ProFormText, ProFormCaptcha, ProFormCheckbox, ProFormFieldSet } from '@ant-design/pro-form';
import { MobileOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import Myfooter from './Components/Myfooter';
const { Option } = Select;
const { Title } = Typography;
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
const varifyCodeLayout = {
    wrapperCol: {align: "center"},
    offset: 15, span: 6
};

// class Register extends React.Component {
//     constructor(props){
//         super(props);
//     }

//     verifyCodeSucceed = false;

//     checkVerifyCode = () => {
//         //此处应有验证码的处理
//         // alert('成功，接下来将跳转到新页面.');
//         // alert("success!");
//         // alert(this.verifyCodeSucceed);//调用这个东西来获取验证码是否已经划过了
//         if(this.verifyCodeSucceed){
//             return true;
//         }
//         else{
//             message.error("请通过验证码确认")
//             return false;
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
//                 <div className="registerProForm">
//                 <ProForm
//                     onFinish={async (values) => {
//                         values.remember = (values.remember.length > 0); //因为style的原因，remember是数组，需要修改remember
//                         console.log(values);
//                         if(this.checkVerifyCode()){
//                             // login(values).then((res)=>{
//                             //     message.success(res.data.message);
//                             //     this.props.history.push({
//                             //         pathname:"/loginsucceed",
//                             //         userData:{
//                             //             accountId: values.accountId
//                             //         }
//                             //     });
//                             // }, (res)=>{
//                             //     message.error(res.data.loginData.message);
//                             // })
//                         }

//                     }}
//                     submitter={{
//                         searchConfig: {
//                             submitText: '注册',
//                         },
//                         render: (_, dom) => dom.pop(),
//                         submitButtonProps: {
//                             size: 'large',
//                             style: {
//                                 width: '100%',
//                             },
//                         }
//                     }}
//                 >
//                     <h1 style={{textAlign: 'center'}}>注册新用户</h1>
//                     <ProFormText
//                     fieldProps={{
//                         size: 'large',
//                         prefix: <MobileOutlined />,
//                     }}
//                     name="accountId"
//                     placeholder="请输入手机号"
//                     rules={[
//                         {
//                         required: true,
//                         message: '请输入手机号!',
//                         },
//                         {
//                         pattern: /^1\d{10}$/,
//                         message: '不合法的手机号格式!',
//                         },
//                     ]}
//                     />
//                     <ProFormText
//                     fieldProps={{
//                         size: 'large',
//                         prefix: <UserOutlined />,
//                     }}
//                     name="name"
//                     placeholder="请输入真实姓名"
//                     rules={[
//                         {
//                         required: true,
//                         message: '请输入真实姓名!',
//                         },
//                     ]}
//                     />
//                     <ProFormText.Password
//                     fieldProps={{
//                         size: 'large',
//                         prefix: <LockOutlined />
//                     }}
//                     name="password"
//                     placeholder="请输入密码"
//                     rules={[
//                         {
//                         required: true,
//                         message: '请输入密码!',
//                         }
//                     ]}
//                     />
//                     <Verifycode caller={this}/>
//                 </ProForm>
//                 </div>
//             </div>
//         );
//     };
// }

// class Register extends React.Component {
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
//                 pathname:"/regsucceed",
//                 query:{
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
//                 <div className="registerBox">
//                 <div  className="registerForm">
//                 <Form
//                 {...layout}
//                 name="basic"
//                 initialValues={{ remember: true }}
//                 onFinish={this.onFinish}
//                 onFinishFailed={this.onFinishFailed}
//                 >
//                 <Form.Item
//                     label="用户名/手机号码"
//                     name="username"
//                     rules={[{ required: true, message: '请输入您的手机号码.' }]}
//                 >
//                     <Input />
//                 </Form.Item>

//                 <Form.Item
//                     label="密码"
//                     name="password"
//                     rules={[{ required: true, message: '请设置一个密码.' }]}
//                 >
//                     <Input.Password />
//                 </Form.Item>

//                 <Form.Item {...varifyCodeLayout}>
//                     <Verifycode caller={this}/>
//                 </Form.Item>

//                 <Form.Item {...submitLayout}>
//                     <Button type="primary" htmlType="submit" align="center">
//                     注册
//                     </Button>
//                 </Form.Item>

//                 </Form>

//                 </div>
//                 </div>
//             </div>
//         );
//     };
// }

const formItemLayout = {
    labelCol: {
      xs: {
        span: 12,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 0,
      },
      sm: {
        span: 24,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 24,
        offset: 6,
      },
    },
  };

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hiddenDoctorInfo: true
        }
    }

    verifyCodeSucceed = false;

    checkVerifyCode = () => {
        //此处应有验证码的处理
        // alert('成功，接下来将跳转到新页面.');
        // alert("success!");
        // alert(this.verifyCodeSucceed);//调用这个东西来获取验证码是否已经划过了
        if (this.verifyCodeSucceed) {
            return true;
        }
        else {
            message.error("请通过验证码确认")
            return false;
        }
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        alert("请填写所有信息！");
    };
    getVerifyCodeSuccess = (verifyCodeComponent, success) => {
        this.verifyCodeSucceed = success;
    }

    onFinish = async (values) => {
        console.log(values);
        if(this.checkVerifyCode()){
            userRegister(values).then((res)=>{
                message.success(res.data.message);
                this.props.history.push({
                    pathname:"/regsucceed",
                    query:{
                        values:values
                    }
                });
            }, (res)=>{
                if(res.isAxiosError){
                    message.error("网络异常");
                } else {
                    message.error(res.data.message);   
                }
            })
            // this.props.history.push({
            //     pathname:"/regsucceed",
            //     query:{
            //         values:values
            //     }
            // });
        }
    };


    render() {
        return (
            <div>
            <Myheader />
            <Navbar />
            <Form
                {...formItemLayout}
                name="register"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                className="registerForm"
                scrollToFirstError
            >
                <h1 style={{textAlign: 'center', padding: "0 0 0 70px"}}>注册用户</h1>
                <Form.Item
                    name="userPermission"
                    label="用户类型"
                    rules={[{ required: true, message: 'Please pick an item!' }]}
                >
                    <Radio.Group
                        onChange={(val)=>{this.setState({hiddenDoctorInfo: (val.target.value!="doctor")});}}>
                        <Radio value="user">患者</Radio>
                        <Radio value="doctor">医生</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="userId"
                    label="手机号"
                    rules={[
                        {
                            pattern: /^1\d{10}$/,
                            message: '不合法的手机号格式!',
                        },
                        {
                            required: true,
                            message: '请输入手机号！',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请再输一遍密码！',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('两次输入的密码不匹配！'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="userName"
                    label="真实姓名"
                    rules={[
                        {
                            required: true,
                            message: '请输入真实姓名！',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="xingbie"
                    label="性别"
                    rules={[
                        {
                            required: true,
                            message: '请选择性别!',
                        },
                    ]}
                >
                    <Select>
                        <Option value={1}>男</Option>
                        <Option value={0}>女</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="hospitalName"
                    label="所属医院"
                    dependencies={['userPermission']}
                    hidden={this.state.hiddenDoctorInfo}
                    rules={[
                        { 
                            required: !this.state.hiddenDoctorInfo, 
                            message: '请选择所属医院!' 
                        },
                    ]}
                >
                    <Select placeholder="请选择所属医院">
                    <Option value="浙一医院">浙一医院</Option>
                    <Option value="浙二医院">浙二医院</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="keshi"
                    label="所属科室"
                    dependencies={['userPermission']}
                    hidden={this.state.hiddenDoctorInfo}
                    rules={[
                        { 
                            required: !this.state.hiddenDoctorInfo, 
                            message: '请选择所属科室!' 
                        },
                    ]}
                >
                    <Select placeholder="请选择所属科室">
                    <Option value="精神卫生科">精神卫生科</Option>
                    <Option value="口腔科">口腔科</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="zhicheng"
                    label="职称"
                    dependencies={['userPermission']}
                    hidden={this.state.hiddenDoctorInfo}
                    rules={[
                        { 
                            required: !this.state.hiddenDoctorInfo, 
                            message: '请选择职称!' 
                        },
                    ]}
                >
                    <Select placeholder="请选择职称">
                    <Option value="主治医师">主治医师</Option>
                    <Option value="专家医师">专家医师</Option>
                    </Select>
                </Form.Item>



                <Form.Item {...tailFormItemLayout}>
                     <Verifycode caller={this}/>
                 </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        我已阅读并同意 <Button type="link">用户协议</Button>
                    </Checkbox>
                   
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" className="register-form-button">
                        注册
                    </Button>
                </Form.Item>
                <Myfooter/>
            </Form>
            </div>
        );
    }
};

export default Register;