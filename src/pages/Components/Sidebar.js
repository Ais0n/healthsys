/*菜单组件，所有的方法都要bind this*/

import React from 'react';
import {render} from 'react-dom';
import { UserOutlined, MobileOutlined, LockOutlined } from '@ant-design/icons';
import { Menu }from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

export default class Sidebar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            openKeys: ['sub1']
        }
    }

    onOpenChange = keys => {
        const latestOpenKey = keys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({
              openKeys: keys
          })
        } else {
          this.setState({
              openKeys: latestOpenKey ? [latestOpenKey] : []
            });
        }
    };
    

    handleClick = (e) => {
       /*这里要做判断，判断是点击哪个菜单，就跳转到相应的菜单内容，使用router进行跳转*/
        // if(e.key == "1"){
        //     this.props.caller.jump();
        // }
        console.log(e.key);
        this.props.caller.setState({
            current: e.key
        })
        this.setState({
            openKeys: e.keyPath.slice(1)
        });
    }

    onToggle(info) {
        console.log('onToggle', info);
        this.setState({
            openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
        });
    }


    getKeyPath(key) {
        const map = {
            sub1: ['sub1'],
            sub2: ['sub2'],
            sub3: ['sub2', 'sub3'],
            sub4: ['sub4'],
        };
        return map[key] || [];
    }

    render(){

        return(
            <div className="sidebar">
                <Menu
                    mode="inline" 
                    openKeys={this.state.openKeys}
                    selectedKeys={[this.props.caller.state.current]}
                    style={{ width: "100%" }}
                    onOpenChange={this.onOpenChange}
                    onClick={this.handleClick} /*触发菜单*/
                    >
                    <SubMenu key="sub1" title="基本设置">
                        <Menu.Item key="1">修改密码</Menu.Item>
                        <Menu.Item key="2">用户信息</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title="用户服务">
                        <Menu.Item key="7">app版本查询</Menu.Item>
                        <SubMenu key="sub3" title="app配置版本查询">
                            <Menu.Item key="3">导航配置查询</Menu.Item>
                            <Menu.Item key="4">广告配置查询</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="5">app changeLog</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title="用户服务">
                        <Menu.Item key="6">设置权限</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}