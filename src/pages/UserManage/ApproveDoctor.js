import React from 'react';
import { Layout, Menu, Breadcrumb, Card, Button, Avatar, List, Form, Input, Radio, Checkbox, Select, message, Skeleton, Empty } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, LockOutlined, CheckOutlined } from '@ant-design/icons';
import './ChangePassword.css'
import { approveNewDoctor, getServerUrl, queryNewDoctor } from '../../utils/utils';
import CompButton from '../Components/CompButton';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



export default class ApproveDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: [],
            status: false
        };
    }

    componentDidMount() {
        queryNewDoctor().then((res) => {
            message.success(res.data.message);
            let itemList = res.data.doctorInfo;
            this.setState({
                itemList: itemList,
                status: true
            });
        }, (res) => {
            message.error(res.data.message);
            this.setState({
                status: true
            });
        }).catch((err) => {
            message.error(err);
            this.setState({
                status: true
            });
        })
    }

    genDescription = (item) => {
        let infoList = [];
        if (item.userInfo.age) infoList.push(item.userInfo.age + "岁");
        if (item.userInfo.hospitalName) infoList.push(item.userInfo.hospitalName);
        if (item.userInfo.keshi) infoList.push(item.userInfo.keshi);
        if (item.userInfo.zhicheng) infoList.push(item.userInfo.zhicheng);
        if (item.userInfo.workYears) infoList.push("从医" + item.userInfo.workYears + "年");
        console.log(infoList);
        let ret = "";
        for (let i = 0; i < infoList.length; i++) {
            if (ret == "") {
                ret = infoList[i];
            }
            else {
                ret = ret + " | " + infoList[i];
            }
        }
        return ret;
    }

    handleApprove = (userId) => {
        let data = {};
        data["userId"] = [userId];
        approveNewDoctor(data).then((res) => {
            message.success(res.data.message);
            return true;
        }, (res) => {
            message.error(res.data.message);
            return false;
        }).catch((err) => {
            message.error(err);
            return false;
        })
    }

    renderItem = () => {
        if (this.state.status) {
            if (this.state.itemList.length > 0) {
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
                        dataSource={this.state.itemList}
                        renderItem={item => (
                            <List.Item
                                key={item.userId + item.ok ? "t" : "f"}
                                actions={[
                                    <CompButton handleApprove={this.handleApprove} userId={item.userId}/>
                                ]}
                            >

                                <List.Item.Meta
                                    avatar={<Avatar size={100} src={`${getServerUrl()}/images/${item.userInfo.avatar}`} />}
                                    title={item.userName}
                                    description={this.genDescription(item)}
                                />
                                {item.userInfo.description}
                            </List.Item>
                        )}
                    />
                )
            } else {
                return (
                    <Empty description="暂无待审核的医生" />
                )
            }
        } else {
            return (
                <Skeleton active />
            )
        }
    }

    render() {
        return (
            <>
                {this.renderItem()}
            </>
        )
    }
}