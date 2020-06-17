import React from 'react';
import { date, today } from '../../../shared/refData';
import classes from './DayBar.module.css'

function DayBar() {
   return (
      <div className={classes.whatday}>
         {date} {today}
      </div>
   );
}

export default DayBar;
