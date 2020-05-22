import React,{Component} from "react"
import { Route,BrowserRouter,Switch } from "react-router-dom"
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import App from "../container/App.js"
import SubRouter from "./SubRouter"
import Login from "../container/Login"
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('en');

export default class AppRouter extends Component{
  render(){
    return(
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <App>
              <Route path="/" component={SubRouter}></Route>
            </App>
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    )
  }
}
