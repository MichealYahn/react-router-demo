import React,{Component} from "react"
import { Route,BrowserRouter,Switch } from "react-router-dom"
import App from "../container/App.js"
import SubRouter from "./SubRouter"
import Login from "../container/Login"
import PrivateRoute from "./PrivateRoute"

export default class AppRouter extends Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <App>
            <Route path="/" component={SubRouter}></Route>
          </App>
        </Switch>
      </BrowserRouter>
    )
  }
}
