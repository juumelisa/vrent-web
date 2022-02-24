import React, {Component} from "react";
import Footer from "./Footer";
import HeaderA from './HeaderA'

export default class Layout extends Component{
    render(){
        return(
            <>
                <HeaderA/>
                {this.props.children}
                <Footer></Footer>
            </>
        )
    }
}