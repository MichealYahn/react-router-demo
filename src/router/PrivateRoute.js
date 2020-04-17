import React, {Component} from 'react';
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
      httpPost("/api/auth/check",{})
      .then(res => {
        return res.json();
      })
      .then(data => {
        if(data.code === 1){
          this.setState({
            isAuthenticated:data.msg
          })
          if(!data.msg){
              this.props.history.replace("/login");
          }
        }
      }).catch((err) =>{
        this.props.history.replace("/login");
      })

    }

    render() {
        let { component: Component, ...rest} = this.props;
        return  this.state.isAuthenticated ?
        (<Route {...rest} render={(props) => ( <Component {...props} />
            )}/> ) : (<p>请登录...</p>)

    }
}

export default withRouter(PrivateRoute);
