import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Mainpage from './pages/Mainpage'
import Guahao from './pages/Guahao'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Mainpage}/>
        <Route path="/guahao" component={Guahao}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
