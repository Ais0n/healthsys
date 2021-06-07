import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Mainpage from './pages/Mainpage'
import Guahao from './pages/Guahao'
import Login from './pages/Login'
import Register from './pages/Register'
import LoginSucceed from './pages/LoginSucceed'
import RegisterSucceed from './pages/RegSucceed'
import User from './pages/User'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Mainpage}/>
        <Route path="/guahao" component={Guahao}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/loginsucceed" component={LoginSucceed}/>
        <Route path="/regsucceed" component={RegisterSucceed}/>
        <Route path="/user" component={User}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
