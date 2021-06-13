import React from 'react';
import { Layout, Menu, Breadcrumb, Card, Button, Form, Input, Radio, Checkbox, Select } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, LockOutlined } from '@ant-design/icons';
import './ChangePassword.css'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class ChangePassword extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <>
                <Form
                    name="normal_login"
                    className="infoForm"
                    initialValues={{
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        name="oldPassword"
                        rules={[
                            {
                                required: true,
                                message: '请输入旧密码!',
                            },
                        ]}
                    >
                        <Input
                            type="password"
                            placeholder="旧密码"
                        />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: '请输入新密码!',
                            },
                        ]}
                    >
                        <Input
                            type="password"
                            placeholder="新密码"
                        />
                    </Form.Item>
                    <Form.Item
                        name="repeatPassword"
                        dependencies={['newPassword']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请再输一遍密码！',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('两次输入的密码不匹配！'));
                                },
                            }),
                        ]}
                    >
                        <Input
                            type="password"
                            placeholder="确认密码"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            确认
                                </Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}