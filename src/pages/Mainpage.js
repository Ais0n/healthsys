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

import { Typography, Button, Input, Carousel, Radio} from 'antd';
import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'
import React from 'react'

const { Title } = Typography;

let doctorList = {  'all':  [{'name': '张三','position': '精神卫生科 主任医师'},
                                  {'name': '李四','position': '内分泌科 主任医师'},
                                  {'name': '王五','position': '肾脏病科 主任医师'}],
                    'depart-a':  [{'name': '张三','position': '精神卫生科 主任医师'}],
                    'depart-b':  [{'name': '李四','position': '内分泌科 主任医师'}],
                    'depart-c':  [{'name': '王五','position': '肾脏病科 主任医师'}],
                    'pm'      :  [{'name': '张三','position': '精神卫生科 主任医师'}],
                    'am'      :  [{'name': '李四','position': '内分泌科 主任医师'}],
                    'today'   :  [{'name': '王五','position': '肾脏病科 主任医师'}],
                    'one-day' :  [{'name': '王五','position': '肾脏病科 主任医师'}],
                  };

let availableDoctorList = doctorList['all'] 

class Mainpage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {'showDoctorList': doctorList['all']}
    this.onchange = this.onchange.bind(this)
  }

  onchange(e) {
    this.setState({'showDoctorList': doctorList[e.target.value]})
}
  render() {return (
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
                    <Radio.Group defaultValue="all" buttonStyle="solid" onChange={this.onchange}>
                      <Radio.Button value='all'>全部</Radio.Button>
                      <Radio.Button value='depart-a'>精神卫生科</Radio.Button>
                      <Radio.Button value='depart-b'>内分泌科</Radio.Button>
                      <Radio.Button value='depart-c'>肾脏病科</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>

                <div className="sub-text-table-one-line">
                  <div className="sub-text-table-title">就诊日期</div>
                  <div className="vertical-split-line-2"/>
                  <div className="sub-text-table-title-2">
                    <Radio.Group defaultValue="all" buttonStyle="solid" onChange={this.onchange}>
                      <Radio.Button value='all'>全部</Radio.Button>
                      <Radio.Button value='today'>今日</Radio.Button>
                      <Radio.Button value='one-day'>指定日期</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>

                <div className="sub-text-table-one-line">
                  <div className="sub-text-table-title">就诊时段</div>
                  <div className="vertical-split-line-2"/>
                  <div className="sub-text-table-title-2">
                    <Radio.Group defaultValue="all" buttonStyle="solid" onChange={this.onchange}>
                      <Radio.Button value='all'>全部</Radio.Button>
                      <Radio.Button value='am'>上午</Radio.Button>
                      <Radio.Button value='pm'>下午</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              </div>

              <div className="doctor-info-table">
                {this.state.showDoctorList.map((item) => {
                  return (<div className="doctor-info">
                              <img className="doctor-profile" src={doctor_profile} alt=""></img>
                              <div className="doctor-info-1">{item['name']}</div>
                              <div className="doctor-info-2">{item['position']}</div>
                          </div>);
                  })
                }
              </div>
          </div>
      </div>

      <footer>SE2021 Project</footer>
    </div>
  )}
}

export default Mainpage;
