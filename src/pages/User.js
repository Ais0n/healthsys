import React from 'react';
import Sidebar from './Components/Sidebar';
import { Layout, Menu, Breadcrumb, Card, Button, Form, Input, Radio, Checkbox, Select} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, LockOutlined} from '@ant-design/icons';

import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'
import './User.css'
import ChangePassword from './UserManage/ChangePassword';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        return (
            <>
                <Myheader />
                <Navbar />
                <div className="mainContent">
                    <Sidebar className="sidebar" caller={this}/>
                        <div className="mainStaff">
                        <Card title="修改个人信息" bordered={true} className="card">
                            <ChangePassword className="changePassword"/>
                        </Card>
                        </div>
                </div>
            </>
        );
    }
}

export default User;