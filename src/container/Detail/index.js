import React,{Component} from "react";
import MyPage from "./MyPage"

export default class Detail extends Component{
  render(){
    return(
      <div>
        详情:{this.props.match.params.id}
        <MyPage/>
      </div>
    )
  }
}
