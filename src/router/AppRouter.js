import React,{Component} from "react"
import { Route,BrowserRouter } from "react-router-dom"
import App from "../container/App.js"
import SubRouter from "./SubRouter"

export default class AppRouter extends Component{
  render(){
    return(
      <BrowserRouter>
        <App>
          <Route path="/" component={SubRouter}></Route>
        </App>
      </BrowserRouter>
    )
  }
}
