import logo from './icon.png';
import './App.less';
import { Typography } from 'antd';

const { Title } = Typography;

function App() {
  return (
    <div className="App">
      <div className="header">
        <img className="logo" src={logo} alt=""></img>
        <Title level="h1">阳光医疗服务平台</Title>
      </div>
      <footer> This is the game for the bootcamp in ByteDance</footer>
    </div>
  );
}

export default App;
