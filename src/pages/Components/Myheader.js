import './Myheader.css';
import { Button, Input } from 'antd';
import logo from '../../pic/icon.png';

const { Search } = Input;

const onsearch = () => {
    console.log("search")
}

export default function Myheader() {
    return (
        <div className="header">
            <img className="logo" src={logo} alt=""></img>
            <div className="title">阳光医疗服务平台</div>
            <div className="search"><Search placeholder="站内搜索" onSearch={onsearch} style={{ width: 200 }} /></div>
            <div className="vertical-split-line" />
            <div className="button"><Button type="primary">登录</Button></div>
            <div className="button"><Button>注册</Button></div>
        </div>
    );
};