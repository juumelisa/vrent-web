import React, {Component} from "react";
import { Link } from "react-router-dom";
import {FaChevronRight} from "react-icons/fa"

export default class HeaderVehiclesList extends Component{
    render(){
        return(
            <>
                
                <div className="heading-section d-flex align-items-center" style={{width: "100%"}}>
                    <h1 style={{width: "50%"}}>{this.props.child}</h1>
                    <div className="other-vehicles text-end" style={{width: "50%"}}>
                        <Link to={this.props.children} style={{color: "#1572A1"}}>View all <FaChevronRight className="ms-3"/></Link>
                    </div>
                </div>
            </>
        )
    }
}