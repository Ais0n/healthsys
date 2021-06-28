import React, { createRef, Fragment } from "react";
import { ChatList, MessageList } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import { Button, Row, Col, Divider, Input, Card, Upload, message } from "antd";
import Myheader from './Myheader'
import Navbar from './Navbar'
import './ChatClient.css'
import { ConsoleSqlOutlined, UploadOutlined } from '@ant-design/icons';
import ws from "ws"
import localStorage from "localStorage"
import { getHistoryInfo, getDoctorInfo } from '../../utils/utils'
import { withRouter } from 'react-router-dom';
import doctor_avatar from '../../pic/I_am_doctor.png'


const size = {
    width: document.documentElement.clientWidth,
    hieght: document.documentElement.clientHeight
}
const { TextArea } = Input;
//let user_list = [];//一个列表，存储所有的聊天对象
//let msg_lists = {};//一个字典，键是聊天对象的名字，值是一个列表，这个列表中存储所有的消息


class ClientChatWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            user_list_: this.props.user_list_,
            msg_lists_: this.props.msg_lists_,
            current_user_list_: [],
            current_msg_lists_: {},
            current_doctors: [],
            current_msgs: {},
            sendMsg: "",
            window_size: {
                width: 700,
                height: 600
            },
            file: null,
            imagePreviewUrl: "",
        }
        this.onMsgSend = this.onMsgSend.bind(this);
        this.messagesEnd = createRef();
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.ws = new WebSocket('ws://localhost:8000/message');
        console.log('clientchatwidget constructor');
        console.log(this.state.user);
        console.log(this.state.user_list_);
        console.log('compare');
        console.log(this.props.msg_lists_);
        console.log(this.state.msg_lists_);
    }

    componentDidMount() {
        let fromClientId = this.getFromClientId()

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        this.ws.onopen = () => {
            console.log('connected')
            let fromClientId = this.getFromClientId();
            this.ws.send(JSON.stringify({
                from: fromClientId,
                to: "",
                message: this.state.sendMsg,
            }));
        }
        
        let msg_lists_tmp = this.state.msg_lists_
        
        this.ws.onmessage = evt => {
            let msg = JSON.parse(evt.data);
            if (msg.to == msg.from){
                console.log(msg.message);
            }
            else{
                let current_doctors_tmp = this.state.current_user_list_;
                let current_doctor = null;
                let doctors = this.state.user_list_;
                let current_msgs_tmp = this.state.current_msg_lists_;
                let msgs = this.state.msg_lists_;

                for (let i = 0; i < doctors.length; ++i) {
                    console.log("doctor.id" + doctors[i].id);
                    console.log("msg.from" + msg.from);
                    if (doctors[i].id == msg.from ) {
                        let is_in_list = false;
                        for (let j=0; j < current_doctors_tmp.length; ++j){
                            if (doctors[i] == current_doctors_tmp[j]){
                                is_in_list = true;
                                break;
                            }
                        }
                        if (is_in_list){
                            current_doctor = doctors[i];
                        }
                        else{
                            current_doctors_tmp.push(doctors[i]);
                            current_msgs_tmp[doctors[i].id] = msgs[doctors[i].id];
                            current_doctor = doctors[i];
                        }
                    }
                }
                console.log("current_doctor" + current_doctor);
                (msg_lists_tmp[current_doctor.id] || (msg_lists_tmp[current_doctor.id] = [])).push({
                    position: 'left',
                    type: 'text',
                    text: msg.message,
                    date: new Date()
                });
                console.log(doctors);
                console.log(msgs);
                console.log('current_doctors');
                console.log(current_doctors_tmp);
                console.log(current_msgs_tmp);
                this.setState({
                    current_doctors: current_doctors_tmp,
                    current_msgs: current_msgs_tmp,
                    user: current_doctors_tmp[0],
                })
            }
            
            console.log("print evt");
            console.log(evt);
            console.log(evt.data);
            
        }

        this.ws.onclose = () => {
            console.log('disconnected')
        }

        this.setState({ msg_lists_ : msg_lists_tmp})

    }

    componentWillReceiveProps(nextProps, nextContext) {
        //this.setState({ user: nextProps.user });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ window_size: { width: window.innerWidth, height: window.innerHeight } });
    }

    getFromClientId = () => {
        let user = JSON.parse(localStorage.getItem("userInfo"));
        return user.res.data.userData.userId;
    }

    getToClientId = () => {
        return this.state.user.id;
    }

    onMsgSend() {
        let msg_lists_tmp = this.state.msg_lists_
        console.log(msg_lists_tmp[this.state.user.id]);
        
        (msg_lists_tmp[this.state.user.id] || (msg_lists_tmp[this.state.user.id] = [])).push({
            position: 'right',
            type: 'text',
            text: this.state.sendMsg,
            date: new Date()
        });

        let fromClientId = this.getFromClientId();
        let toClientId = this.getToClientId();
        let sendMsg = this.state.sendMsg;

        this.ws.send(JSON.stringify({
                from: fromClientId,
                to: toClientId,
                message: sendMsg
            }));
        this.setState({ sendMsg: "" , msg_lists_ : msg_lists_tmp});
    }

    onPicSend = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    onChangeChatTgt = (e) => {
        let user_list_tmp = this.state.user_list_;
        for (let i = 0; i < user_list_tmp.length; ++i) {
            if (user_list_tmp[i] == e) {
                user_list_tmp[i].unread = 0;
            }
        }
        this.setState({
            nowChatTgt: e,
            user_list_: user_list_tmp
        });
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
    }

    render() {
        console.log('render2')
        //console.log(this.state.user.id);
        console.log(this.state.msg_lists_);
        console.log(this.state.user);
        return (
        <div>
            <Row align='middle' justify='center'>
            <Col style={{
                width: this.state.window_size.width * 0.2 - 2,
                height: 600,
                display: 'inline-block',
                borderRight: "2px solid #C4C4FF",
                overflow: "auto"
            }}>
                <ChatList className='chat-list' onClick={e => this.onChangeChatTgt(e)} dataSource={this.state.current_doctors} />
            </Col>
            <Col style={{
                width: this.state.window_size.width * 0.5,
                height: 600,
                display: 'inline-block',
            }}>
                <Row>
                    <Col style={{
                        width: this.state.window_size.width * 0.5,
                        height: 40,
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: 20
                    }}>
                        {this.state.user == null ? "" : this.state.user.title}
                    </Col>
                </Row>
                <Row>
                    <div style={{
                        width: this.state.window_size.width * 0.5,
                        height: 405,
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: 20,
                        overflow: "auto",
                        backgroundColor: "\t#F9F9FF"
                    }}
                        ref={(el) => {
                            this.messagesEnd = el;
                        }}
                    >
                        {this.state.current_doctors.length == 0 ?
                        <div>
                            暂无消息
                        </div>
                        :
                        <MessageList
                            className='message-list'
                            dataSource={this.state.current_msgs[this.state.user.id]}
                        />}
                    </div>
                </Row>
                <Row>
                    <Col style={{
                        width: this.state.window_size.width * 0.5,
                        height: 25,
                        textAlign: "right",
                        verticalAlign: "right",
                        backgroundColor: "\t#F0F0FF",
                        borderTop: "1px solid #B0B0FF",
                        // borderRight: "1px solid"
                    }}>
                    
                        <Upload name='file'
                            action=""
                            onChange={this.onPicSend}
                            showUploadList={false} >
                            <Button icon={<UploadOutlined />} size="small"></Button>
                        </Upload>
                    </Col>
                </Row>
                <Row>
                    <Col style={{
                        width: this.state.window_size.width * 0.5,
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: 20
                    }}>

                        <TextArea rows={4} onChange={e => {
                            this.setState({ sendMsg: e.target.value });
                        }}
                            ref={el => (this.inputRef = el)}
                            value={this.state.sendMsg} />
                    </Col>
                </Row>
                <Row>
                    <Col style={{
                        width: this.state.window_size.width * 0.5 - 1,
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: 20,
                        backgroundColor: "\t#F9F9FF"
                    }}>
                        <Button type="primary" onClick={this.onMsgSend}>发送</Button>
                    </Col>
                </Row>
            </Col>

            <Col style={{
                width: this.state.window_size.width * 0.2 - 2,
                height: 600,
                display: 'inline-block',
                borderLeft: "2px solid #C4C4FF",
                overflow: "auto",
                textAlign: "center",
                verticalAlign: "middle",
                backgroundColor: "\t#F9F9FF"
            }}>
                <h1 style={{ textAlign: 'center' }}>医生信息</h1>
                <ul align="left">
                    <li>{this.state.user == null ? "姓名: 暂无信息" : "姓名: " + this.state.user.title}</li>
                    <li>{this.state.user == null ? "所属医院: 暂无信息" : "所属医院: " + this.state.user.info.hospitalName}</li>
                    <li>{this.state.user == null ? "科室: 暂无信息" : "科室:" + this.state.user.info.keshi}</li>
                    <li>{this.state.user == null ? "工作经验: 暂无信息" : "工作经验: " + this.state.user.info.workYears + " 年"}</li>
                    <li>{this.state.user == null ? "性别: 暂无信息" : this.state.user.info.xingbie == 1 ? "性别: 男" : "性别: 女"}</li>
                    <li>{this.state.user == null ? "职称: 暂无信息" : "职称: " + this.state.user.info.zhicheng}</li>
                </ul>
            </Col>
            </Row>
        </div>
        );
    }
}

