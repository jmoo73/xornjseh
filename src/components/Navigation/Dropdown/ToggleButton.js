import React from 'react'
import classes from './ToggleButton.module.css';

function ToggleButton(props) {
  return (
    <div className={classes.ToggleButton} onClick={props.dropdownToggler}>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}

export default ToggleButton
