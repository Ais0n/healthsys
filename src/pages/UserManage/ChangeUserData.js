import React from 'react';
import { Layout, Menu, Breadcrumb, Card, Button, Form, Upload, Input, Radio, Checkbox, Select, message, Avatar, Image, Space, Alert } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
import { updateUserInfo, getLoginStatus, getExpireTime } from '../../utils/utils';
import './ChangePassword.css'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;

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

export default class ChangeUserData extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            avatarFileName: props.userInfo.userData.userInfo.avatar
        };
    }

    uploadprops = {
        name: 'avatar',
        multiple: false,
        action: 'http://localhost:8000/image',
        headers: {
            authorization: 'authorization-text',
        },
        onChange: info => {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success("上传成功");
                this.setState({
                    avatarFileName: info.file.response.value
                });
            } else if (info.file.status === 'error') {
                message.error("上传失败");
            }
        },
    };
    
    notDoctor = (this.props.userInfo.userData.userPermission !== "doctor");
    status = this.props.userInfo.userData.userStatus;

    onFinish = async (values) => {
        if(values.avatar) values.avatar = this.state.avatarFileName;
        var tmp = {};
        tmp["userId"] = "";
        tmp["userInfo"] = values;
        console.log(tmp);
        updateUserInfo(tmp).then((res)=>{
            message.success(res.data.message);
            getLoginStatus().then((res) =>{
                let userInfo = {
                    res,
                    expire: getExpireTime()
                };
                localStorage.setItem("userInfo", JSON.stringify(userInfo)); //存入缓存
            })
        }, (res)=>{
            if(res.isAxiosError){
                message.error("网络异常");
            } else {
                message.error(res.data.message);   
            }
        })
    };

    render() {
        return (
            <>
                <Form {...formItemLayout}
                    name="normal_login"
                    className="infoForm"
                    initialValues={{
                    }}
                    onFinish={this.onFinish}
                >
                    <div style={{marginBottom: "20px"}}>
                    {!this.notDoctor && (this.status ? 
                        <Alert
                        message="成功"
                        description="您的信息审核已通过"
                        type="success"
                        showIcon
                        />
                        : 
                        <Alert
                        message="提示"
                        description="您的信息审核尚未通过，部分功能已被禁用，请尽快完善个人信息并联系管理员审核"
                        type="info"
                        showIcon
                        /> 
                    )}
                    </div>
                    <Form.Item
                        name="userId"
                        label="账号/手机号"
                    >
                        <Input defaultValue={this.props.userInfo.userData.userId} disabled/>
                    </Form.Item>

                    <Form.Item
                        name="userName"
                        label="真实姓名"
                    >
                        <Input defaultValue={this.props.userInfo.userData.userName} disabled/>
                    </Form.Item>

                    <Form.Item
                        name="xingbie"
                        label="性别"
                    >
                        <Select placeholder="请选择性别" defaultValue={this.props.userInfo.userData.userInfo.xingbie} disabled={this.status}>
                            <Option value={1}>男</Option>
                            <Option value={0}>女</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="avatar"
                        label="头像"
                    >
                        <Space direction="horizontal" size="large">
                            <Image
                            width={200}
                            height={233}
                            src={"http://localhost:8000/images/"+this.state.avatarFileName}
                            fallback="data:image/png;base64,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"
                            />
                            <Upload {...this.uploadprops}>
                                <Button icon={<UploadOutlined />} hidden={!this.notDoctor && this.status}>点击上传</Button>
                            </Upload>
                        </Space>
                    </Form.Item>

                    <Form.Item
                        name="hospitalName"
                        label="所属医院"
                        hidden={this.notDoctor}
                    >
                        <Select placeholder="请选择所属医院" defaultValue={this.props.userInfo.userData.userInfo.hospitalName} disabled={this.status}>
                        <Option value="zheyi">浙一医院</Option>
                        <Option value="zheer">浙二医院</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="keshi"
                        label="所属科室"
                        hidden={this.notDoctor}
                    >
                        <Select placeholder="请选择所属科室" defaultValue={this.props.userInfo.userData.userInfo.keshi} 
                            disabled={this.status}>
                        <Option value="精神卫生科">精神卫生科</Option>
                        <Option value="口腔科">口腔科</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="zhicheng"
                        label="职称"
                        hidden={this.notDoctor}
                    >
                        <Select placeholder="请选择职称" defaultValue={this.props.userInfo.userData.userInfo.zhicheng}
                            disabled={this.status}>
                        <Option value="主治医师">主治医师</Option>
                        <Option value="专家医师">专家医师</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="age"
                        label="年龄"
                        hidden={this.notDoctor}
                    >
                        <Input placeholder="请输入年龄" defaultValue={this.props.userInfo.userData.userInfo.age}/>
                    </Form.Item>

                    <Form.Item
                        name="workYears"
                        label="从业年数"
                        hidden={this.notDoctor}
                    >
                        <Input placeholder="请输入从业年数" defaultValue={this.props.userInfo.userData.userInfo.workYears}/>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="个人简介"
                        hidden={this.notDoctor}
                    >
                        <Input.TextArea placeholder="请输入个人简介" autoSize={{ minRows: 3, maxRows: 6 }} 
                            defaultValue={this.props.userInfo.userData.userInfo.description}/>
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}