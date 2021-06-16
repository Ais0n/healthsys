import React from 'react';
import { Layout, Menu, Breadcrumb, Card, Button, Form, Input, Radio, Checkbox, Select, List, message, Empty, Skeleton, Descriptions } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, LockOutlined } from '@ant-design/icons';
import './ChangePassword.css'
import { queryRegistrationInfo } from '../../utils/utils';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class QueryRegistration extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            status: false,
            listData: []
        }
    }

    componentDidMount() {
        queryRegistrationInfo().then((tmp) => {
            let listData = tmp.data.registrationInfo;
            this.setState({
                listData: listData,
                status: true
            });
        }, (tmp) => {
            message.error(tmp.data.message);
            this.setState({
                status: true
            })
        }).catch(err => {
            message.error(err);
            this.setState({
                status: true
            })
        })
    }

    renderList = () => {
        if(this.state.status) {
            if(this.state.listData.length > 0){
                return (
                    <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                        console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={this.state.listData}
                    renderItem={item => (
                        <List.Item
                        key={item.date}
                        >
                        
                        <List.Item.Meta
                        title={item.date}
                        description={`${item.hospitalName} | ${item.keshi} | ${item.doctorName} 医师`}
                        />
                            <Descriptions size="default">
                                <Descriptions.Item label="午别">{item.wubie}</Descriptions.Item>
                                <Descriptions.Item label="挂号类型">{item.isSpecialist?"专家门诊":"普通门诊"}</Descriptions.Item>
                                <Descriptions.Item label="状态">{item.isFinished?"已完成":"未完成"}</Descriptions.Item>
                                <Descriptions.Item label="挂号编号">{item.registrationId}</Descriptions.Item>
                            </Descriptions>
                        </List.Item>
                    )}
                    />
                )
            } else {
                return (
                    <Empty description="暂无数据" style={{height: "200px", margin: "5% auto 5% auto"}}/>
                )
            }
        } else {
            return (<Skeleton active />)
        }
    }

    render() {
        return (
            <>
                {this.renderList()}
            </>
        )
    }
}