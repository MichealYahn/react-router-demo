import React, { Component } from 'react';
import { Form, Row, Col, Button ,DatePicker,TreeSelect} from 'antd';

const { RangePicker } = DatePicker;

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
  },
];
const rangeConfig = {
  rules: [{ type: 'array', required: false, message: 'Please select time!' }],
};

const onFinish = values => {
  console.log('Received values of form: ', values);
};


export class AdvancedSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value:''};
  }
  componentDidMount() {
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
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={treeData}
                placeholder="Please select"
                treeDefaultExpandAll
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

export default class Loign extends Component{
  render(){
    return(<div></div>)
  }
}
