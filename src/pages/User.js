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

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            current: '1',
        };
    }

    check = (itemName) => {
        let storage = JSON.parse(localStorage.getItem(itemName));
        let time = new Date().getTime();
        let result = null;
        console.log(storage);
        if (storage) {
            let obj = storage;
            if (time < obj.expire) {
                result = obj.res.data;
            } else {
                localStorage.removeItem(itemName);
            }
        }
        return result;
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    checkPermission = () => {
        let userInfo = this.check("userInfo");
        return userInfo ? userInfo.userData.userPermission : "guest";
    }

    selectCard = () => {
        let err = 0;
        if(this.checkPermission() == "guest"){
            err = 1;
        } else {
            switch(this.state.current){
                case '1':
                    return(
                        <Card title="修改密码" bordered={true} className="card">
                        <ChangePassword className="changePassword"/>
                        </Card>
                    );
                case '2':
                    return (
                        <Card title="修改个人信息" bordered={true} className="card">
                        <ChangeUserData className="changePassword"/>
                        </Card>
                    )
                default:
                    return(
                        <Result
                            status="404"
                            title="404"
                            subTitle="您所访问的页面不存在"
                        />
                    )
            }
        }
        if(err == 1){
            return (
                <Result
                    status="403"
                    title="请先登录"
                    subTitle="您尚未登录"
                />
            )
        } else {
            return (
                <Result
                    status="403"
                    title="权限不足"
                    subTitle="您无权访问该页面，请联系管理员"
                />
            )
        }
    }

    render() {
        return (
            <>
                <Myheader />
                <Navbar />
                <div className="mainContent">
                    <Sidebar className="sidebar" caller={this}/>
                        <div className="mainStaff">
                            {this.selectCard()}
                        </div>
                </div>
            </>
        );
    }
}

export default User;