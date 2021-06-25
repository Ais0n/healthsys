import React from 'react';
import Sidebar from './Components/Sidebar';
import { Layout, Menu, Breadcrumb, Card, Button, Form, Input, Radio, Checkbox, Select, Result} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, LockOutlined} from '@ant-design/icons';

import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'
import './User.css'
import ChangePassword from './UserManage/ChangePassword';
import ChangeUserData from './UserManage/ChangeUserData';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class KeshiInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Myheader />
                <Navbar />
                <div className="mainContent">
                    <Result
                        status="404"
                        title="404"
                        subTitle="您所访问的页面不存在"
                    />
                </div>
            </>
        );
    }
}

export default KeshiInfo;