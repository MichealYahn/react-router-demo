import React,{ Component } from "react";
import moment from 'moment';
import { Table, Divider, Space, Popconfirm, Button, message } from 'antd';
import { Link,withRouter } from "react-router-dom"
import { QuestionCircleOutlined } from '@ant-design/icons';
import { httpPost,httpGet } from "../../http"
import Search from './search.js'

const columns = [
  {
    title: 'ID',
    dataIndex: 'userId',
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    render: (text,record,index) => <Link to={'user/detail/'+record.userId}>{text}</Link>,
  },
  {
    title: '姓名',
    dataIndex: 'truename',
  },
  {
    title: '部门',
    dataIndex: 'deptId',
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
              <Link to={'user/edit/'+record.userId}>编辑 </Link>
              <Link to={'user/edit/'+record.userId}>退回 </Link>
              <Link to={'user/edit/'+record.userId}>延期 </Link>
              <Popconfirm title="确认删除" okText="确认" cancelText="取消"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={(e)=>deleteUser(record.userId)}>
                <a><span style={{color:"red"}}>删除</span></a>
              </Popconfirm>
             </>
    },
  },
];
const deleteUser = (quesId)=>{
  httpPost("/api/ques/delete/waudit",{quesIds:quesId})
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

class User extends Component{
  constructor(){
    super()
    this.state={
      selectedRowKeys: [],
      loading: false,
      list:[],
      pageNo:1,
      pageSize:10,
      total:0
    }
  }

  updatePage(params){
    httpGet("/api/user/show",params)
    .then(res => {
      return res.json();
    })
    .then(data => {
      let datas = data.data.list
      for (var i in datas) {
        datas[i].key = datas[i].userId
      }
      this.setState({
        list:datas,
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

            <Button type="primary">新增用户</Button>

            <Popconfirm title="批量删除" okText="确定" cancelText="取消" disabled={!hasSelected}
              onConfirm={(e)=>deleteUser(this.state.selectedRowKeys)}>
              <Button type="danger" loading={loading} >批量删除</Button>
            </Popconfirm>
          </Space>
          <Table rowSelection={rowSelection} columns={columns}
            dataSource={this.state.list}
            onChange={this.handleCh}
            pagination={{ total:this.state.total, pageSize:this.state.pageSize}}/>
        </div>
      )
    }
}
export default withRouter(User);
