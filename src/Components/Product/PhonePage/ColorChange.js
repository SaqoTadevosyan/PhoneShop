import React, { Component } from 'react';
import style from"./Phone.module.scss"
class ColorChange extends Component {
    state = { 
        selected:false
     }
     onSelect=()=>{
        let tmp=this.state.selected
         this.setState({selected:!tmp})
     }
    render() {
        return (
            <div className={style.color_choose}>
                <div onClick={()=>{
                    this.props.colorChange(this.props.imgLink,this.props.Color)
                }}>
          <input  type="radio"  name="color" value={this.props.Color} ></input>
          <label  forHtml="red"><span style={{backgroundColor: this.props.Color}} className={this.state.selected ? style.selectColor:null}></span></label>
        </div>
            </div>
        );
    }
}

export default ColorChange;