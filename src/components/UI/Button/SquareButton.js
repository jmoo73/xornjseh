import React from 'react';
import classes from './SquareButton.module.css';

const SquareButton = props => {
   let classStr = [classes.squareButton];
   if (props.size === 'small') {
      classStr = [classes.small];
      if (props.number === 1) {
         classStr.push(classes.one);
      }
      if (props.number === 2) {
         classStr.push(classes.two);
      }
      if (props.number >= 3) {
         classStr.push(classes.three);
      }
      if (props.today) {
         classStr.push(classes.today);
      }
      if (props.test) {
         classStr.push(classes.test);
      }
      if (props.start) {
         classStr.push(classes.start);
      }
      if (props.transparent) {
         classStr.push(classes.transparent);
      }
   }

   if (props.size === 'flat') {
      classStr.push(classes.flat);
   }

   return (
      <div>
         <button className={classStr.join(' ')} onClick={props.clicked}>
            {props.children}
         </button>
      </div>
   );
};

export default SquareButton;
