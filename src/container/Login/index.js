import React,{Component} from "react"
import { Form, Input, Button, Checkbox,message } from 'antd';
import { withRouter} from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { httpPost } from "../../http"

class Login extends Component{

  onFinish = values => {
    httpPost("/api/auth/login",{
      username:values.username,
      password:values.password,
      imageCode:'1111'
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.code === 1) {
        window.sessionStorage.setItem("token",data.msg.token)
        this.props.history.replace('/');
      }else{
        message.warning(data.err);
      }
    })
    .catch((err)=>{
      message.warning(err.message);
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
          rules={[{ required: true, message: '请填写用户名!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请填写密码!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            忘记密码
          </a>
        </Form.Item>



        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          Or <a href="">现在去注册</a>
        </Form.Item>
      </Form>
    )
  }
}
export default withRouter(Login);
