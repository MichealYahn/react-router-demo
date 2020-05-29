import React,{ Component } from "react";
import { Descriptions, Badge, Button, Row, Col, Timeline } from 'antd';
import { Link, withRouter } from "react-router-dom"
import {httpGet} from '../../http'
import moment from 'moment';

class UserDetail extends Component{
  constructor(){
    super()
    this.state={
      userVo:{}
    }
  }

  getQues(id){
    httpGet("/api/user/detail/"+id)
    .then(res => {
      return res.json();
    })
    .then(data => {
      this.setState({
        userVo:data.data.vo
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  componentDidMount(){
    this.getQues(this.props.match.params.id);
  }

  render() {
    const { userVo } = this.state;
      return (
        <>
          <Descriptions title="用户详情" bordered style={{backgroundColor:'#afafaf' }}>
            <Descriptions.Item label="办件编号">{userVo.questionId}</Descriptions.Item>
            <Descriptions.Item label="标题">{userVo.title}</Descriptions.Item>
            <Descriptions.Item label="部门">{userVo.deptName}</Descriptions.Item>

            <Descriptions.Item label="查询码">{userVo.code}</Descriptions.Item>
            <Descriptions.Item label="类型">{userVo.keyword}</Descriptions.Item>
            <Descriptions.Item label="标签">{userVo.keyword3}</Descriptions.Item>
            <Descriptions.Item label="提问时间">
              {moment(userVo.regDate).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
              {userVo.weituoState === 1?
                <Descriptions.Item label="委托时间">
                  {moment(userVo.weituoDate).format("YYYY-MM-DD HH:mm:ss")}
              </Descriptions.Item>
              :null
              }
            <Descriptions.Item label="Status" span={3}>
              <Badge status="processing" text="Running" />
            </Descriptions.Item>
            <Descriptions.Item label="办件来源">{userVo.sourceNameStr}</Descriptions.Item>
            <Descriptions.Item label="事发区域">
               {userVo.city}{userVo.qu}
               {userVo.jiedao}{userVo.address}
            </Descriptions.Item>
            <Descriptions.Item label="延期">{userVo.delayDay}天</Descriptions.Item>
            <Descriptions.Item label="办件内容" span={3}>{userVo.content}</Descriptions.Item>
            <Descriptions.Item label="答复内容" span={3}>{userVo.answerContent}</Descriptions.Item>
            <Descriptions.Item label="网友信息" span={3}>
              <Descriptions bordered column={2}>
                <Descriptions.Item label="姓名" span={1}>{userVo.truename}</Descriptions.Item>
                <Descriptions.Item label="联系电话" span={1}>{userVo.phone}</Descriptions.Item>
                <Descriptions.Item label="电子邮件" span={1}>{userVo.email}</Descriptions.Item>
                <Descriptions.Item label="联系地址" span={1}>{userVo.userQu}</Descriptions.Item>
              </Descriptions>
            </Descriptions.Item>
          </Descriptions>
        <Row justify="center">
          <Col span={4}><Button type="dashed" onClick={()=>this.props.history.goBack()}>返回</Button></Col>
        </Row>
        </>
      );
    }
}
export default withRouter(UserDetail);
