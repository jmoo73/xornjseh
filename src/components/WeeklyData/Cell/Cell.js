import React from 'react';
import classes from './Cell.module.css';

function Cell(props) {
   let cellStyle = [classes.cellBase];
   if (props.type === 'titleCell') {
      cellStyle.push(classes.titleCell);
   }
   if (props.type === 'dataCell') {
      cellStyle.push(classes.dataCell);
   }
   if (props.type === 'headerCell') {
      cellStyle.push(classes.headerCell);
   }
   if (props.type === 'emptyCorner') {
      cellStyle.push(classes.emptyCorner);
   }
   if (props.type === 'activityCell') {
      cellStyle.push(classes.activityCell);
   }
   if (props.type === 'activityTitleCell') {
      cellStyle.push(classes.activityTitleCell);
   }
   if (props.type === 'totalHeader') {
      cellStyle.push(classes.totalHeader);
   }
   if (props.type === 'totalCell') {
      cellStyle.push(classes.totalCell);
   }

   return (
      <div className={cellStyle.join(' ')}>
         <div className={classes.title}>{props.type !== 'activityCell' ? props.title : null}</div>
         <div className={classes.number}>{props.title ? props.number : null}</div>
      </div>
   );
}

export default Cell;
