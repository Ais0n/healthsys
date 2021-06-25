import React from 'react';
import { Layout, Menu, Breadcrumb, Card, Button, Form, Input, Radio, Checkbox, Select, Result, List} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, LockOutlined} from '@ant-design/icons';
import keshijieshao from '../pic/keshijieshao.png'
import logo from '../pic/zj1hosp.jpg'
import depart_pic_A from '../pic/depart_A.png' 
import depart_pic_B from '../pic/depart_B.png' 
import depart_pic_C from '../pic/depart_C.png' 
import depart_pic_D from '../pic/depart_D.png' 

import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'
import './KeshiInfo.css'
import Myfooter from './Components/Myfooter';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

var itemList = [{
    title: "精神卫生科",
    person: "张三",
    tel: "15852758315",
    pic: depart_pic_A,
    description: "我平台精神卫生科是重点学科，省中医药重点学科，省省级保健基地医院指定专科保健中心-省心理保健中心，国家级精神卫生科规培基地，浙江省唯一中国AD培训基地，\
    同时是中国心理卫生协会老年心理卫生专业委员会、省医学会精神科分会的主委单位，荣获“中国百家百姓信赖的精神卫生专业服务机构”称号。\
    科室现有主任医师3人，副主任医师3人，主治医师3人，住院医师1人。所有医师都常年在临床一线工作，积累了丰富的经验 。每位医师均有其各自擅\
    长领域，专业覆盖成人精神病学、老年精神病学、中西医结合精神病学、儿童－青少年心理咨询与治疗、行为治疗等临床亚专业。科室病房位于我院望\
    江山院区，收治各类精神心理疾病患者。"
},{
    title: "麻醉科",
    person: "李四",
    tel: "18899102233",
    pic: depart_pic_B,
    description: "我平台拥有世界一流的麻醉科团队，拥有中心手术间27间，国际一流麻醉工作站4台，多功能麻醉机30余台、多功能麻醉监护仪、呼吸机、心脏除颤仪、全自动血液气体分析仪、麻醉深度监测\
    仪以及心排量监测仪等，多种先进的可视化设备包括多功能超声仪、困难气道设备如电子视频喉镜、纤维支气管镜、各种软镜等，以及多台血液自体回输装置等，年开展3.5万例次的临床麻醉及急危重症患者的抢救，\
    具有一流的麻醉手术设施和技术力量"
}, {
    title: "肾脏病科",
    person: "王五",
    tel: "19988283371",
    pic: depart_pic_C,
    description: "我平台肾脏病科为重点创新学科。科室由肾脏病病区、血液净化中心、肾脏病门诊、腹透随访室、肾病实验室、血管通\
    路中心等多个部门组成，其中有2个肾病病区，床位共78张；透析机76台，CRRT机器5台，是一个集肾病、血液净化、腹透、肾移植、实验室于一体的肾\
    脏病诊治中心。目前有医生28位（包括病理医生1位），研究员2位，护士48位。拥有主任医师5位，副主任医师7位，博士生导师1位，硕士生导师3位。\
    科室分为肾脏病理、腹膜透析、血管通路、DCD肾脏移植、中西医结合、肾脏病营养6个亚专科。科室年业务量门诊50000余例次；住院2500余例；血液\
    透析20000余例次；肾脏病理活检300余例/年；内瘘手术150余例/年；中心静脉透析导管置管300余例/年；腹膜透析手术38例/年；不断开展新技术：\
    整合血液净化技术、腹腔镜下腹膜透析导管置管术、内瘘狭窄PTA术、人造血管内瘘成形术、转位血管内瘘成形术等。科室近三年科研课题立项20项，\
    累计科研经费255万元。"
}, {
    title: "神经内科",
    person: "沈一",
    tel: "13399293318",
    pic: depart_pic_D,
    description: "浙江省人民医院神经内科创建于1984年，目前拥有固定床位100张，临床医师24人，其中博士9名，硕士13人；正高级专家3名，副高级专\
    家7名，中级骨干12名，住院医师4名。在门诊设置上，除满足神经内科常见病、多发病和疑难病的就诊需求之外，还开设了脑血管病、神经介入、肌张力\
    障碍以及眩晕症等专病门诊，尽量满足患者的亚专科就诊需求。在病房设置上，根据科室的学科优势和特色，分为5个医疗组。按照从专病、亚专科、再到\
    亚专科群的发展思路，科室对脑血管疾病的临床诊治进行了重点打造和升级。"
}];

class KeshiInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Myheader />
                <Navbar />
                <div className="keshiContent">
                    <div className="picture">
                        <img className="Gheader" src={keshijieshao} alt=""></img>
                    </div>
                    <Card title="科室介绍" className="mainCard">
                    <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                        console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={itemList}
                    renderItem={item => (
                        <List.Item
                        key={item.userId}
                        actions={[
                        ]}
                        extra={
                            <img
                            width={120}
                            height={120}
                            alt="logo"
                            src={item.pic}
                            style={{marginTop: "30px"}}
                            />
                        }
                        >
                        
                        <List.Item.Meta
                            title={item.title}
                            description={`科室负责人：${item.person} ${item.tel}`}
                        />
                            {item.description}
                        </List.Item>
                    )}
                    />
                    </Card>
                </div>
                <Myfooter/>
            </>
        );
    }
}

export default KeshiInfo;