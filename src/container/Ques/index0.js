import React,{ Component } from "react";
import { Table ,Form, Row, Col, Input, Button, Checkbox} from 'antd';
import { Link } from "react-router-dom"
import MyPage from "../Common/MyPage"
import { httpPost } from "../../http"
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const tname = "问题列表";

const columns = [
  {
    title: 'ID',
    dataIndex: 'key',
  },
  {
    title: '标题',
    dataIndex: 'title',
    render: (text,record,index) => <Link to={record.detail}>{text}</Link>,
  },
  {
    title: '部门',
    dataIndex: 'deptName',
  },
  {
    title: '时间',
    dataIndex: 'askTime',
  },
];
let form;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


export default class Ques extends Component{
  constructor(){
    super()
    this.state={
      quesList:[],
      pageno:1,
      pagesize:10,
      total:0
    }
    this.handleCh = this.handleCh.bind(this);
  }


  updatePage(pageno,pagesize){
    httpPost("/api/list",{
      pageno:pageno,
      pagesize:pagesize
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      let datas = [];
      for (var i in data.result.list) {

        datas.push({
          detail:'ques/detail/'+data.result.list[i].quesId,
          key:data.result.list[i].quesId,
          title:data.result.list[i].title,
          deptName:data.result.list[i].deptName,
          askTime:data.result.list[i].askTime
        })
      }
      this.setState({
        quesList:datas,
        total:data.result.total
      })
    })
  }

  componentDidMount(){
    this.updatePage(this.state.pageno,this.state.pagesize);
  }

  handleCh(page){
    this.setState({
      pageno:page.current,
      pagesize:page.pageSize
    })
    this.updatePage(page.current,page.pageSize);
  }

  onFinish = values => {
    console.log('Success:', values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };



  render() {

      const { selectedRowKeys } = this.state;
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        selections: [
          Table.SELECTION_ALL,
          Table.SELECTION_INVERT,
          {
            key: 'odd',
            text: 'Select Odd Row',
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                  return false;
                }
                return true;
              });
              this.setState({ selectedRowKeys: newSelectedRowKeys });
            },
          },
          {
            key: 'even',
            text: 'Select Even Row',
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                  return true;
                }
                return false;
              });
              this.setState({ selectedRowKeys: newSelectedRowKeys });
            },
          },
        ],
      };
      return(
        <div>
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Col gutter={24}>
            <Row span={6}>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
            </Row>
            <Row span={6}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>
            </Row>
          </Col>
          <Col>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Form>
          <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.quesList} onChange={this.handleCh} pagination={{ total:this.state.total, pageSize:"10"}}/>;
        </div>
      )
    }
}