class ClientChatView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowChatTgt: null,
            user_list_: [],
            msg_lists_: {},
            window_size: {
                width: 700,
                height: 600
            },
            doctorInfoData: [],
            historyInfoData: [],
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    showDoctorInfo = async () => {
        getDoctorInfo().then(
        (doctorInfo)=>{
            console.log("doctorInfo");
            console.log(doctorInfo);
            message.success(doctorInfo.data.message);

            let user_list_tmp = []
            let msg_lists_tmp = {}
            for (let i = 0; i < doctorInfo.data.doctorInfo.length; ++i) {
                user_list_tmp.push({
                    avatar: doctor_avatar,
                    alt: '医生',
                    id: doctorInfo.data.doctorInfo[i]['userId'],
                    title: doctorInfo.data.doctorInfo[i]['userName'],
                    subtite: 'What are you doing?',
                    date: new Date(),
                    info: doctorInfo.data.doctorInfo[i]['userInfo'],
                });
                /*
                let m_list = [];
                for (let i = 0; i < 10; ++i){
                    m_list.push({
                        position: 'left',
                        type: 'text',
                        text: 'hello', //+ i + user_list[user_list.length - 1].title,
                        date: new Date()
                    });
                }  
                msg_lists_tmp[user_list_tmp[user_list_tmp.length - 1].title] = m_list; 
                */
            }

            this.setState({ nowChatTgt : user_list_tmp[0] });
            this.setState({ user_list_ : user_list_tmp });
            this.setState({ doctorInfoData: doctorInfo.data.doctorInfo });
        }, (doctorInfo) => {
            if (doctorInfo.isAxiiosError){
                message.error("网络异常");
            } else {
                message.error(doctorInfo.data.message);
            }
        })
    };


    loadHistoryInfo = async () => {
        getHistoryInfo().then(
        (historyInfo)=>{
            message.success(historyInfo.data.message);
            
            let msg_lists_tmp = {};
            
            for (let i = historyInfo.data.messageData.length-1; i >= 0; --i) {
                if (historyInfo.data.messageData[i]['in_out'] == 'in'){
                    (msg_lists_tmp[historyInfo.data.messageData[i]['opposite']] || (msg_lists_tmp[historyInfo.data.messageData[i]['opposite']] = [])).push({
                        position: 'left',
                        type: 'text',
                        text: historyInfo.data.messageData[i]['content'],
                        date: new Date()
                    })
                }
                else if (historyInfo.data.messageData[i]['in_out'] == 'out'){
                    (msg_lists_tmp[historyInfo.data.messageData[i]['opposite']] || (msg_lists_tmp[historyInfo.data.messageData[i]['opposite']] = [])).push({
                        position: 'right',
                        type: 'text',
                        text: historyInfo.data.messageData[i]['content'],
                        date: new Date()
                    })
                }
            }

            this.setState({ msg_lists_ : msg_lists_tmp});
            this.setState({ historyInfoData: historyInfo.data.messageData });
            //}
            /*
            this.setState(historyInfo: historyInfo.data)
            console.log('just test history info');
            console.log(historyInfo.data);
            for (let i = 0; i < this.state.doctorInfo.length; ++i) {
                let m_list = [];
                for (let i = 0; i < this.state.historyInfo.length)
            }
            */
        },
        (historyInfo) => {
            if (historyInfo.isAxiiosError){
                message.error("网络异常");
            } else {
                message.error(historyInfo.data.message);
            }
        })
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.showDoctorInfo();
        this.loadHistoryInfo();
    }

    onChangeChatTgt = (e) => {
        this.setState({ nowChatTgt: e });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ user: nextProps.user });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ window_size: { width: window.innerWidth, height: window.innerHeight } });
    }

    render() {
        return (
            <div>
                {this.state.user_list_.length == 0 ? 
                <div>
                没有已经启动的问诊
                </div>: 
                <ClientChatWidget user={this.state.nowChatTgt} user_list_={this.state.user_list_} msg_lists_={this.state.msg_lists_}/>
                }
            </div>
        );
    }
}

class Chatter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Myheader />
                <Navbar />
                <h2 style={{ textAlign: 'center' }}>用户你好，欢迎使用线上问诊功能</h2>
                <ClientChatView/>
            </div>
        )
    }
}
export default Chatter;
