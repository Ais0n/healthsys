import React from 'react';
import { Layout, Menu, Breadcrumb, Card, Button, Form, Input, Radio, Checkbox, Select, List, message, Empty } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, LockOutlined } from '@ant-design/icons';
import './ChangePassword.css'
import { queryRegistrationInfo } from '../../utils/utils';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class QueryRegistration extends React.Component {
    constructor(props){
        super(props);
        this.status = false;
        this.listData = [];
        queryRegistrationInfo().then((tmp) => {
            this.status = tmp.status;
            this.listData = tmp.registrationInfo;
        }, (tmp) => {
            this.status = tmp.status;
            message.error("查询失败");
        }).catch(err => {
            message.error(err);
        })
    }

    render() {
        return (
            <>
                { this.listData.length > 0 ?
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                        console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={this.listData}
                    renderItem={item => (
                        <List.Item
                        key={item.date}
                        >
                        
                        <List.Item.Meta
                            title={"abc"}
                            description={"abc"}
                        />
                        {item.content}
                        </List.Item>
                    )}
                />
                :
                <Empty description="暂无数据" style={{height: "200px", margin: "5% auto 5% auto"}}/>
                }
            </>
        )
    }
}