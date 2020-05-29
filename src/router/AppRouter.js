import React,{Component} from "react"
import { Route,HashRouter,Switch } from "react-router-dom"
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
        <HashRouter basename="/gov_open">
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <App>
              <Route path="/" component={SubRouter}></Route>
            </App>
          </Switch>
        </HashRouter>
      </ConfigProvider>
    )
  }
}
