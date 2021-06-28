import { NavLink } from 'react-router-dom';
import './Navbar.css';


export default function Navbar(){
    return(
        <div className="navigation">
            <NavLink to="/" className="sub-navigation">首页</NavLink>
            <NavLink to="/guahao" className="sub-navigation">挂号</NavLink>
            <NavLink to="/chatroomloading" className="sub-navigation">在线问诊</NavLink>
            <NavLink to="/guahao" className="sub-navigation">送药上门</NavLink>
            <NavLink to="/keshiinfo" className="sub-navigation">科室介绍</NavLink>
            <NavLink to="/user" className="sub-navigation">个人中心</NavLink>
        </div>
    )
};