import React from 'react';
import { colors } from '../../../../shared/refData';
import classes from './ChooseBeltColor.module.css';
import RoundButton from '../../../UI/Button/RoundButton';

function ChooseBeltColor(props) {
  
   let beltCollection = colors.map(color => {
      return (
         <RoundButton
            type="belt"
            beltColor={color}
            chosen={color === props.currBeltColor}
            key={color}
            clicked={() => props.clicked(color)}
         >
            {color}
         </RoundButton>
      );
   });

   return <div className={classes.biggerBox}>{beltCollection}</div>;
}

export default ChooseBeltColor;
