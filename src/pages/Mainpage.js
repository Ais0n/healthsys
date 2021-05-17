import shuffle_pic_1 from '../pic/shuffle_pic_1.png' 
import patient_pic from '../pic/I_am_patient.png' 
import doctor_pic from '../pic/I_am_doctor.png' 
import depart_pic_A from '../pic/depart_A.png' 
import depart_pic_B from '../pic/depart_B.png' 
import depart_pic_C from '../pic/depart_C.png' 
import depart_pic_D from '../pic/depart_D.png' 
import depart_pic_E from '../pic/depart_E.png' 
import doctor_profile from '../pic/default-profile.png'
import './Mainpage.css'

import { useState } from 'react';
import { Typography, Button, Input, Carousel, Modal} from 'antd';
import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'

const { Title } = Typography;

function Mainpage() {
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
                  <img className="shuffle-pic" src={shuffle_pic_1} alt=""></img>
                </div>
                <div>
                  <img className="shuffle-pic" src={shuffle_pic_1} alt=""></img>
                </div>
                <div>
                  <img className="shuffle-pic" src={shuffle_pic_1} alt=""></img>
                </div>
              </Carousel>
          </div>

          <div className="sub-picture">
            <a href="#">
            <div className="doctor-patient">
                <img className="doctor-patient-pic" src={patient_pic} alt=""></img>
                <div className="doctor-patient-text-1">我是患者</div>
                <div className="doctor-patient-text-2">I'm a patient</div>
            </div>
            </a>

            <a href="#">
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
                <a href="#">
                <div className="department">
                    <img className="depart-pic" src={depart_pic_A} alt=""></img>
                    <div className="depart-text">精神卫生科</div>
                </div>
                </a>

                <a href="#">
                <div className="department">
                    <img className="depart-pic" src={depart_pic_B} alt=""></img>
                    <div className="depart-text">内分泌科</div>
                </div>
                </a>

                <a href="#">
                <div className="department">
                    <img className="depart-pic" src={depart_pic_C} alt=""></img>
                    <div className="depart-text">肾脏病科</div>
                </div>
                </a>

                <a href="#">
                <div className="department">
                    <img className="depart-pic" src={depart_pic_D} alt=""></img>
                    <div className="depart-text">神经内科</div>
                </div>
                </a>

                <a href="#">
                <div className="department">
                    <img className="depart-pic" src={depart_pic_E} alt=""></img>
                    <div className="depart-text">心血管内科</div>
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
              <div className="sub-text-table">
                <div className="sub-text-table-one-line">
                 <div className="sub-text-table-title">科室筛选</div>
                 <div className="vertical-split-line-2"/>
                 <div className="sub-text-table-title-2">
                     <input type="radio" name="depart" id="temp1" /><label for="temp1">全部</label>
                     <input type="radio" name="depart" id="temp2" /><label for="temp2">精神卫生科</label>
                     <input type="radio" name="depart" id="temp3" /><label for="temp3">内分泌科</label>
                     <input type="radio" name="depart" id="temp4" /><label for="temp4">肾脏病科</label>
                 </div>
                </div>

                <div className="sub-text-table-one-line">
                 <div className="sub-text-table-title">就诊日期</div>
                 <div className="vertical-split-line-2"/>
                 <div className="sub-text-table-title-2">
                     <input type="radio" name="date" id="temp1" /><label for="temp1">全部</label>
                     <input type="radio" name="date" id="temp2" /><label for="temp2">今日</label>
                     <input type="radio" name="date" id="temp3" /><label for="temp3">明日</label>
                     <input type="radio" name="date" id="temp4" /><label for="temp4">昨日</label>
                 </div>
                </div>

                <div className="sub-text-table-one-line">
                 <div className="sub-text-table-title">就诊时段</div>
                 <div className="vertical-split-line-2"/>
                 <div className="sub-text-table-title-2">
                     <input type="radio" name="time" id="temp1" /><label for="temp1">全部</label>
                     <input type="radio" name="time" id="temp2" /><label for="temp2">上午</label>
                     <input type="radio" name="time" id="temp3" /><label for="temp3">下午</label>
                 </div>
                </div>


              </div>

              <div className="doctor-info-table">
                <div className="doctor-info">
                    <img className="doctor-profile" src={doctor_profile} alt=""></img>
                    <div className="doctor-info-1">张三</div>
                    <div className="doctor-info-2">神经内科 主治医师</div>
                </div>
                <div className="doctor-info">
                    <img className="doctor-profile" src={doctor_profile} alt=""></img>
                    <div className="doctor-info-1">李四</div>
                    <div className="doctor-info-2">骨科 专家医师</div>
                </div>
                <div className="doctor-info">
                    <img className="doctor-profile" src={doctor_profile} alt=""></img>
                    <div className="doctor-info-1">王五</div>
                    <div className="doctor-info-2">口腔科 专家医师</div>
                </div>
              </div>
          </div>
      </div>



      <footer>SE2021 Project</footer>
    </div>
  );
}

export default Mainpage;
