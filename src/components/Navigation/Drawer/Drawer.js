import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";
import './Drawer.css';

const links = [
  {to: '/', label: 'Quiz List', exact: 'true'},
  {to: '/auth', label: 'Auth', exact: 'false'},
  {to: '/quiz-creator', label: 'Quiz Creator', exact: 'false'}
]

class Drawer extends Component {

  clickHandler = () => {
    this.props.onClose();
  }

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink 
            to={link.to}
            exact={link.exact}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
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