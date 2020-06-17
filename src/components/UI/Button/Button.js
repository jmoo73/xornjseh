import React from 'react';
import classes from './Button.module.css';

const Button = props => {
   const classList = [classes.Button, classes[props.btnType], classes[props.showClicked]];

   return (
      <button
         disabled={props.disabled}
         className={classList.join(' ')}
         onClick={props.clicked}
      >
         {props.children}
      </button>
   );
};

export default Button;
