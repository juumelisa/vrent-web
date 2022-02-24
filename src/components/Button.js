import React from "react";

export class Button extends React.Component{
    state = {
        angka: this.props.num
    }
    addAngka = ()=>{
        this.setState({angka: parseInt(this.state.angka)+1})
    }
    minusAngka = ()=>{
        this.setState({angka: parseInt(this.state.angka)-1})
    }
    render(){
        return (
            <div>
                <button onClick={()=>this.minusAngka()}>-</button>
                {this.state.angka}
                <button onClick={()=>this.addAngka()}>+</button>
            </div>
        )
    }
}

export default Button