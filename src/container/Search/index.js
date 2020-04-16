import React, { Component } from 'react';
import { Form, Row, Col, Button ,DatePicker,TreeSelect,Input} from 'antd';
import { httpPost } from "../../http"
const { RangePicker } = DatePicker;

const rangeConfig = {
  rules: [{ type: 'array', required: false, message: 'Please select time!' }],
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
  formRef = React.createRef();
  componentDidMount() {
    httpPost("/api/dept/list",{})
    .then(res => {
      return res.json();
    })
    .then(data => {
      this.setState({
        treeData:data.result
      })
    })
  }

  onChange = value => {
    this.setState({ value });
  };

  render(){
    return (
      <Form
        ref={this.formRef}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={this.props.searchFinish}
      >
        <Row gutter={24}>
          <Col span={8} key={55}>
            <Form.Item name="rangeTime" label="时间" {...rangeConfig}>
              <RangePicker placeholder={['开始时间','结束时间']}/>
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
          <Col span={8} key={56}>
            <Form.Item name="searchWord" label="名称">
              <Input style={{ width: '60%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button
              style={{ margin: '0 8px' }}
              onClick={() => {
                this.formRef.current.resetFields();
              }}
            >
              重置
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
