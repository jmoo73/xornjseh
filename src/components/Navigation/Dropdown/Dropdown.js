import React from "react";
import classes from "./Dropdown.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";

function Dropdown(props) {
  let attachedClasses = [classes.Dropdown, classes.Close];
  if (props.open) {
    attachedClasses = [classes.Dropdown];
  }
  return (
    <React.Fragment>
      <div className={attachedClasses.join(" ")} onClick={props.dropdownCloser}>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </React.Fragment>
  );
}

export default Dropdown;
