import React from 'react';
import classes from './SmallClassButton.module.css';

function SmallClassButton(props) {
   let smallClassButton = (
      <div className={classes.wrapper}>
         {props.classToday.map(cls => {
            let classStr = [classes.smallClassButton];
            if (cls[1] === props.currClass) classStr.push(classes.chosenClass);
            return (
               <button
                  key={cls[1]}
                  className={classStr.join(' ')}
                  onClick={() => props.whenClassClicked(cls[1])}
               >
                  {cls[1]}
               </button>
            );
         })}
      </div>
   );
   return <React.Fragment>{smallClassButton}</React.Fragment>;
}

export default SmallClassButton;
