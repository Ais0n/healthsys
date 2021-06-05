import React, { useState } from 'react';
import { Typography, Button, Input, Form, Checkbox} from 'antd';
import { Layout } from 'antd'
import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'

class RegisterSucceed extends React.Component {
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
                    <text>register successed</text>
                    <p></p>
                    <text>username: {this.values.userId}</text>
                    <p></p>
                    <text>gender: {this.values.xingbie}</text>
                </div>
              
            </div>
      )
    }
}
RegisterSucceed.contextTypes = {router:()=>React.PropTypes.func.isRequired};
export default RegisterSucceed