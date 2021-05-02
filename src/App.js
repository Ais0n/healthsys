import logo from './icon.png';
import './App.css';
import { Typography, Button, Input } from 'antd';

const { Title } = Typography;
const { Search} = Input;
const onsearch = () => {
  console.log("search")
}

function App() {
  return (
    <div className="App">
      <div className="header">
        <img className="logo" src={logo} alt=""></img>
        <div className="title"><Title level="h2">阳光医疗服务平台</Title></div>
        <Search placeholder="input search text" onSearch={onsearch} style={{ width: 200 }} />
        <Button type="primary">登录</Button>
        <Button>注册</Button>
      </div>
      <footer> This is the game for the bootcamp in ByteDance</footer>
    </div>
  );
}

export default App;
