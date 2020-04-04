import React,{Component} from "react"
import {Route,Switch} from "react-router-dom"
import City from "../container/City"
import Detail from "../container/Detail"
import Home from "../container/Home"
import Login from "../container/Login"
import NotFound from "../container/404"
import CityRouter from "./CityRouter"
import Ques from "../container/Ques"
import QuesDetail from "../container/Ques/detail"

export default class SubRouter extends Component{
  render(){
    return(
      <Switch>
        { /* exact:精准匹配路径 */ }
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/ques" component={Ques}></Route>
        <Route path="/ques/detail/:id" component={QuesDetail}></Route>
        <City path="/city">
          <Route path="/" component={CityRouter}></Route>
        </City>
        <Route exact path="/kaka/detial/:id" component={Detail}></Route>
        <Route  path="/edit" component={Login}></Route>
        <Route  component={NotFound}></Route>
      </Switch>
    )
  }
}
