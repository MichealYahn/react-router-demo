import React,{ Component } from "react";
import { Descriptions, Badge, Button, Row, Col, Timeline } from 'antd';
import { Link, withRouter } from "react-router-dom"
import { createBrowserHistory } from 'history';
import {httpGet} from '../../http'
import moment from 'moment';

const history = createBrowserHistory();

class QuesDetail extends Component{
  constructor(){
    super()
    this.state={
      quesVo:{},
      quesHisList:[],
      quesLogs:[]
    }
    this.back = this.back.bind(this);
  }

  getQues(id){
    httpGet("/api/ques/detail/waudit/"+id)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      this.setState({
        quesVo:data.data.vo,
        quesHisList:data.data.quesHisList,
        quesLogs:data.data.quesLogs
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  componentDidMount(){
    this.getQues(this.props.match.params.id);
  }

  back(){
    console.log("我看看这是啥："+history);
    console.log(history);
    history.listen((location)=>{
      console.log("你能听到吗？");
      console.log(location.pathname);
    });
    history.goBack();

  }

  render() {
      return (
        <>
          <Descriptions title="办件详情" bordered style={{backgroundColor:'#afafaf' }}>
            <Descriptions.Item label="办件编号">{this.state.quesVo.questionId}</Descriptions.Item>
            <Descriptions.Item label="标题">{this.state.quesVo.title}</Descriptions.Item>
            <Descriptions.Item label="部门">{this.state.quesVo.deptName}</Descriptions.Item>

            <Descriptions.Item label="查询码">{this.state.quesVo.code}</Descriptions.Item>
            <Descriptions.Item label="类型">{this.state.quesVo.keyword}</Descriptions.Item>
            <Descriptions.Item label="标签">{this.state.quesVo.keyword3}</Descriptions.Item>
            <Descriptions.Item label="提问时间">
              {moment(this.state.quesVo.regDate).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
              {this.state.quesVo.weituoState == 1?
                <Descriptions.Item label="委托时间">
                  {moment(this.state.quesVo.weituoDate).format("YYYY-MM-DD HH:mm:ss")}
              </Descriptions.Item>
              :null
              }
            <Descriptions.Item label="Status" span={3}>
              <Badge status="processing" text="Running" />
            </Descriptions.Item>
            <Descriptions.Item label="办件来源">{this.state.quesVo.sourceNameStr}</Descriptions.Item>
            <Descriptions.Item label="事发区域">
               {this.state.quesVo.city}{this.state.quesVo.qu}
               {this.state.quesVo.jiedao}{this.state.quesVo.address}
            </Descriptions.Item>
            <Descriptions.Item label="延期">{this.state.quesVo.delayDay}天</Descriptions.Item>
            <Descriptions.Item label="办件内容" span={3}>{this.state.quesVo.content}</Descriptions.Item>
            <Descriptions.Item label="网友信息" span={3}>
              <Descriptions bordered column={2}>
                <Descriptions.Item label="姓名">{this.state.quesVo.truename}</Descriptions.Item>
                <Descriptions.Item label="联系电话">{this.state.quesVo.phone}</Descriptions.Item>
                <Descriptions.Item label="电子邮件">{this.state.quesVo.email}</Descriptions.Item>
                <Descriptions.Item label="联系地址">{this.state.quesVo.userQu}</Descriptions.Item>
              </Descriptions>
            </Descriptions.Item>
            <Descriptions.Item label="处理流程">
                <Timeline>{
                  this.state.quesLogs.map((quesLog) => {
                    return <Timeline.Item>
                            {quesLog.opMethod}--
                            {moment(quesLog.opDate).format("YYYY-MM-DD HH:mm:ss")}
                            {quesLog.opMemo}
                           </Timeline.Item>;
                  })
                }</Timeline>
            </Descriptions.Item>
            <Descriptions.Item label="提问历史">
                <Timeline>{
                  this.state.quesHisList.map((quesHis) => {
                    return <Timeline.Item>
                              <Link to={'/ques/detail/'+quesHis.questionId}
                                onClick={() => history.push('/ques/detail/'+quesHis.questionId)}>
                               {quesHis.title}--{quesHis.deptName}--{quesHis.stateStr}--
                               {moment(quesHis.regDate).format("YYYY-MM-DD HH:mm:ss")}
                              </Link>
                             </Timeline.Item>;
                  })
                }</Timeline>
            </Descriptions.Item>
          </Descriptions>
        <Row justify="center">
          <Col span={4}><Button type="dashed" onClick={this.back}>返回</Button></Col>
        </Row>
        </>
      );
    }
}
export default withRouter(QuesDetail);
