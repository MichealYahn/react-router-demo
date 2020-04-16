import React,{Component} from "react"
import { Link } from "react-router-dom"
import { Layout, Menu, Breadcrumb,Dropdown,Row,Col,Modal,Form,Input,message} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined,DownOutlined,LogoutOutlined,FormOutlined ,LockOutlined } from '@ant-design/icons';
import { httpPost } from "../http"
import { createBrowserHistory } from 'history';


const history = createBrowserHistory();
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


export default class App extends Component{

  constructor(props){
    super(props)
    this.state={
      selectedKey:'1',
      openKey:'sub1',
      showPass:false
    }
  }

  formRef = React.createRef();

  updateMenu(pathname){
    let data = '';
    switch (pathname) {
      case "/":
        data='1';
        break;
      case "/ques":
        data='2';
        break;
      case "/edit":
        data='5';
        break;
      default:
        data='1';
    }
    this.setState({
      selectedKey:data
    })
  }

  componentDidMount(){
    this.updateMenu(history.location.pathname);
  }

  componentWillMount(){
    history.listen((location)=>{
      this.updateMenu(location.pathname);
    });
  }

  showPass = ()=>{
    this.setState({
      showPass: true,
    });
  }

  handleOk = e => {
    this.formRef.current
      .validateFields()
      .then(values => {
        let params = this.formRef.current.getFieldsValue();
        params['token']=window.sessionStorage.getItem('token');
        console.log(params);
        httpPost("/api/auth/change/senha",params)
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
        this.setState({
          showPass: false,
        });
        this.formRef.current.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });

  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      showPass: false,
    });
  };

  render(){
    return(
      <Layout>
        <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Row>
            <Col span="22">
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1" onClick={this.yinyao}>nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
              </Menu>
            </Col>
            <Col span="2">
              <Dropdown overlay={()=>{
                return(
                  <Menu>
                    <Menu.Item>
                      <a target="_blank" rel="noopener noreferrer" onClick={this.showPass}>
                        <FormOutlined />  修改密码
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a target="_blank" rel="noopener noreferrer" onClick={()=>{
                        window.sessionStorage.removeItem('token');
                        history.replace('/login');
                      }}>
                        <LogoutOutlined />  退出登录
                      </a>
                    </Menu.Item>
                  </Menu>
                )

              }}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  你好，皇上 <DownOutlined />
                </a>
              </Dropdown>
              <Modal
                title="修改密码"
                visible={this.state.showPass}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确认"
                cancelText="取消"
              >
                <Form
                  ref={this.formRef}
                  name="normal_login"
                  className="login-form"
                  onFinish={this.onFinish}
                >
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请填写原密码!' }]}
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} type="password" placeholder="原密码" />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    rules={[{ required: true, message: '请填写新密码!' }]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item
                    name="newPassword2"
                    rules={[{ required: true, message: '请再次填写新密码!' }]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Modal
                    title="提示信息"
                    visible={this.state.showModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                  >
                    <p>{this.state.errMsg}</p>
                  </Modal>
                </Form>
              </Modal>
            </Col>
          </Row>

        </Header>
        <Layout style={{ marginTop: 64 ,marginLeft: 200 }}>
          <Sider width={200} className="site-layout-background"
          style={{
            overflow: 'auto',
            height: '100%',
            position: 'fixed',
            left: 0,
          }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              selectedKeys={this.state.selectedKey}
              style={{ height: '200%', borderRight: 3 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <UserOutlined />
                    系统管理
                  </span>
                }
              >
                <Menu.Item key="1"><Link to="/" onClick={() => history.push('/')}>首页</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/ques" onClick={() => history.push('/ques')}>问题</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/city" onClick={() => history.push('/city')}>城市</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/kaka/detail/10001" onClick={() => history.push('/kaka/detail/10001')}>详情</Link></Menu.Item>
                <Menu.Item key="5"><Link to="/edit" onClick={() => history.push('/edit')}>编辑</Link></Menu.Item>

              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <LaptopOutlined />
                    subnav 2
                  </span>
                }
              >
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <NotificationOutlined />
                    subnav 3
                  </span>
                }
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
            {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
