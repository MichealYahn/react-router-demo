import React,{Component} from "react"
import { Link } from "react-router-dom"

export default class City extends Component{
  render(){
    return(
      <div>
        城市:
        <ul>
          <li>
            <Link to="/city/ssarea">松山</Link>
          </li>
          <li>
            <Link to="/city/hsarea">红山</Link>
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
