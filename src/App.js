import './App.css';
import { BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Mainpage from './pages/Mainpage'
import Guahao from './pages/Guahao'
import Login from './pages/Login'
import Register from './pages/Register'
import LoginSucceed from './pages/LoginSucceed'
import RegisterSucceed from './pages/RegSucceed'
import User from './pages/User'
import ErrorPage from './pages/ErrorPage'
import DoctorChat from './pages/Components/ChatDoctor'
import ClientChat from './pages/Components/ChatClient'
import ChatRoomLoading from './pages/Components/Loading'
import KeshiInfo from './pages/KeshiInfo';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Mainpage}/>
        <Route path="/guahao" component={Guahao}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/loginsucceed" component={LoginSucceed}/>
        <Route path="/regsucceed" component={RegisterSucceed}/>
        <Route path="/user" component={User}/>
        <Route path="/keshiinfo" component={KeshiInfo}/>
        <Route path="/doctorchat" component={DoctorChat}/>
        <Route path="/clientchat" component={ClientChat}/>
        <Route path="/chatroomloading" component={ChatRoomLoading}/>
        <Route path="/:location" component={ErrorPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
