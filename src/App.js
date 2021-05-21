import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Mainpage from './pages/Mainpage'
import Guahao from './pages/Guahao'
import Login from './pages/Login'
import LoginSucceed from './pages/LoginSucceed'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Mainpage}/>
        <Route path="/guahao" component={Guahao}/>
        <Route path="/login" component={Login}/>
        <Route path="/loginsucceed" component={LoginSucceed}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
