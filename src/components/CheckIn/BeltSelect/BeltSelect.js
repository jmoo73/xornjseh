import React from 'react';
import classes from './BeltSelect.module.css';
import { colors } from '../../../shared/refData';
import RoundButton from '../../UI/Button/RoundButton';
import NameSelect from '../NameSelect/NameSelect';
// import Announcement from './Announcement/Announcement'

const BeltSelect = props => {
   let beltCollection = (
      <div className={classes.wrapper}>
         {colors.map(clr => (
            <RoundButton
               key={clr}
               type="beltBig"
               beltColor={clr}
               chosen={props.currBelt === clr}
               clicked={() => props.beltClicked(clr)}
            />
         ))}
      </div>
   );

   // let announcement = !props.beltState ? <Announcement /> : null;
   let nameSelect = props.beltState ? (
      <NameSelect
         persons={props.persons}
         nameClicked={props.nameClicked}
         currBelt={props.currBelt}
         attender={props.attender}
      />
   ) : null;

   return (
      <React.Fragment>
         {beltCollection}
         {nameSelect}
      </React.Fragment>
   );
};

export default BeltSelect;
