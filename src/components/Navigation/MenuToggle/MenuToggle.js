import React from "react";
import './MenuToggle.css';

const MenuToggle = props => {
  let cls = [
    'MenuToggle'
  ];

  if (props.isOpen) {
    cls.push('opened');
  }

  return (
    <i 
      className={cls.join(' ')}
      onClick={props.onToggle}
    />
  )
}

export default MenuToggle;