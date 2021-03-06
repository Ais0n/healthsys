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
import { getHistoryInfo, getPatientInfo, getPatientInfoTmp } from '../../utils/utils'
import { withRouter } from 'react-router-dom';
import patient_avatar from '../../pic/I_am_patient.png'


const size = {
    width: document.documentElement.clientWidth,
    hieght: document.documentElement.clientHeight
}
const { TextArea } = Input;

let global_user_list_ = []
//let user_list = [];//一个列表，存储所有的聊天对象
//let msg_lists = {};//一个字典，键是聊天对象的名字，值是一个列表，这个列表中存储所有的消息


class DoctorChatWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            current_user_num: 0,
            //current_user_list_: this.props.current_user_list_,
            user_list_: this.props.user_list_,
            msg_lists_: this.props.msg_lists_,
            sendMsg: "",
            window_size: {
                width: 700,
                height: 600
            },
            file: null,
            imagePreviewUrl: "",
        }
        this.setState({ current_user_list_ : this.props.current_user_list_});
        this.onMsgSend = this.onMsgSend.bind(this);
        this.onPatientNext = this.onPatientNext.bind(this);
        this.messagesEnd = createRef();
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.ws = new WebSocket('ws://localhost:8000/message');
    }

    onChangeChatTgt = (e) => {
        let user_list_tmp = this.state.user_list_;
        for (let i = 0; i < user_list_tmp.length; ++i){
            if (user_list_tmp[i] == e){
                user_list_tmp[i].unread = 0;
            }
        } 
        this.setState({ nowChatTgt: e,
                        user_list_: user_list_tmp
                    });
    }

    onPatientNext = () => {
        message.success("开始与下一位患者咨询");
        //current_user_list_.push(this.props.user_list_[current_user_num_]);
        let user_list_tmp = this.state.user_list_;
        let msg_lists_tmp = this.state.msg_lists_;
        let current_user_num_ = this.state.current_user_num + 1;
        if (current_user_num_ >= this.state.user_list_.length){
            current_user_num_ = current_user_num_ - 1;
        }
        else{
            global_user_list_.push(this.props.user_list_[current_user_num_]);
        }

        this.setState({current_user_num : current_user_num_})
        this.setState({user : this.props.user_list_[current_user_num_]});

        let fromClientId = this.getFromClientId();
        let toClientId = this.props.user_list_[current_user_num_].id;
        (msg_lists_tmp[this.props.user_list_[current_user_num_].id] || (msg_lists_tmp[this.props.user_list_[current_user_num_].id] = [])).push({
            position: 'right',
            type: 'text',
            text: "您好，医生已完成叫号，线上咨询开始",
            date: new Date()
        });
        this.ws.send(JSON.stringify({
                from: fromClientId,
                to: toClientId,
                message: "您好，医生已完成叫号，线上咨询开始"
            }));
        
        
        this.setState({msg_lists_ : msg_lists_tmp});
        this.setState({user_list_ : user_list_tmp});
    }

    componentDidMount() {
        console.log('componentDidMount');
        console.log(this.props.msg_lists_);
        console.log(this.state.msg_lists_);
        console.log(this.props.user_list_);
        console.log(this.state.user_list_);
        let fromClientId = this.getFromClientId()

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        this.ws.onopen = () => {
            console.log('connected');
            let fromClientId = this.getFromClientId();
            this.ws.send(JSON.stringify({
                from: fromClientId,
                to: "",
                message: this.state.sendMsg,
            }));
            console.log('connected1');
        }
        
        let msg_lists_tmp = this.state.msg_lists_
        
        this.ws.onmessage = evt => {
            let msg = JSON.parse(evt.data);
            if (msg.to == msg.from){
                console.log(msg.message);
            }
            else{
                (msg_lists_tmp[this.state.user.id] || (msg_lists_tmp[this.state.user.id] = [])).push({
                    position: 'left',
                    type: 'text',
                    text: msg.message,
                    date: new Date()
                });
            }
            console.log("print evt");
            console.log(evt);
            console.log(evt.data);
            this.setState({msg_lists_ : msg_lists_tmp});
        }

        this.ws.onclose = () => {
            console.log('disconnected');
        }
        
        this.setState({ msg_lists_ : msg_lists_tmp})
        console.log("this.statemsg_lists_");
        console.log(this.state.msg_lists_);

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

    getFromClientId = () => {
        let user = JSON.parse(localStorage.getItem("userInfo"));
        return user.res.data.userData.userId;
    }

    getToClientId = () => {
        return this.state.user.id;
    }

    onMsgSend() {
        let msg_lists_tmp = this.state.msg_lists_;
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

    onChangeChatTgt = (e) => {
        let user_list_tmp = this.state.user_list_;
        for (let i = 0; i < user_list_tmp.length; ++i){
            if (user_list_tmp[i] == e){
                user_list_tmp[i].unread = 0;
            }
        } 
        this.setState({ nowChatTgt: e,
                        user: e,
                        user_list_: user_list_tmp
                    });
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
    }

    render() {
        console.log('render2');
        console.log(this.state.user.id);
        console.log(this.props.msg_lists_);
        console.log(this.state.msg_lists_);
        console.log(this.props.current_user_list_);
        console.log(this.state.current_user_list_);
        return (
        <div>
            <Col style={{width: this.state.window_size.width * 0.2 - 2,
                        height: 600,
                        display: 'inline-block',
                        borderRight: "2px solid #C4C4FF",
                        overflow: "auto"}}>
                <ChatList className='chat-list' onClick={e => this.onChangeChatTgt(e)} dataSource={global_user_list_} />
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
                        <MessageList
                            className='message-list'
                            dataSource={this.state.msg_lists_[this.state.user.id]}
                        />
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
                        width: this.state.window_size.width * 0.25 - 1,
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: 20,
                        backgroundColor: "\t#F9F9FF"
                    }}>
                        <Button type="primary" onClick={this.onMsgSend}>发送</Button>
                    </Col>
                    
                    <Col style={{
                        width: this.state.window_size.width * 0.25 - 1,
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: 20,
                        backgroundColor: "\t#F9F9FF"
                    }}>
                        <Button type="primary" onClick={this.onPatientNext}>叫号</Button>
                    </Col>
                    
                </Row>
            </Col>
        </div>
        );
    }
}


