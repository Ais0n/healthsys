import Gheader from '../pic/Gheader.png'
import reservation from '../pic/reservation.png'
import doctor_profile from '../pic/default-profile.png'
import './Mainpage.css'
import './Guahao.css'

import { Typography, Button, Input, Carousel} from 'antd';
import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'
function Guahao(){
    return(
        <div className="App">
        
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
                 <div className="g-vertical-split-line"/>
                 <div className="g-sub-text-table-title-2">
                     <input type="radio" name="depart" id="temp1" /><label for="temp1">全部</label>
                     <input type="radio" name="depart" id="temp2" /><label for="temp2">精神卫生科</label>
                     <input type="radio" name="depart" id="temp3" /><label for="temp3">内分泌科</label>
                     <input type="radio" name="depart" id="temp4" /><label for="temp4">肾脏病科</label>
                 </div>
                </div>

                <div className="sub-text-table-one-line">
                 <div className="g-sub-text-table-title">就诊日期</div>
                 <div className="g-vertical-split-line"/>
                 <div className="g-sub-text-table-title-2">
                     <input type="radio" name="date" id="temp1" /><label for="temp1">全部</label>
                     <input type="radio" name="date" id="temp2" /><label for="temp2">今日</label>
                     <input type="radio" name="date" id="temp3" /><label for="temp3">明日</label>
                     <input type="radio" name="date" id="temp4" /><label for="temp4">昨日</label>
                 </div>
                </div>

                <div className="sub-text-table-one-line">
                 <div className="g-sub-text-table-title">就诊时段</div>
                 <div className="g-vertical-split-line"/>
                 <div className="g-sub-text-table-title-2">
                     <input type="radio" name="time" id="temp1" /><label for="temp1">全部</label>
                     <input type="radio" name="time" id="temp2" /><label for="temp2">上午</label>
                     <input type="radio" name="time" id="temp3" /><label for="temp3">下午</label>
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
  
        <footer>SE2021 Project</footer>
      </div>
    );
}
export default Guahao;