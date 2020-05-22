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
    const { quesVo } = this.state;
      return (
        <>
          <Descriptions title="办件详情" bordered style={{backgroundColor:'#afafaf' }}>
            <Descriptions.Item label="办件编号">{quesVo.questionId}</Descriptions.Item>
            <Descriptions.Item label="标题">{quesVo.title}</Descriptions.Item>
            <Descriptions.Item label="部门">{quesVo.deptName}</Descriptions.Item>

            <Descriptions.Item label="查询码">{quesVo.code}</Descriptions.Item>
            <Descriptions.Item label="类型">{quesVo.keyword}</Descriptions.Item>
            <Descriptions.Item label="标签">{quesVo.keyword3}</Descriptions.Item>
            <Descriptions.Item label="提问时间">
              {moment(quesVo.regDate).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
              {quesVo.weituoState === 1?
                <Descriptions.Item label="委托时间">
                  {moment(quesVo.weituoDate).format("YYYY-MM-DD HH:mm:ss")}
              </Descriptions.Item>
              :null
              }
            <Descriptions.Item label="Status" span={3}>
              <Badge status="processing" text="Running" />
            </Descriptions.Item>
            <Descriptions.Item label="办件来源">{quesVo.sourceNameStr}</Descriptions.Item>
            <Descriptions.Item label="事发区域">
               {quesVo.city}{quesVo.qu}
               {quesVo.jiedao}{quesVo.address}
            </Descriptions.Item>
            <Descriptions.Item label="延期">{quesVo.delayDay}天</Descriptions.Item>
            <Descriptions.Item label="办件内容" span={3}>{quesVo.content}</Descriptions.Item>
            <Descriptions.Item label="答复内容" span={3}>{quesVo.answerContent}</Descriptions.Item>
            <Descriptions.Item label="网友信息" span={3}>
              <Descriptions bordered column={2}>
                <Descriptions.Item label="姓名" span={1}>{quesVo.truename}</Descriptions.Item>
                <Descriptions.Item label="联系电话" span={1}>{quesVo.phone}</Descriptions.Item>
                <Descriptions.Item label="电子邮件" span={1}>{quesVo.email}</Descriptions.Item>
                <Descriptions.Item label="联系地址" span={1}>{quesVo.userQu}</Descriptions.Item>
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
                    return <Timeline.Item key={quesHis.questionId}>
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
