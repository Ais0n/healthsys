
import React from 'react';
import { Layout, Menu, Breadcrumb, Card, Button, Avatar, List, Form, Input, Radio, Checkbox, Select, message, Skeleton, Empty } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, LockOutlined, CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';
export default function CompButton(props){
    const [hid, sethid] = useState(false);
    return (
        <>
        <Button type="primary" hidden={hid} onClick={(e) => {
            props.handleApprove(props.userId);
            sethid(true);
        }}>同意申请</Button>
        <Button type="link" hidden={!hid} style={{color:"green"}}>
            <CheckOutlined/>已同意
        </Button>
        </>
    )
}
