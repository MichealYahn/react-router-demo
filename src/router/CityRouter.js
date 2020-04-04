import React,{Component} from "react"
import {Route,Switch} from "react-router-dom"
import HSArea from "../container/City/HSArea"
import SSArea from "../container/City/SSArea"
import NotFound from "../container/404"

export default class SubRouter extends Component{
  render(){
    return(
      <Switch>
        { /* exact:精准匹配路径 */ }
        <Route path="/city/hsarea" component={HSArea}></Route>
        <Route path="/city/ssarea" component={SSArea}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    )
  }
}
