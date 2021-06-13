import React, { useState } from 'react';
import Gheader from '../pic/Gheader.png'
import doctor_profile from '../pic/default-profile.png'
import './Guahao.css'
import Myheader from './Components/Myheader'
import Navbar from './Components/Navbar'
import hosp from '../pic/zj1hosp.jpg'
import doc1 from '../pic/doc1.jpg'

import { Typography, Button, Input, Carousel, Radio, Card, Steps, message, Divider, Space, List, Avatar, Image, Modal } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import Myfooter from './Components/Myfooter';

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

const Guahao = () => {
  const [current, setCurrent] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chosenDoctor, setChosenDoctor] = useState({});

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    next();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <Myheader/>
      <Navbar/>
      <div className="guahaoContent">
        <div className="picture">
            <img className="Gheader" src={Gheader} alt=""></img>
        </div>
        <div className="mainCard">
          <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
          </Steps>

          {current === 0 && (<>
          <Card className="queryToolbarCard">
          <div className="sub-text-table2">
            <Space direction="vertical" style={{width: "100%"}} size="middle">
                <div className="sub-text-table-one-line">
                  <div className="g-sub-text-table-title">科室筛选</div>
                  <Divider type="vertical" className="g-vertical-split-line"/>
                  <div className="g-sub-text-table-title-2">
                      <Radio.Group defaultValue="a" buttonStyle="solid" onChange={onchange}>
                        <Space size={[8, 14]} wrap>
                          <Radio.Button value='a'>全部</Radio.Button>
                          <Radio.Button value='b'>精神卫生科</Radio.Button>
                          <Radio.Button value='c'>内分泌科</Radio.Button>
                          <Radio.Button value='d'>肾脏病科</Radio.Button>
                          <Radio.Button value='e'>骨科</Radio.Button>
                          <Radio.Button value='f'>口腔科</Radio.Button>
                          <Radio.Button value='g'>精神卫生科</Radio.Button>
                          <Radio.Button value='h'>内分泌科</Radio.Button>
                          <Radio.Button value='i'>肾脏病科</Radio.Button>
                          <Radio.Button value='j'>骨科</Radio.Button>
                          <Radio.Button value='k'>口腔科</Radio.Button>
                          <Radio.Button value='l'>精神卫生科</Radio.Button>
                          <Radio.Button value='m'>内分泌科</Radio.Button>
                          <Radio.Button value='n'>肾脏病科</Radio.Button>
                          <Radio.Button value='o'>骨科</Radio.Button>
                          <Radio.Button value='p'>口腔科</Radio.Button>
                        </Space>
                      </Radio.Group>
                    
                  </div>
                </div>
              
                <div className="sub-text-table-one-line">
                  <div className="g-sub-text-table-title">就诊日期</div>
                  <Divider type="vertical" className="g-vertical-split-line"/>
                  <div className="g-sub-text-table-title-2">
                    <Radio.Group defaultValue="a" buttonStyle="solid" onChange={onchange}>
                      <Space size={[8, 16]} wrap>
                        <Radio.Button value='a'>全部</Radio.Button>
                        <Radio.Button value='b'>今日</Radio.Button>
                        <Radio.Button value='c'>指定日期</Radio.Button>
                      </Space>
                    </Radio.Group>
                  </div>
                </div>

                <div className="sub-text-table-one-line">
                  <div className="g-sub-text-table-title">就诊时段</div>
                  <Divider type="vertical" className="g-vertical-split-line"/>
                  <div className="g-sub-text-table-title-2">
                    <Radio.Group defaultValue="a" buttonStyle="solid" onChange={onchange}>
                      <Space size={[8, 16]} wrap>
                        <Radio.Button value='a'>全部</Radio.Button>
                        <Radio.Button value='b'>上午</Radio.Button>
                        <Radio.Button value='c'>下午</Radio.Button>
                      </Space>
                    </Radio.Group>
                  </div>
                </div>

                <div className="toolbarGroup">
                  <Space type="horizontal" size="middle">
                    <Button type="primary" className="toolbarButton">查询</Button>
                    <Button className="toolbarButton">重置</Button>
                  </Space>
                </div>
            </Space>
          </div>
          </Card>

          <Card className="resultCard">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={listData}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <Button>查看详情</Button>,
                  <Button type="primary" onClick={()=>{
                    setChosenDoctor(item);
                    setIsModalVisible(true);
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
                  avatar={<Avatar size={100} src={doc1}/>}
                  title={item.title}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          />
          </Card></>)}

          {current === 1 && (<>
            <Card className="queryToolbarCard" title="确认挂号信息">
              
            </Card>
          </>)}

          <div className="steps-action">
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                完成
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                返回
              </Button>
            )}
          </div>
        </div>
      </div>
      <Myfooter/>


      <Modal title="预约确认" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        您确定要预约{chosenDoctor.title}医生吗？
      </Modal>
    </>
  );
}
export default Guahao;