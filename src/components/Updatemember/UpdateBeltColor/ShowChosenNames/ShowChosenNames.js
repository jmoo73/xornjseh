import React from 'react';
import RoundButton from '../../../UI/Button/RoundButton';
import classes from './ShowChosenNames.module.css';

function ShowChosenNames(props) {
   let testees = props.testees.map(testee => {
      return (
         <RoundButton
            type="namePressed"
            key={testee[1]}
            beltColor={testee[0]}
            clicked={() => props.clicked(testee, 'remove')}
         >
            {props.persons[testee[1]].name.split(' ')[0]}
         </RoundButton>
      );
   });

   let submitButton = (
      <button
         className={classes.buttonBig}
         type="button"
         onClick={props.triggerSave}
      >
         <span>Submit</span>
      </button>
   );

   if (props.testees === undefined) {
      return <h3>Loading...</h3>;
   } else {
      return (
         <React.Fragment>
            <div>
               <div className={classes.choiceBox}>
                  {testees} {submitButton}
               </div>
            </div>
         </React.Fragment>
      );
   }
}

export default ShowChosenNames;
