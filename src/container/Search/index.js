import React, { Component } from 'react';
import { Form, Row, Col, Button ,DatePicker,TreeSelect,Input,Select} from 'antd';
import { httpPost } from "../../http";
import keywords from "./jsonData.json"
const { Option } = Select;

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
    .then(result => {
      this.setState({
        treeData:result.data
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
          <Col span={4} key={53}>
            <Form.Item name="sePreDate" label="开始时间" >
              <DatePicker placeholder={['开始时间']} format="YYYY-MM-DD"/>
            </Form.Item>
          </Col>
          <Col span={4} key={55}>
            <Form.Item name="seEndDate" label="结束时间" >
              <DatePicker placeholder={['结束时间']}/>
            </Form.Item>
          </Col>
          <Col span={6} key={54}>
            <Form.Item name="selDept" label="部门" >
              <TreeSelect
                style={{ width: '80%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={this.state.treeData}
                placeholder="选择部门"
                treeDefaultExpandAll={false}
                onChange={this.onChange}
              />
            </Form.Item>
          </Col>
          <Col span={6} key={56}>
            <Form.Item name="searchWord" label="关键词">
              <Input style={{ width: '60%' }} />
            </Form.Item>
          </Col>
          <Col span={4} key={57}>
            <Form.Item name="seKeyword" label="类型">
              <Select 
                placeholder="类型"
                allowClear
                style={{ width: '80%' }}
              >
              {
                keywords.map(item => {
                  return (
                    <Option key={item.key} value={item.value}>{item.name}</Option>
                  )
                })
              }
              </Select>
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
