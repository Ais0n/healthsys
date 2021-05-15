import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar(){
    return(
        <div className="navigation">
            <NavLink to="/guahao" className="sub-navigation">首页</NavLink>
            <NavLink to="/guahao" className="sub-navigation">挂号</NavLink>
            <NavLink to="/guahao" className="sub-navigation">在线问诊</NavLink>
            <NavLink to="/guahao" className="sub-navigation">送药上门</NavLink>
            <NavLink to="/guahao" className="sub-navigation">个人中心</NavLink>
        </div>
    )
};