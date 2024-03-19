import React, {Component} from "react";
import Backdrop from "../../UI/Backdrop/Backdrop";
import './Drawer.css';

const links = [
  1, 2, 3
]

class Drawer extends Component {
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a href={link}>Link {link}</a>
        </li>
      )
    })
  }
  render() {
    let cls = ['Drawer'];
    if (!this.props.isOpen) {
      cls.push('closed')
    }
    return(
      <>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
        <nav className={cls.join(' ')}>
          <ul>
            { this.renderLinks() }
          </ul>
        </nav> 
      </>
    )
  }
}

export default Drawer;