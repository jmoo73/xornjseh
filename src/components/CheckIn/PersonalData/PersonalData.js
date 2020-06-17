import React from 'react';
import Button from '../../UI/Button/Button';
import classes from './PersonalData.module.css';
import Calendar from './Calendar/Calendar';
import { date, today } from '../../../shared/refData';

function PersonalData(props) {
   let todayStartTest = (
      <React.Fragment>
         <div className={classes.today}>
            {date} {today} (Today)
         </div>
         <div className={classes.start}>
            Started on :{' '}
            {props.persons[props.id].startedOn
               ? props.persons[props.id].startedOn
               : '(unavailable)'}
         </div>
         <div className={classes.test}>
            Last tested on :{' '}
            {props.persons[props.id].testedOn
               ? props.persons[props.id].testedOn
               : '(unavailable)'}
         </div>
      </React.Fragment>
   );

   let calendar = props.personalAttendance.map(month => (
      <Calendar key={month[0]} month={month[0]} data={month[1]} />
   ));

   return (
      <React.Fragment>
         <div className={classes.wrapper}>
            <div className={classes.title}>Attendance</div>
            <div className={classes.name}>{props.persons[props.id].name}</div>
            <div className={classes.todayStartTest}>{todayStartTest}</div>
            <div className={classes.threeCalendars}>{calendar}</div>
            <Button
               btnType="finalSubmit"
               renderClickedState={true}
               clicked={props.whenSubmitClick}
            >
               Confirm
            </Button>
         </div>
      </React.Fragment>
   );
}

export default PersonalData;