class DoctorChatView extends React.Component {
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
            patientInfoData: [],
            historyInfoData: [],
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    loadHistoryAndPatientInfo = async () => {
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
            this.setState({ msg_lists_ : msg_lists_tmp });
            this.setState({ historyInfoData: historyInfo.data.messageData });
        },
        (historyInfo) => {
            if (historyInfo.isAxiiosError){
                message.error("网络异常");
            } else {
                message.error(historyInfo.data.message);
            }
        })

    getPatientInfoTmp().then(
        (patientInfo) => {
            message.success(patientInfo.data.message);

            console.log("patientInfo");
            console.log(patientInfo);

            let user_list_tmp = []
            for (let i = 0; i < patientInfo.data.userInfo.length; ++i) {
                console.log(patientInfo);
                user_list_tmp.push({
                    //avator: "http://localhost:8000/images/" + patientInfo.data.userInfo.avator,
                    avatar: patient_avatar,
                    alt: '用户',
                    id: patientInfo.data.userInfo[i]['userId'],
                    title: patientInfo.data.userInfo[i]['userName'],
                    subtite: 'What are you doing?',
                    date: new Date(),
                    info: patientInfo.data.userInfo[i]['userInfo'],
                    unread: 1,
                });
            }

            let current_user_list_tmp = [];
            let chat_target = null;
            if (user_list_tmp.length != 0) {
                current_user_list_tmp.push(user_list_tmp[0]);
                chat_target = user_list_tmp[0];
                global_user_list_ = []
                global_user_list_.push(chat_target);
            }
            console.log(current_user_list_tmp);
            this.setState({
                current_user_list_: current_user_list_tmp,
                patientInfoData: patientInfo.data.userInfo,
                nowChatTgt: chat_target,
                user_list_: user_list_tmp,
            });

        }, (patientInfo) => {
            if (patientInfo.isAxiiosError) {
                message.error("网络异常");
            } else {
                message.error(patientInfo.data.message);
            }
        })

    }



    updateWindowDimensions() {
        this.setState({ window_size: { width: window.innerWidth, height: window.innerHeight } });
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.loadHistoryAndPatientInfo();
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
        console.log('render');
        console.log(this.state.user_list_);
        console.log(this.state.msg_lists_);
        console.log(this.state.current_user_list_);
        return (
            <div>
                <Row align='middle' justify='center'>
                    {this.state.user_list_.length == 0 ? 
                        <div>没有已经启动的问诊</div> : 
                        <DoctorChatWidget 
                        user={this.state.nowChatTgt} 
                        user_list_={this.state.user_list_} 
                        msg_lists_={this.state.msg_lists_} 
                        current_user_list_={this.state.current_user_list_}
                        />
                    }
                    <Col style={{width: this.state.window_size.width * 0.2 - 2,
                                height: 600,
                                display: 'inline-block',
                                borderLeft: "2px solid #C4C4FF",
                                overflow: "auto",
                                textAlign: "center",
                                verticalAlign: "middle",
                                backgroundColor: "\t#F9F9FF"}}>
                        <h1 style={{ textAlign: 'center' }}>用户信息</h1>
                        <ul align="left">
                            <li>{this.state.nowChatTgt == null ? "姓名: 暂无信息" : "姓名: " + this.state.nowChatTgt.title}</li>
                            <li>{this.state.nowChatTgt == null ? "性别: 暂无信息" : this.state.nowChatTgt.info.xingbie == 1 ? "性别: 男" : "性别: 女"}</li>
                        </ul>
                    </Col>
                </Row>
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
                <h2 style={{ textAlign: 'center' }}>医生你好，欢迎使用线上问诊功能</h2>
                <DoctorChatView/>
            </div>
        )
    }
}
export default Chatter;
