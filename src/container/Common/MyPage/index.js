import React,{Component} from "react"
import { Pagination } from 'antd';

export default class MyPage extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Pagination defaultCurrent={this.props.pageNo} total={this.props.total} />
    )
  }
}
