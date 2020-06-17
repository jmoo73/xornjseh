import React from 'react';
import RoundButton from '../../../UI/Button/RoundButton';
import Loader from '../../../UI/Loader/Loader';
import classes from './ChooseNames.module.css';

function ChooseNames(props) {
   const testeesID = props.testees.map(testee => testee[1]);
   let beltGroup = (
      <div className={classes.membersWithBelt}>
         {props.persons.map(person => {
            return (
               <RoundButton
                  type="name"
                  chosen={
                     person.belt !== props.currBeltColor ||
                     testeesID.includes(person.id)
                  }
                  beltColor={person.belt}
                  key={person.id}
                  clicked={() => props.clicked([person.belt, person.id], 'add')}
               >
                  {person.name.split(' ')[0]}
               </RoundButton>
            );
         })}
      </div>
   );

   if (props.persons === undefined || props.persons.length === 0) {
      return <Loader />;
   } else {
      return <React.Fragment>{beltGroup}</React.Fragment>;
   }
}

export default ChooseNames;
