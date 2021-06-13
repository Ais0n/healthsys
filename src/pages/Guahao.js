import Gheader from '../pic/Gheader.png'
import doctor_profile from '../pic/default-profile.png'
import foot_picture from '../pic/foot_picture.jpg'
import './Mainpage.css'
import './Guahao.css'
import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'

import { Typography, Button, Input, Carousel, Radio } from 'antd';

function Guahao() {
  return (
    <div className="App">
      <Myheader/>
      <Navbar/>
      <div className="picture">
        <div>
          <img className="Gheader" src={Gheader} alt=""></img>
        </div>
      </div>

      <div className="text">

        <div className="text-title">
          <div className="g-title">名医预约</div>
          <div className="g-sub-title">上午8:00-12:00，下午14:00-17:30，晚上18:00-21:00</div>
        </div>
        <div className="sub-text-table2">
          <div className="sub-text-table-one-line">
            <div className="g-sub-text-table-title">科室筛选</div>
            <div className="g-vertical-split-line" />
            <div className="g-sub-text-table-title-2">
              <Radio.Group defaultValue="a" buttonStyle="solid" onChange={onchange}>
                <Radio.Button value='a'>全部</Radio.Button>
                <Radio.Button value='b'>精神卫生科</Radio.Button>
                <Radio.Button value='c'>内分泌科</Radio.Button>
                <Radio.Button value='d'>肾脏病科</Radio.Button>
                <Radio.Button value='e'>骨科</Radio.Button>
                <Radio.Button value='f'>口腔科</Radio.Button>
              </Radio.Group>
            </div>
          </div>

          <div className="sub-text-table-one-line">
            <div className="g-sub-text-table-title">就诊日期</div>
            <div className="g-vertical-split-line" />
            <div className="g-sub-text-table-title-2">
              <Radio.Group defaultValue="a" buttonStyle="solid" onChange={onchange}>
                <Radio.Button value='a'>全部</Radio.Button>
                <Radio.Button value='b'>今日</Radio.Button>
                <Radio.Button value='c'>指定日期</Radio.Button>
              </Radio.Group>
            </div>
          </div>

          <div className="sub-text-table-one-line">
            <div className="g-sub-text-table-title">就诊时段</div>
            <div className="g-vertical-split-line" />
            <div className="g-sub-text-table-title-2">
              <Radio.Group defaultValue="a" buttonStyle="solid" onChange={onchange}>
                <Radio.Button value='a'>全部</Radio.Button>
                <Radio.Button value='b'>上午</Radio.Button>
                <Radio.Button value='c'>下午</Radio.Button>
              </Radio.Group>
            </div>
          </div>


        </div>

        <div className="g-doctor-info-table">
          <div className="g-doctor-info">
            <img className="doctor-profile" src={doctor_profile} alt=""></img>
            <div className="doctor-info-1">张三</div>
            <div className="doctor-info-2">神经内科 主治医师</div>
            <div className="g-button"><Button type="primary">预约</Button></div>
          </div>
          <div className="g-doctor-info">
            <img className="doctor-profile" src={doctor_profile} alt=""></img>
            <div className="doctor-info-1">李四</div>
            <div className="doctor-info-2">骨科 专家医师</div>
            <div className="g-button"><Button type="primary">预约</Button></div>
          </div>
          <div className="g-doctor-info">
            <img className="doctor-profile" src={doctor_profile} alt=""></img>
            <div className="doctor-info-1">王五</div>
            <div className="doctor-info-2">口腔科 专家医师</div>
            <div className="g-button"><Button type="primary">预约</Button></div>
          </div>
          <div className="g-doctor-info">
            <img className="doctor-profile" src={doctor_profile} alt=""></img>
            <div className="doctor-info-1">鲁莹</div>
            <div className="doctor-info-2">口腔科 专家医师</div>
            <div className="g-button"><Button type="primary">预约</Button></div>
          </div>
          <div className="g-doctor-info">
            <img className="doctor-profile" src={doctor_profile} alt=""></img>
            <div className="doctor-info-1">夏冰</div>
            <div className="doctor-info-2">口腔科 专家医师</div>
            <div className="g-button"><Button type="primary">预约</Button></div>
          </div>
        </div>
      </div>

      <div className="picture">
        <img className="foot_picture" src={foot_picture} alt=""></img>
      </div>

      <footer>SE2021 Project</footer>
    </div>
  );
}
export default Guahao;