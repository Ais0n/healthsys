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
        <Route path="/:location" component={ErrorPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
