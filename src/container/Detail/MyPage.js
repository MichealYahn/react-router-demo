import React,{Component} from "react"
import { Pagination } from 'antd';

export default class MyPage extends Component{

  handleC(page, pageSize){
    console.log(pageSize);
    console.log(page);
  }

  handleD(page){
    console.log("你好"+page);
  }

  render(){
    return(
      <Pagination defaultCurrent={1} total={50} onChange={this.handleD} />
    )
  }
}
