import React, { Component } from 'react';
import { Form, Row, Col, Button ,DatePicker,TreeSelect} from 'antd';
import { httpPost } from "../../http"
const { RangePicker } = DatePicker;

const rangeConfig = {
  rules: [{ type: 'array', required: false, message: 'Please select time!' }],
};

const onFinish = values => {
  console.log('Received values of form: ', values);
};


export class AdvancedSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'',
      treeData:[{
        title: '',
        value: '',
        children:[]
      }]
    };
  }
  componentDidMount() {
    httpPost("/api/dept/list",{
      reqCheckSum:'1000000000000000',
      name:'nihao'
    })
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(data => {
      console.log(data);
      this.setState({
        treeData:data.result
      })
    })
  }

  onChange = value => {
    console.log(value);
    this.setState({ value });
  };

  render(){
    return (
      <Form
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={8} key={55}>
            <Form.Item name="rangeTime" label="时间" {...rangeConfig}>
              <RangePicker />
            </Form.Item>
          </Col>
          <Col span={8} key={54}>
            <Form.Item name="deptId" label="部门" >
              <TreeSelect
                style={{ width: '60%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={this.state.treeData}
                placeholder="选择部门"
                treeDefaultExpandAll={false}
                onChange={this.onChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
              style={{ margin: '0 8px' }}
              onClick={() => {
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }

};

export default class Search extends Component{
  render(){
    return(<div></div>)
  }
}
