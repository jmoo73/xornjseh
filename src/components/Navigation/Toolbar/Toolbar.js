import React from "react";
import ToggleButton from "../Dropdown/ToggleButton"
import NavigationItems from "../NavigationItems/NavigationItems"
import classes from "./Toolbar.module.css"

function Toolbar(props) {
  let logo = 'TKD-manager';
  if (props.location) logo = logo + ' @ ' + props.location;

  return (
    <div className={classes.Toolbar}>
      <ToggleButton dropdownToggler={props.dropdownToggler} />
      <div style={{ color: "black", fontWeight: "bold"}}>{logo}</div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={props.isAuth} />
      </nav>
    </div>
  );
}

export default Toolbar;
