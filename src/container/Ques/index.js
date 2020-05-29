import React,{ Component } from "react";
import moment from 'moment';
import { Table, Divider, Space, Popconfirm, Button, UploadOutlined, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Link,withRouter } from "react-router-dom"
import { httpPost,httpGet } from "../../http"
import Search from './search.js'

const columns = [
  {
    title: 'ID',
    dataIndex: 'key',
  },
  {
    title: '标题',
    dataIndex: 'title',
    render: (text,record,index) => <Link to={'ques/detail/'+record.questionId}>{text}</Link>,
  },
  {
    title: '部门',
    dataIndex: 'deptName',
  },
  {
    title: '时间',
    dataIndex: 'regDate',
    render:(text) => moment(text).format("YYYY-MM-DD HH:mm:ss")
  },
  {
    title: '操作',
    render: (text,record,index) => {
      return <>
              <Link to={'ques/edit/'+record.questionId}>编辑 </Link>
              <Link to={'ques/edit/'+record.questionId}><span style={{color:"red"}}>申请退回 </span></Link>
              <Link to={'ques/edit/'+record.questionId}><span style={{color:"red"}}>申请延期 </span></Link>
              <Popconfirm title="确认删除" okText="确认" cancelText="取消"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={(e)=>deleteQues(record.questionId)}>
                <a><span style={{color:"red"}}>删除</span></a>
              </Popconfirm>

             </>
    },
  },
];

const deleteQues = (quesId)=>{
  httpPost("/gov_open/api/ques/delete/waudit",{quesIds:quesId})
  .then(res => {
    return res.json();
  })
  .then(data => {
    if(data.code ===1){
      window.location.reload()
    }else{
      message.warning(data.error);
    }
  })
}
const backQues = (quesId)=>{
  httpPost("/gov_open/api/ques/delete/waudit",{quesIds:quesId})
  .then(res => {
    return res.json();
  })
  .then(data => {
    if(data.code ===1){
      window.location.reload()
    }else{
      message.warning(data.error);
    }
  })
}
const applyUnOpenQues = (quesId)=>{
  httpPost("/gov_open/api/ques/delete/waudit",{quesIds:quesId})
  .then(res => {
    return res.json();
  })
  .then(data => {
    if(data.code ===1){
      window.location.reload()
    }else{
      message.warning(data.error);
    }
  })
}
const applyDelayQues = (quesId)=>{
  httpPost("/gov_open/api/ques/delete/waudit",{quesIds:quesId})
  .then(res => {
    return res.json();
  })
  .then(data => {
    if(data.code ===1){
      window.location.reload()
    }else{
      message.warning(data.error);
    }
  })
}

class Ques extends Component{
  constructor(){
    super()
    this.state={
      selectedRowKeys: [],
      loading: false,
      quesList:[],
      pageNo:1,
      pageSize:10,
      total:0
    }
  }

  updatePage(params){
    httpPost("/gov_open/api/ques/show/waudit",params)
    .then(res => {
      return res.json();
    })
    .then(data => {
      let datas = data.data.list
      for (var i in datas) {
        datas[i].key = datas[i].questionId
      }
      this.setState({
        quesList:datas,
        total:data.data.total
      })
    })
  }

  componentDidMount(){
    var params = {};
    params['pageNo'] = this.state.pageNo;
    params['pageSize'] = this.state.pageSize;
    this.updatePage(params);
  }

  handleCh = page =>{
    this.setState({
      pageNo:page.current,
      pageSize:page.pageSize
    })
    var params = {};
    params['pageNo'] = page.current;
    params['pageSize'] = page.pageSize;
    this.updatePage(params);
  }

  searchFinish = values => {
    var params = {};
    for(var v in values){
      if(typeof(values[v]) != 'undefined'){
        if(v.indexOf('Date')>-1){
          params[v] = values[v].format('YYYY-MM-DD');
        }else{
          params[v] = values[v]
        }
      }

    }
    params['pageNo'] = 1;
    params['pageSize'] = this.state.pageSize;
    this.updatePage(params);
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  render() {

      const { selectedRowKeys, loading } = this.state;
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        selections: [
          {
            key: 'invertChoose',
            text: '反选',
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (this.state.selectedRowKeys.indexOf(key) > -1) {
                  return false;
                }
                return true;
              });
              this.setState({ selectedRowKeys: newSelectedRowKeys });
            },
          },
          {
            key: 'odd',
            text: '单数行',
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
            text: '偶数行',
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
      const hasSelected = selectedRowKeys.length > 0;

      return(
        <div>
          <Search searchFinish={this.searchFinish} />
          <Divider />
          <Space style={{ marginBottom: 16 }}>
            <Popconfirm title="批量申请不公开" okText="确定" cancelText="取消" disabled={!hasSelected}
              onConfirm={(e)=>applyUnOpenQues(this.state.selectedRowKeys)}>
              <Button type="danger" loading={loading} >批量申请不公开</Button>
            </Popconfirm>
            <Popconfirm title="批量申请延期" okText="确定" cancelText="取消" disabled={!hasSelected}
              onConfirm={(e)=>applyDelayQues(this.state.selectedRowKeys)}>
              <Button type="danger" loading={loading} >批量申请延期</Button>
            </Popconfirm>
            <Popconfirm title="批量退回" okText="确定" cancelText="取消" disabled={!hasSelected}
              onConfirm={(e)=>backQues(this.state.selectedRowKeys)}>
              <Button type="danger" loading={loading} >批量退回</Button>
            </Popconfirm>

            <Popconfirm title="批量删除" okText="确定" cancelText="取消" disabled={!hasSelected}
              onConfirm={(e)=>deleteQues(this.state.selectedRowKeys)}>
              <Button type="danger" loading={loading} >批量删除</Button>
            </Popconfirm>
          </Space>

          <Table rowSelection={rowSelection} columns={columns}
            dataSource={this.state.quesList}
            onChange={this.handleCh}
            pagination={{
              total:this.state.total,
              pageSize:this.state.pageSize,
              pageSizeOptions:["5","10","15","20"]
            }}/>
        </div>
      )
    }
}
export default withRouter(Ques);
