import React,{ Component } from "react";
import moment from 'moment';
import { Table } from 'antd';
import { Link,withRouter } from "react-router-dom"
import { httpPost,httpGet } from "../../http"
import { AdvancedSearchForm } from '../Search'

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
  },
  {
    title: '操作',
    render: (text,record,index) => {
      return <>
              <Link to={'ques/edit/'+record.questionId}>编辑 </Link>
              <Link to={'ques/edit/'+record.questionId}>退回 </Link>
              <Link to={'ques/edit/'+record.questionId}>延期 </Link>
              <Link to={'ques/edit/'+record.questionId}>删除 </Link>
             </>
    },
  },
];


class Ques extends Component{
  constructor(){
    super()
    this.state={
      quesList:[],
      pageNo:1,
      pageSize:10,
      total:0
    }
    this.handleCh = this.handleCh.bind(this);
  }

  updatePage(params){
    httpGet("/api/ques/show/waudit",params)
    .then(res => {
      return res.json();
    })
    .then(data => {
      let datas = [];
      for (var i in data.data.list) {
        datas.push({
          questionId:data.data.list[i].questionId,
          key:data.data.list[i].questionId,
          title:data.data.list[i].title,
          deptName:data.data.list[i].deptName,
          regDate:moment(data.data.list[i].regDate).format("YYYY-MM-DD HH:mm:ss")
        })
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

  handleCh(page){
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

  render() {

      const { selectedRowKeys } = this.state;
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        selections: [
          Table.SELECTION_ALL,
          Table.SELECTION_INVERT,
          {
            key: 'odd',
            text: 'Select Odd Row',
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
            text: 'Select Even Row',
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
      return(
        <div>
          <AdvancedSearchForm searchFinish={this.searchFinish.bind(this)} />
          <Table rowSelection={rowSelection} columns={columns}
            dataSource={this.state.quesList}
            onChange={this.handleCh}
            pagination={{ total:this.state.total, pageSize:"10"}}/>
        </div>
      )
    }
}
export default withRouter(Ques);
