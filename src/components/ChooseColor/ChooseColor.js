import React, { Component } from 'react';
import Loader from '../UI/Loader/Loader';
import classes from './ChooseColor.module.css';
import RoundButton from '../UI/Button/RoundButton';
import { colors } from '../../shared/refData';
import MembersWithBelt from '../MembersWithBelt/MembersWithBelt';

class ChooseColor extends Component {

   render() {

      let currClass = (
         <div className={classes.currClass}>
            <h5>{this.props.currClass}</h5>
         </div>
      )
      
      let beltList = (
         <div className={classes.optColor}>
            {colors.map((belt, index) => {
               return (
                  <RoundButton
                     type="belt"
                     key={index}
                     beltColor={belt}
                     chosen={this.props.currBelt === belt}
                     clicked={() => this.props.clickedBelt(belt)}
                  >
                  </RoundButton>
               );
            })}
         </div>
      );

      if (this.props.persons === undefined || this.props.persons.length === 0) {
         return <Loader />;
      } else {
         return (
            <React.Fragment>
               {currClass}
               {beltList}
               <MembersWithBelt
                  persons={this.props.persons}
                  currClassAttender={this.props.currClassAttender}
                  currBelt={this.props.currBelt}
                  clicked={this.props.clickedMember}
               />
            </React.Fragment>
         );
      }
   }
}

export default ChooseColor;
