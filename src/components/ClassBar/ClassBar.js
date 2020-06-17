import React, { Component } from 'react';
import classes from './ClassBar.module.css';
import Loader from '../UI/Loader/Loader';
import DayBar from './DayBar/DayBar';

class ClassBar extends Component {
   render() {
      let classList = this.props.classToday.map((cl, index) => {
         let classStr = [classes.buttonClass];
         let cls = cl[1];
         if (cls) {
            if (cls === this.props.currClass)
               classStr.push(classes.chosenClass);
            return (
               <button
                  className={classStr.join(' ')}
                  key={index}
                  onClick={() => {
                     this.props.clickedClass(cls);
                  }}
               >
                  {cls}
                  <span className={classes.spanInButton}>
                     <strong>{this.props.classAttender[cls].length}</strong>
                  </span>
               </button>
            );
         } else {
            return null;
         }
      });

      let activityList = this.props.keyList.map((activity, index) => {
         let clsName = classes.buttonClass + ' ' + classes.buttonPink;
         return index < 4 ? (
            <button
               className={clsName}
               key={activity}
               onClick={() => this.props.clickedActivity(activity)}
            >
               {activity}
               <span className={classes.spanInButton}>
                  <strong>{this.props.dailyStat[activity]}</strong>
               </span>
            </button>
         ) : null;
      });

      if (
         this.props.classToday === undefined ||
         this.props.classToday.length === 0
      ) {
         return <Loader />;
      } else {
         return (
            <React.Fragment>
               <div className={classes.classBarWrapper}>
                  <DayBar />
                  <div className={classes.classBars}>
                     {classList}
                     {activityList}
                  </div>
               </div>
            </React.Fragment>
         );
      }
   }
}

export default ClassBar;
