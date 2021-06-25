import React from 'react'
import shuffle_pic_1 from '../pic/shuffle_pic_1.png' 
import shuffle_pic_2 from '../pic/shuffle_pic_2.jpg'
import shuffle_pic_3 from '../pic/shuffle_pic_3.jpg'
import patient_pic from '../pic/I_am_patient.png' 
import doctor_pic from '../pic/I_am_doctor.png' 
import depart_pic_A from '../pic/depart_A.png' 
import depart_pic_B from '../pic/depart_B.png' 
import depart_pic_C from '../pic/depart_C.png' 
import depart_pic_D from '../pic/depart_D.png' 
import depart_pic_E from '../pic/depart_E.png' 
import doctor_profile from '../pic/default-profile.png'
import more from '../pic/more.png'
import doc1 from '../pic/doc1.jpg'
import doc2 from '../pic/doc2.jpg'
import doc3 from '../pic/doc3.jpg'

import './Mainpage.css'

import { Typography, Button, Input, Carousel, Radio, Space} from 'antd';
import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'
import Myfooter from './Components/Myfooter'


const { Title } = Typography;

class Mainpage extends React.Component {

  handleBook = () => {
    this.props.history.push({
      pathname:"/guahao",
    });
  }

  render(){
    return (
      <div className="App">
        <Myheader/>
        <Navbar/>
        <div className="picture">
            <div className="sub-picture">
              <Carousel autoplay>
                  <div>
                    <img className="shuffle-pic" src={shuffle_pic_1} alt=""></img>
                  </div>
                  <div>
                    <img className="shuffle-pic" src={shuffle_pic_2} alt=""></img>
                  </div>
                  <div>
                    <img className="shuffle-pic" src={shuffle_pic_3} alt=""></img>
                  </div>
                </Carousel>
            </div>

            <div className="sub-picture">
              <a href="/guahao">
              <div className="doctor-patient">
                  <img className="doctor-patient-pic" src={patient_pic} alt=""></img>
                  <div className="doctor-patient-text-1">我是患者</div>
                  <div className="doctor-patient-text-2">I'm a patient</div>
              </div>
              </a>

              <a href="/chatroomloading">
              <div className="doctor-patient">
                  <img className="doctor-patient-pic" src={doctor_pic} alt=""></img>
                  <div className="doctor-patient-text-1">我是医生</div>
                  <div className="doctor-patient-text-2">I'm a doctor</div>
              </div>
              </a>
            </div>
        </div>


        <div className="text">
            <div className="sub-text">
                <div className="sub-text-title">
                  <div className="sub-title">找科室</div>
                  <div className="sub-sub-title">选择您要就诊的科室</div>
                </div>
                <div className="department-table">
                  <a href="/keshiinfo">
                  <div className="department">
                      <img className="depart-pic" src={depart_pic_A} alt=""></img>
                      <div className="depart-text">精神卫生科</div>
                  </div>
                  </a>

                  <a href="/keshiinfo">
                  <div className="department">
                      <img className="depart-pic" src={depart_pic_B} alt=""></img>
                      <div className="depart-text">内分泌科</div>
                  </div>
                  </a>

                  <a href="/keshiinfo">
                  <div className="department">
                      <img className="depart-pic" src={depart_pic_C} alt=""></img>
                      <div className="depart-text">肾脏病科</div>
                  </div>
                  </a>

                  <a href="/keshiinfo">
                  <div className="department">
                      <img className="depart-pic" src={depart_pic_D} alt=""></img>
                      <div className="depart-text">神经内科</div>
                  </div>
                  </a>

                  <a href="/keshiinfo">
                  <div className="department">
                      <img className="depart-pic" src={depart_pic_E} alt=""></img>
                      <div className="depart-text">心血管内科</div>
                  </div>
                  </a>

                  <a href="/keshiinfo">
                  <div className="department">
                      <img className="depart-pic" src={more} alt=""></img>
                      <div className="depart-text">更多</div>
                  </div>
                  </a>

                </div>
            </div>

            <div className="vertical-split-line-3" />

            <div className="sub-text">
                <div className="sub-text-title">
                  <div className="sub-title">找名医</div>
                  <div className="sub-sub-title">提前预约，足不出户</div>
                </div>             

                <div className="doctor-info-table">
                  <Space direction="horizontal" size="large">
                  <div className="doctor-info">
                      <img className="doctor-profile" src={doc1} alt=""></img>
                      <div className="doctor-info-1">张三</div>
                      <div className="doctor-info-2">神经内科 主治医师</div>
                      <Button type="primary" onClick={this.handleBook}>立即预约</Button>
                  </div>
                  <div className="doctor-info">
                      <img className="doctor-profile" src={doc2} alt=""></img>
                      <div className="doctor-info-1">李四</div>
                      <div className="doctor-info-2">骨科 专家医师</div>
                      <Button type="primary" onClick={this.handleBook}>立即预约</Button>
                  </div>
                  <div className="doctor-info">
                      <img className="doctor-profile" src={doc3} alt=""></img>
                      <div className="doctor-info-1">王五</div>
                      <div className="doctor-info-2">口腔科 专家医师</div>
                      <Button type="primary" onClick={this.handleBook}>立即预约</Button>
                  </div>
                  </Space>
                </div>
            </div>
        </div>
        <Myfooter/>
      </div>
    );
  }
}

export default Mainpage;
