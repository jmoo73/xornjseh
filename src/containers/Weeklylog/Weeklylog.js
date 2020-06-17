import React, { Component } from 'react';
import { weekDates, sixDays } from '../../shared/refData';
import { connect } from 'react-redux';
import { readSheet } from '../../shared/GgleIO';
import WeeklyLogTableTable from '../../components/WeeklyData/WeeklyLogTableTable';
import Spinner from '../../components/UI/Spinner/Spinner';

class Weeklylog extends Component {
   state = {
      statsTable: {}, // { Monday: [ [ 1, 2, 3, 0, ... ], ... ], ... }
      loading: true,
   };

   async componentDidMount() {
      // This is for only 6 days starting from Monday.
      const gglStats = await readSheet(2);
      const now = new Date();
      let dayList = [];
      let indices = [];

      // Build dayList of interest.
      weekDates(now).forEach(day => dayList.push(day.split(' ')[0]));

      // Build indices list of interest.
      for (let index in gglStats) {
         if (dayList.includes(gglStats[index].Date)) {
            indices.push(index);
         }
      }

      // Data collection from gglStats.
      let statsTable = {};
      sixDays.forEach(day => (statsTable[day] = [])); // Init.

      sixDays.forEach((day, id) =>
         this.props.keyList.forEach(cls =>
            statsTable[day].push(gglStats[indices[id]][cls]? gglStats[indices[id]][cls]: '0')
         )
      );

      this.setState({ statsTable, loading: false });
    }

   render() {
      return (
         <React.Fragment>
            <div>
               {this.state.loading ? (
                  <Spinner />
               ) : (
                  <WeeklyLogTableTable
                     keyList={this.props.keyList}
                     statsTable={this.state.statsTable}
                     classTable={this.props.classNameTable}
                  />
               )}
            </div>
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => {
   return {
      // [ 'Afterschool', .... 'Class6' ]
      keyList: state.stats.keyList,
      // { Monday: [ 'Tiger Tot', 'White and Yellow', ... ], ... ], ... }
      classNameTable: state.ggl.classNameTable,
   };
};

export default connect(mapStateToProps)(Weeklylog);
