import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";
import './Drawer.css';

class Drawer extends Component {

  clickHandler = () => {
    this.props.onClose();
  }

  renderLinks(links) {
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

    const links = [
      {to: '/', label: 'Quiz List', exact: 'true'}
    ]

    if (this.props.isAuthentificated) {
      links.push({to: '/quiz-creator', label: 'Quiz Creator', exact: 'false'})
      links.push({to: '/logout', label: 'LogOut', exact: 'false'})
    } else {
      links.push({to: '/auth', label: 'Auth', exact: 'false'});
    }

    return(
      <>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
        <nav className={cls.join(' ')}>
          <ul>
            { this.renderLinks(links) }
          </ul>
        </nav> 
      </>
    )
  }
}

export default Drawer;