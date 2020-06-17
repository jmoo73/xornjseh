import React from "react";
import spinner from "./spinner2.gif";
import classes from './Spinner.module.css'

export default () => {
  return (
    <div className={classes.bGround}>
      <img
        src={spinner}
        alt="Loading..."
        className={classes.pic}
      />
    </div>
  );
};
