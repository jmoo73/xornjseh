import React from 'react';
import classes from './WelcomeToClass.module.css';

function WelcomeToClass(props) {
   return (
      <div className={classes.wrapper}>
         Welcome to <span className={classes.text}>{props.cls}</span> class!
      </div>
   );
}

export default WelcomeToClass;
