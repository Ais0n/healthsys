import React, { useState } from 'react';
import Gheader from '../pic/Gheader.png'
import doctor_profile from '../pic/default-profile.png'
import './Guahao.css'
import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'
import hosp from '../pic/zj1hosp.jpg'
import doc1 from '../pic/doc1.jpg'
import {withRouter} from 'react-router-dom'

import { Empty, Button, Input, Descriptions, Radio, Card, Steps, message, Divider, Space, List, Avatar, Image, Modal, Result, Alert } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import Myfooter from './Components/Myfooter';
import { queryDoctor } from '../utils/utils';

const { Step } = Steps;

const steps = [
  {
    title: '选择医师',
  },
  {
    title: '确认个人信息',
  },
  {
    title: '挂号完成',
  },
];


const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `第${i}位医师`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      '29岁 | 主治医师 | 心脑血管科 | 浙一医院',
    content:
      '王医师是一位敬业奉献、崇尚科学的医生，擅长治疗心脏病、脑血栓、血管硬化等多种疑难杂症，从医20多年来，一直默默奉献，广受患者好评。',
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

class Guahao extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      firstRender: true,
      isModalVisible: false,
      chosenDoctor: {},
      chosenKeshi: "精神卫生科",
      chosenDate: this.getFullDateOption(0),
      chosenWubie: "上午",
      chosenIsSpecialist: false,
      itemList: []
    }
  }

  showModal = () => {
    this.setState({
      isModalVisible: true
    });
  };

  handleOk = () => {
    this.setState({
      isModalVisible: false
    });
    this.next();
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false
    })
  };

  next = () => {
    this.setState({
      current: this.state.current+1
    })
  };

  prev = () => {
    this.setState({
      current: this.state.current-1
    })
  };

  onChangeKeshi = (e) => {
    this.setState({
      chosenKeshi: e.target.value
    });
  }
  
  onChangeDate = (e) => {
    this.setState({
      chosenDate: e.target.value
    });
  }

  onChangeWubie = (e) => {
    this.setState({
      chosenWubie: e.target.value
    });
  }

  onChangeIsSpecialist = (e) => {
    this.setState({
      chosenIsSpecialist: e.target.value
    });
  }

  jump = (path) => {
    const { history } = this.props;
    history.push(path);
    console.log(this.props.history);
  }

  getDateOption = (delta) => {
    var today = new Date();
    today.setDate(today.getDate()+delta);
    let month = today.getMonth()+1;
    let day = today.getDate();
    return `${month}月${day}日`;
  }

  getFullDateOption = (delta) => {
    var today = new Date();
    today.setDate(today.getDate()+delta);
    let year = today.getFullYear();
    let month = today.getMonth()+1;
    let day = today.getDate();
    let zero = (month<10) ? '0' : '';
    return `${year}-${zero}${month}-${day}`;
  }
  
  handleQuery = () => {
    let data = {
      date: this.state.chosenDate,
      keshi: this.state.chosenKeshi,
      wubie: this.state.chosenWubie,
      isSpecialist: this.state.chosenIsSpecialist
    }
    queryDoctor(data).then( (res) => {
      message.success(res.data.message);
      this.setState({
        firstRender: false,
        itemList: res.data.doctorInfo
      });
    }, (res) => {
      message.error(res.data.message);
      this.setState({
        firstRender: false,
        itemList: []
      });
    }).catch((err) => {
      message.error(err);
      this.setState({
        firstRender: false,
        itemList: []
      });
    })
  }

  selectResultCard = () => {
    if(this.state.firstRender) {
      return (
        <div style={{textAlign: "center"}}>请点击查询按钮开始搜索</div>
      )
    } else {
        let itemList = this.state.itemList;
        if(itemList.length == 0 ){
          return (<Empty description="暂无数据"/>);
        } else {
          return (
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
                    <Button>查看详情</Button>,
                    <Button type="primary" onClick={()=>{
                      this.setState({
                        chosenDoctor: item,
                        isModalVisible: true
                      })
                    }}>立即预约</Button>
                  ]}
                  extra={
                    <img
                      width={120}
                      height={120}
                      alt="logo"
                      src={hosp}
                    />
                  }
                >
                  
                  <List.Item.Meta
                        avatar={<Avatar size={100} src={`http://localhost:8000/images/${item.avatar}`}/>}
                        title={item.name}
                        description={`${item.age}岁 | ${item.hospitalName} | ${item.keshi} | 从医${item.workYears}年`}
                    />
                    {item.description}
                  </List.Item>
              )}
            />
          );
        }
      }
    }

  render(){
    return (
      <>
        <Myheader/>
        <Navbar/>
        <div className="guahaoContent">
          <div className="picture">
              <img className="Gheader" src={Gheader} alt=""></img>
          </div>
          <div className="mainCard">
            <Steps current={this.state.current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
            </Steps>

            {this.state.current === 0 && (<>
            <Card className="queryToolbarCard">
            <div className="sub-text-table2">
              <Space direction="vertical" style={{width: "100%"}} size="middle">
                  <div className="sub-text-table-one-line">
                    <div className="g-sub-text-table-title">科室筛选</div>
                    <Divider type="vertical" className="g-vertical-split-line"/>
                    <div className="g-sub-text-table-title-2">
                        <Radio.Group defaultValue={this.state.chosenKeshi} buttonStyle="solid" onChange={this.onChangeKeshi}>
                          <Space size={[8, 14]} wrap>
                            <Radio.Button value='精神卫生科'>精神卫生科</Radio.Button>
                            <Radio.Button value='内分泌科'>内分泌科</Radio.Button>
                            <Radio.Button value='肾脏病科'>肾脏病科</Radio.Button>
                            <Radio.Button value='骨科'>骨科</Radio.Button>
                            <Radio.Button value='口腔科'>口腔科</Radio.Button>
                            <Radio.Button value='眼科'>眼科</Radio.Button>
                            <Radio.Button value='普通外科'>普通外科</Radio.Button>
                            <Radio.Button value='普通内科'>普通内科</Radio.Button>
                            <Radio.Button value='放射科'>放射科</Radio.Button>
                            <Radio.Button value='检验科'>检验科</Radio.Button>
                            <Radio.Button value='耳鼻喉科'>耳鼻喉科</Radio.Button>
                            <Radio.Button value='急诊科'>急诊科</Radio.Button>
                            <Radio.Button value='妇科'>妇科</Radio.Button>
                            <Radio.Button value='肛肠科'>肛肠科</Radio.Button>
                            <Radio.Button value='保健科'>保健科</Radio.Button>
                          </Space>
                        </Radio.Group>
                      
                    </div>
                  </div>
                
                  <div className="sub-text-table-one-line">
                    <div className="g-sub-text-table-title">就诊日期</div>
                    <Divider type="vertical" className="g-vertical-split-line"/>
                    <div className="g-sub-text-table-title-2">
                      <Radio.Group defaultValue={this.state.chosenDate} buttonStyle="solid" onChange={this.onChangeDate}>
                        <Space size={[8, 16]} wrap>
                          <Radio.Button value={this.getFullDateOption(0)}>{this.getDateOption(0)}</Radio.Button>
                          <Radio.Button value={this.getFullDateOption(1)}>{this.getDateOption(1)}</Radio.Button>
                          <Radio.Button value={this.getFullDateOption(2)}>{this.getDateOption(2)}</Radio.Button>
                          <Radio.Button value={this.getFullDateOption(3)}>{this.getDateOption(3)}</Radio.Button>
                          <Radio.Button value={this.getFullDateOption(4)}>{this.getDateOption(4)}</Radio.Button>
                          <Radio.Button value={this.getFullDateOption(5)}>{this.getDateOption(5)}</Radio.Button>
                          <Radio.Button value={this.getFullDateOption(6)}>{this.getDateOption(6)}</Radio.Button>
                        </Space>
                      </Radio.Group>
                    </div>
                  </div>

                  <div className="sub-text-table-one-line">
                    <div className="g-sub-text-table-title">就诊时段</div>
                    <Divider type="vertical" className="g-vertical-split-line"/>
                    <div className="g-sub-text-table-title-2">
                      <Radio.Group defaultValue={this.state.chosenWubie} buttonStyle="solid" onChange={this.onChangeWubie}>
                        <Space size={[8, 16]} wrap>
                          <Radio.Button value='上午'>上午</Radio.Button>
                          <Radio.Button value='下午'>下午</Radio.Button>
                        </Space>
                      </Radio.Group>
                    </div>
                  </div>

                  <div className="sub-text-table-one-line">
                    <div className="g-sub-text-table-title">挂号类型</div>
                    <Divider type="vertical" className="g-vertical-split-line"/>
                    <div className="g-sub-text-table-title-2">
                      <Radio.Group defaultValue={this.state.chosenIsSpecialist} buttonStyle="solid" onChange={this.onChangeIsSpecialist}>
                        <Space size={[8, 16]} wrap>
                          <Radio.Button value={false}>普通门诊</Radio.Button>
                          <Radio.Button value={true}>专家门诊</Radio.Button>
                        </Space>
                      </Radio.Group>
                    </div>
                  </div>

                  <div className="toolbarGroup">
                    <Space type="horizontal" size="middle">
                      <Button type="primary" className="toolbarButton" onClick={this.handleQuery}>查询</Button>
                      <Button className="toolbarButton">重置</Button>
                    </Space>
                  </div>
              </Space>
            </div>
            </Card>

            <Card className="resultCard">
              {this.selectResultCard()}
            </Card></>)}

            {this.state.current === 1 && (<>
              <Card className="queryToolbarCard" title="确认挂号信息">
                <Space direction="vertical" style={{width: "90%", margin:"auto 5%"}} size="middle">
                  <Descriptions title="医生信息" size="default" style={{"marginBottom": "50px"}}>
                    <Descriptions.Item label="医生姓名">{this.state.chosenDoctor.title}</Descriptions.Item>
                    <Descriptions.Item label="科室">{this.state.chosenKeshi}</Descriptions.Item>
                    <Descriptions.Item label=""><Avatar size={100} src={doc1}/></Descriptions.Item>
                  </Descriptions>

                  <Descriptions title="患者信息" size="default" style={{"marginBottom": "50px"}}>
                    <Descriptions.Item label="患者姓名">张三</Descriptions.Item>
                  </Descriptions>
                </Space>

                <Button type="primary" style={{ margin: '0 8px' }} onClick={() => this.next()}>
                    确认
                </Button>
                <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                    返回
                </Button>
              </Card>
            </>)}

            {this.state.current === steps.length - 1 && (<>
              <Result
                status="success"
                title="挂号成功"
                subTitle="请携带个人身份证件按时进行就诊，可在【个人中心】查看挂号详情"
                extra={[
                  <Button type="primary" onClick={(e)=>{this.jump("/user")}}>
                    前往个人中心
                  </Button>,
                  <Button onClick={(e)=>{this.jump("/")}}>
                    返回首页
                  </Button>
                ]}
              />
            </>)}
          </div>
        </div>
        <Myfooter/>


        <Modal title="预约确认" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
          您确定要预约{this.state.chosenDoctor.title}医生吗？
        </Modal>
      </>
    );
  }
}
export default Guahao;