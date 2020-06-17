import React from 'react';
import classes from './Line.module.css';

function Line() {
   return (
      <div className={classes.LineWrapper}>
         <div className={classes.Line}></div>
      </div>
   );
}

export default Line;
