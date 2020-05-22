import React, {Component} from 'react';
import cookie from 'react-cookies'
import {Route, withRouter} from 'react-router-dom';
import { httpPost } from "../http"

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        }
    }

    componentWillMount() {
      var t = cookie.load('token')
      if(t){
        this.setState({
          isAuthenticated:true
        })
      }else{
        this.props.history.replace("/login");
      }


    }

    render() {
        let { component: Component, ...rest} = this.props;
        return  this.state.isAuthenticated ?
        (<Route {...rest} render={(props) => ( <Component {...props} />
            )}/> ) : (<p>请登录...</p>)

    }
}

export default withRouter(PrivateRoute);
