import React from "react";
import classes from "./Loader.module.css";

function Loader() {
  return (
    <div className={classes.loader}>
      <h3>Loading...</h3>
    </div>
  );
}

export default Loader;
