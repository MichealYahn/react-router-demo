import React,{Component} from "react"
import {Route,Switch} from "react-router-dom"
import Login from "../container/Login"
import App from "../container/App.js"
import SubRouter from "./SubRouter"

export default class AuthRouter extends Component{
  render(){
    return(
      <Switch>
        { /* exact:精准匹配路径 */ }
        <Route exact path="/login" component={Login}></Route>
        <App path="/">
          <Route path="/" component={SubRouter}></Route>
        </App>
      </Switch>
    )
  }
}
