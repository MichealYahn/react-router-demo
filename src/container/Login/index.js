import React,{Component} from "react"
import { Form, Input, Button, Checkbox,Modal } from 'antd';
import { withRouter} from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { httpPost,httpGet } from "../../http"

class Login extends Component{
  constructor(props){
    super(props)
    this.state={
      showModal:false,
      errMsg:''
    }
  }
  componentDidMount(){
    httpGet('');
  }

  onFinish = values => {
    console.log('Received values of form: ', values.username);
    httpPost("/api/login/in",{
      username:values.username,
      password:values.password,
      imageCode:'1111'
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.code == 1) {
        console.log(data.msg)
        window.sessionStorage.setItem("token",data.msg.token)
        this.props.history.replace('/');
      }else{
        this.setState({
          showModal:true,
          errMsg:data.err
        })
        console.log(data.err);
      }
    })
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      showModal: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      showModal: false,
    });
  };

  render(){
    return(
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>



        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <Modal
            title="提示信息"
            visible={this.state.showModal}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>{this.state.errMsg}</p>
          </Modal>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    )
  }
}
export default withRouter(Login);
