import React from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './WeeklyLogTableTable.module.css';
import { sixDays, sixDaysShort, weekDates } from '../../shared/refData';
import Cell from './Cell/Cell';

const now = new Date();
const sixDates = weekDates(now);

function WeeklyLogTable(props) {
   let dateRow = (
      <div className={classes.dateRow}>
         [{sixDates[0]} ~ {sixDates[5]}]
      </div>
   );

   let headerRow = (
      <div className={classes.rowWrapper}>
         <Cell type="emptyCorner" />
         {sixDaysShort.map((day, id) => (
            <Cell key={id} type="headerCell" title={day} />
         ))}
      </div>
   );

   let dataTable = [];
   props.keyList.forEach((key, index) =>
      dataTable.push(
         <div key={index} className={classes.rowWrapper}>
            <Cell
               type={index < 4 ? 'activityTitleCell' : 'titleCell'}
               title={key}
            />
            {sixDays.map((day, id) => (
               <Cell
                  key={id}
                  type={index < 4 ? 'activityCell' : 'dataCell'}
                  title={props.classTable[day][index]}
                  number={props.statsTable[day][index]}
               />
            ))}
         </div>
      )
   );

   let totalRow = (
      <div className={classes.rowWrapper}>
         <Cell type="totalHeader" title="Total" />
         {sixDays.map((day, id) => {
            let sum = props.statsTable[day].reduce(
               (a, b) => parseInt(a) + parseInt(b),
               0
            );
            return <Cell key={id} type="totalCell" title={sum} />;
         })}
      </div>
   );

   if (props.classTable === undefined || props.statsTable === undefined)
      return <Spinner />;
   else {
      return (
         <React.Fragment>
            <div className={classes.tableWrapper}>
               {dateRow}
               {headerRow}
               {dataTable}
               {totalRow}
            </div>
         </React.Fragment>
      );
   }
}

export default WeeklyLogTable;
