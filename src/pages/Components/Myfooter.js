import './Myfooter.css';
import { Button, Input, Divider} from 'antd';
import React from 'react';
import {withRouter} from 'react-router-dom'

const { Search } = Input;

const onsearch = () => {
    console.log("search")
}

class Myfooter extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="myFooter">
                <Divider/>
                <div className="copyright">
                    copyright@2021 浙江大学计算机科学与技术学院《软件工程》项目组
                </div>
                <Divider/>
            </div>
        );
    };
};

export default withRouter(Myfooter);

