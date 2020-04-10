import React,{ Component } from "react";
import { Descriptions, Badge ,Button,Row, Col} from 'antd';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default class QuesDetail extends Component{
  constructor(){
    super()
    this.state={
      quesVo:[]
    }
    this.back = this.back.bind(this);
  }

  getQues(id){
    fetch("/api/detail/"+id)
      .then(res => {
        console.log(res);
        return res.json()
      })
      .then(data => {
        this.setState({
          quesVo:data
        })
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
          <Descriptions title="Ques Info" bordered>
            <Descriptions.Item label="标题">{this.state.quesVo.title}</Descriptions.Item>
            <Descriptions.Item label="部门">{this.state.quesVo.deptName}</Descriptions.Item>
            <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
            <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
            <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
            <Descriptions.Item label="提问时间" span={2}>
              {this.state.quesVo.askTime}
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
              <Badge status="processing" text="Running" />
            </Descriptions.Item>
            <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
            <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
            <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
            <Descriptions.Item label="Config Info">
              Data disk type: MongoDB
              <br />
              Database version: 3.4
              <br />
              Package: dds.mongo.mid
              <br />
              Storage space: 10 GB
              <br />
              Replication factor: 3
              <br />
              Region: East China 1<br />
            </Descriptions.Item>
          </Descriptions>

        <Row justify="center">
          <Col span={4}><Button type="dashed" onClick={this.back}>返回</Button></Col>
        </Row>
        </>
      );
    }
}
