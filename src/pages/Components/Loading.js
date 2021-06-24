import React, { createRef, Fragment } from "react";
import { ChatList, MessageList } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import { Button, Row, Col, Divider, Input, Card, Upload, message } from "antd";
import Myheader from './Myheader'
import Navbar from './Navbar'
import './Loading.css'
import { ConsoleSqlOutlined, UploadOutlined } from '@ant-design/icons';
import ws from "ws"
import localStorage from "localStorage"
import { getUserInfo} from '../../utils/utils'
import { getHistoryInfo, getPatientInfo } from '../../utils/utils'
import { withRouter } from 'react-router-dom';


class ChatRoomLoading extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let userInfo = getUserInfo();
        let userPermission = userInfo.userData.userPermission;
        console.log(userPermission);

        if ( userPermission == 'doctor') {
            this.props.history.push({
                pathname:"/doctorchat",
                userData: userInfo.userData,
            });
        }
        else if ( userPermission == 'user') {
            this.props.history.push({
                pathname:"/clientchat",
                userData: userInfo.userData,
            });
        }
    }


    render() {
        return (
            <div>
                <Myheader/>
                <Navbar/>
                <h2 style={{ textAlign: 'center' }}>跳转中...</h2>
            </div>
        )
    }
}

export default ChatRoomLoading