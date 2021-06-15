import React from 'react';
import { Layout, Menu, Breadcrumb, Card, Button, Avatar, List, Form, Input, Radio, Checkbox, Select, message } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, LockOutlined } from '@ant-design/icons';
import './ChangePassword.css'
import { queryNewDoctor } from '../../utils/utils';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class ApproveDoctor extends React.Component {
    constructor(props){
        super(props);
        let itemList = [];
        queryNewDoctor().then((res) => {
            message.success(res.data.message);
            itemList = res.data.doctorInfo
        }, (res) =>{
            message.error(res.data.message);
            itemList = [];
        }).catch((err) => {
            message.error(err);
            itemList = [];
        })
        this.state = {
            itemList: itemList
        };
    }
    render() {
        return (
            <>
                <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                    console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={this.state.itemList}
                renderItem={item => (
                    <List.Item
                    key={item.userId}
                    actions={[
                        <Button>同意申请</Button>
                    ]}
                    >
                    
                    <List.Item.Meta
                        avatar={<Avatar size={100} src={`http://localhost:8000/images/${item.avatar}`}/>}
                        title={item.userName}
                        description={`${item.userInfo.age}岁 | ${item.userInfo.hospitalName} | ${item.userInfo.keshi} | 从医${item.userInfo.workYears}年`}
                    />
                    {item.userInfo.description}
                    </List.Item>
                )}
                />
            </>
        )
    }
}