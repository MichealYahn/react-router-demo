import React,{Component} from "react"
import { Form, Input, Button, Upload, Switch, Row,Col, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { httpPost,httpGet } from "../../http"

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};


export default class Edit extends Component {
  constructor(){
    super()
    this.state={
      quesVo:{},
      fileList: [],
      uploading: false,
    }

  }
  formRef = React.createRef();

  componentDidMount(){
    this.getQues(this.props.match.params.id);
  }
  getQues(id){
    httpGet("/api/ques/detail/waudit/"+id)
    .then(res => {
      return res.json();
    })
    .then(data => {
      data.data.vo.aa = true;
      this.formRef.current.setFieldsValue({ques:data.data.vo})

      this.setState({
        quesVo:data.data.vo
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  handleUpload = () => {
    const { fileList,quesVo } = this.state;
    const formData = new FormData();
    const token = window.sessionStorage.getItem("token");
    formData.append('fileType',20);
    formData.append('questionId',quesVo.questionId);
    formData.append('token',token);
    console.log("文件的个数"+fileList.length);
    fileList.forEach(file => {
      formData.append('files', file);
    });
    console.log(formData);
    this.setState({
      uploading: true,
    });

    fetch('/api/ques/uploadFile', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .catch(error => {
      this.setState({
        uploading: false,
      });
      message.error(error.error);
    })
    .then(result => {
      this.setState({
        fileList: [],
        uploading: false,
      });
      message.success(result.message);
    });
  };

  onFinish = values => {

    values.ques.questionId = this.props.match.params.id;
    console.log(values);
    httpPost('/api/ques/submit/wreply',values.ques)
    .then(res => {
      return res.json()
    })
    .then(result => {
      console.log(result);
    })
    const { fileList } = this.state;
    if(fileList.length > 0){
      this.handleUpload();
    }

  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  onFill = () => {
    const temp = this.formRef.current.getFieldsValue()
    temp.lkDeptname = 'Hello world!';
    this.formRef.current.setFieldsValue({
      ques: temp,
    });
  };

  render() {

    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
        <Form.Item label="办件编号">
          <span className="ant-form-text" >{this.state.quesVo.questionId}</span>
        </Form.Item>
        <Form.Item label="办件标题">
          <span className="ant-form-text" >{this.state.quesVo.title}</span>
        </Form.Item>
        <Form.Item label="办件标签">
          <span className="ant-form-text" >{this.state.quesVo.tag}</span>
        </Form.Item>
        <Form.Item label="办件内容">
          <span className="ant-form-text" >{this.state.quesVo.content}</span>
        </Form.Item>
        <Form.Item label="办件内容">
          <span className="ant-form-text" >{this.state.quesVo.truename}</span>
        </Form.Item>
        <Form.Item label="答复内容" name={['ques', 'answerContent']}
          rules={[
            {
              required: true,
              message:"答复内容不能为空",
            },
          ]}
          >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="落款" extra="可以自动生成默认落款">
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item name={['ques','lkDeptname']} noStyle colon={false}><Input placeholder="部门"/></Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name={['ques','lkDate']} noStyle colon={false}><Input placeholder="日期"/></Form.Item>
            </Col>
            <Col span={6}>
              <Button htmlType="button" onClick={this.onFill}>
               生成
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="答复附件">
          <Upload.Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到这里</p>
            <p className="ant-upload-hint">支持一个或多个上传</p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item name={['ques', 'aa']} label="二次答复" valuePropName="checked"
        >
          <Switch/>
        </Form.Item>
        <Form.Item {...tailLayout} >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={this.onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
