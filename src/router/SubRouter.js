import React,{Component} from "react"
import {Switch} from "react-router-dom"
import City from "../container/City"
import Detail from "../container/Detail"
import Home from "../container/Home"
import NotFound from "../container/404"
import CityRouter from "./CityRouter"
import Ques from "../container/Ques"
import QuesDetail from "../container/Ques/detail"
import PrivateRoute from "./PrivateRoute"

export default class SubRouter extends Component{
  render(){
    return(
      <Switch>
        { /* exact:精准匹配路径 */ }
        <PrivateRoute exact path="/" component={Home}></PrivateRoute>
        <PrivateRoute exact path="/ques" component={Ques}></PrivateRoute>
        <PrivateRoute path="/ques/detail/:id" component={QuesDetail}></PrivateRoute>
        <City path="/city">
          <PrivateRoute path="/" component={CityRouter}></PrivateRoute>
        </City>
        <PrivateRoute exact path="/kaka/detial/:id" component={Detail}></PrivateRoute>
        <PrivateRoute  component={NotFound}></PrivateRoute>
      </Switch>
    )
  }
}
