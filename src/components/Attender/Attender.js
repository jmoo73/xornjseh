import React, { Component } from 'react';
import RoundButton from '../UI/Button/RoundButton';
import Loader from '../UI/Loader/Loader';
import classes from './Attender.module.css';

class Attender extends Component {
   render() {
      let attenders = this.props.currClassAttender.map(attender => (
         <RoundButton
            type="namePressed"
            key={attender[1]}
            beltColor={attender[0]}
            clicked={() => this.props.clickedAttender(attender[1])}
         >
            {this.props.persons[attender[1]].name.split(' ')[0]}
         </RoundButton>
      ));

      let submitButton = (
         <button
            className={classes.buttonMain}
            type="button"
            onClick={this.props.clickedSubmit}
         >
            <span style={{ fontSize: '23px', color: 'black' }}>
               <strong>{this.props.currClassAttender.length}</strong>
            </span>
            <span style={{ fontSize: '15px' }}>{this.props.currClass}</span>
         </button>
      );

      if (this.props.persons === undefined || this.props.persons.length === 0) {
         return <Loader />;
      } else {
         return (
            <React.Fragment>
               <div className={classes.attenderBox}>
                  {attenders}
                  {submitButton}
               </div>
            </React.Fragment>
         );
      }
   }
}

export default Attender;
