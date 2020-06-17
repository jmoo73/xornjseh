import React from 'react';
import SquareButton from '../../../UI/Button/SquareButton';
import classes from './Calendar.module.css';
import { daysShort, date } from '../../../../shared/refData';

const Calendar = props => {
   let month = <div className={classes.month}>{props.month}</div>;
   let week = (
      <div className={classes.week}>
         {daysShort.map(day => {
            let classStr = [classes.day];
            if (day === 'Sun') classStr.push(classes.red);
            return (
               <SquareButton key={day} size="flat">
                  <div className={classStr.join(' ')}>{day}</div>
               </SquareButton>
            );
         })}
      </div>
   );
   let calendar = (
      <div className={classes.calendar}>
         {props.data.map(item => {
            let day = item.date.split('/')[1];
            let howManyClasses = null;
            let bBreakSparring = [];
            let classStr = [classes.date];
            if (item.day === 'Sunday') classStr.push(classes.red);
            if (item.attendance) {
               howManyClasses = item.attendance.length;
               item.attendance.forEach(el => {
                  if (el.includes('Board')) bBreakSparring.push('Board');
                  if (el.includes('Spar')) bBreakSparring.push('Spar');
               });
            }

            return (
               <SquareButton
                  key={item.id}
                  size="small"
                  number={item.needDataFetch ? howManyClasses : 0}
                  transparent={item.needDataFetch ? false : true}
                  today={item.date === date}
                  start={item.start}
                  test={item.test}
               >
                  <div className={classes.contentWrapper}>
                     <div className={classStr.join(' ')}>{day}</div>
                     <div className={classes.attendance}>
                        {item.needDataFetch ? bBreakSparring.join(' ') : null}
                     </div>
                  </div>
               </SquareButton>
            );
         })}
      </div>
   );

   return (
      <div className={classes.wrapper}>
         {month}
         {week}
         {calendar}
      </div>
   );
};

export default Calendar;
