import React, { useState } from 'react';
import { Typography, Button, Input, Form, Checkbox} from 'antd';
import { Layout } from 'antd'
import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'

class LoginSucceed extends React.Component {
    values=""
    constructor(props){
        super(props);
        this.values=""+(props.location.query)?props.location.query.values:null;
    }
    render(){
        return(
            <div>
            <Myheader/>
            <Navbar/>
                <div>
                <text>这是一个临时页面</text><p></p>
                    <text>log in successed</text>
                    <p></p>
                    <text>accountId: {this.values.accountId}</text>
                    <p></p>
                    <text>password: {this.values.password}</text>
                    <p></p>
                    <text>remember: {this.values.remember?"true":"false"}</text>
                </div>
              
            </div>
      )
    }
}
LoginSucceed.contextTypes = {router:()=>React.PropTypes.func.isRequired};
export default LoginSucceed