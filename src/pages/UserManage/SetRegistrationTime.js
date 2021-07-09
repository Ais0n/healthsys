import React from 'react';
import { Layout, Menu, Breadcrumb, Card, Button, Form, Input, Row, Col, Radio, Alert, Checkbox, Space, Select, Skeleton, Table, Empty, message, InputNumber, DatePicker} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, LockOutlined } from '@ant-design/icons';
import './ChangePassword.css'
import { addTime, queryTime } from '../../utils/utils';
const { Option } = Select;


const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '午别',
      dataIndex: 'wubie',
      key: 'wubie',
    },
    {
      title: '挂号类型',
      dataIndex: 'isSpecialist',
      key: 'isSpecialist',
      render: (isSpecialist) => {
        return <div>{isSpecialist ? "专家门诊" : "普通门诊"}</div>
      }
    },
    {
      title: '挂号总数',
      key: 'number',
      dataIndex: 'number',
    },
    {
      title: '单价（元）',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
          <Button type="link">删除</Button>
      ),
    },
  ];

export default class SetRegistrationTime extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            status: false
        };
    }

    componentDidMount() {
        queryTime().then((res) => {
            message.success(res.data.message);
            this.setState({
                status: true,
                data: res.data.timeInfo
            })
        }, (res) => {
            message.error(res.data.message);
            this.setState({
                status: true,
                data: []
            })
        }).catch((err) => {
            //message.error(err);
            console.log(err)
            this.setState({
                status: true,
                data: []
            })
        })
    }

    status = this.props.userInfo.userData.userStatus;

    renderTable = () => {
        if(this.state.status) {
            if(this.state.data.length>0) {
                return (
                    <Table key={this.state.data} columns={columns} dataSource={this.state.data}/>
                )
            } else {
                return (
                    <Empty description="暂无数据"></Empty>
                )
            }
        } else {
            return(
                <Skeleton active/>
            )
        }
    }

    onFinish = async (values) => {
        console.log(values);
        let date = values["date"];
        values["date"] = date.format('YYYY-MM-DD');
        addTime(values).then((res)=>{
            message.success(res.data.message);
            let tmp = this.state.data;
            tmp.push(values);
            this.setState({
                data: tmp
            });
        }, (res)=>{
            message.error(res.data.message);
        }).catch((err)=>{
            message.error(err);
        })
    };

    renderForm = () => {
        return(
        !this.status ? 
            <Alert
            message="提示"
            description="您的信息审核尚未通过，部分功能已被禁用，请尽快完善个人信息并联系管理员审核"
            type="info"
            showIcon
            style={{marginBottom: "50px"}}
            /> 
            : 
            <Form
            name="additem"
            initialValues={{}}
            onFinish={this.onFinish}
            style={{marginBottom: "50px"}}
            >
                <Row>
                    <Col span={8}>
                    <Form.Item
                        name="date"
                        label="日期"
                        rules={[
                            {
                                required: true,
                                message: '请选择日期！',
                            },
                        ]}
                    >
                        <DatePicker format="YYYY-MM-DD" style={{minWidth:"100px"}}/>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                        name="wubie"
                        label="午别"
                        rules={[
                            {
                                required: true,
                                message: '请选择午别!',
                            },
                        ]}
                    >
                        <Select style={{width:"60%", minWidth:"80px"}}>
                            <Option value="上午">上午</Option>
                            <Option value="下午">下午</Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                        name="isSpecialist"
                        label="挂号类型"
                        rules={[
                            {
                                required: true,
                                message: '请选择挂号类型!',
                            },
                        ]}
                    >
                        <Select style={{width:"60%", minWidth:"110px"}}> 
                            <Option value={true}>专家门诊</Option>
                            <Option value={false}>普通门诊</Option>
                        </Select>
                    </Form.Item>
                    </Col>
                </Row>
                <Row>
                <Col span={8}>
                <Form.Item
                    name="number"
                    label="挂号总数"
                    rules={[
                        {
                            required: true,
                            message: '请填写挂号总数!',
                        },
                    ]}
                >
                    <InputNumber min={1}/>
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                    name="price"
                    label="单价（元）"
                    rules={[
                        {
                            required: true,
                            message: '请填写单价!',
                        },
                    ]}
                >
                    <InputNumber/>
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="addButton">
                        添加
                    </Button>
                </Form.Item>
                </Col>
                </Row>
            </Form>
        )
    }

    render() {
        return (
            <>
                {this.renderForm()}
                {this.renderTable()}
            </>
        )
    }
}