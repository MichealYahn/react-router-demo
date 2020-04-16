import React,{ Component } from "react";
import { Table } from 'antd';
import { Link,withRouter } from "react-router-dom"
import { httpPost } from "../../http"
import { AdvancedSearchForm } from '../Search'

const columns = [
  {
    title: 'ID',
    dataIndex: 'key',
  },
  {
    title: '标题',
    dataIndex: 'title',
    render: (text,record,index) => <Link to={record.detail}>{text}</Link>,
  },
  {
    title: '部门',
    dataIndex: 'deptName',
  },
  {
    title: '时间',
    dataIndex: 'askTime',
  },
];


class Ques extends Component{
  constructor(){
    super()
    this.state={
      quesList:[],
      pageno:1,
      pagesize:10,
      total:0
    }
    this.handleCh = this.handleCh.bind(this);
  }

  updatePage(params){
    httpPost("/api/list",params)
    .then(res => {
      return res.json();
    })
    .then(data => {
      let datas = [];
      for (var i in data.result.list) {

        datas.push({
          detail:'ques/detail/'+data.result.list[i].quesId,
          key:data.result.list[i].quesId,
          title:data.result.list[i].title,
          deptName:data.result.list[i].deptName,
          askTime:data.result.list[i].askTime
        })
      }
      this.setState({
        quesList:datas,
        total:data.result.total
      })
    })
  }

  componentDidMount(){
    var params = {};
    params['pageno'] = this.state.pageno;
    params['pagesize'] = this.state.pagesize;
    this.updatePage(params);
  }

  handleCh(page){
    this.setState({
      pageno:page.current,
      pagesize:page.pageSize
    })
    var params = {};
    params['pageno'] = page.current;
    params['pagesize'] = page.pageSize;
    this.updatePage(params);
  }

  searchFinish = values => {
    var params = {};
    for(var i in values){
      if(values[i] !== null && values[i] !== '' && values[i] !== 'undefined'){
        params[i] = values[i]
      }
    }

    params['pageno'] = 1;
    params['pagesize'] = this.state.pagesize;
    console.log(params);
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
          <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.quesList} onChange={this.handleCh} pagination={{ total:this.state.total, pageSize:"10"}}/>;
        </div>
      )
    }
}
export default withRouter(Ques);
