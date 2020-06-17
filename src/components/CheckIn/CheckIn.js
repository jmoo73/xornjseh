import React, { Component } from 'react';
import classes from './CheckIn.module.css';
import WelcomeToClass from './WelcomeToClass/WelcomeToClass';
import BeltSelect from './BeltSelect/BeltSelect';
import SmallClassButton from './SmallClassButton/SmallClassButton';
import Spinner from '../UI/Spinner/Spinner';
import PersonalData from './PersonalData/PersonalData';
import DayBar from '../ClassBar/DayBar/DayBar';

class CheckIn extends Component {
   state = {
      isNameChosen: false,
      classState: null,
      beltState: null,
      id: null,
   };

   nameClicked = async (id, fullName) => {
      this.setState({ isNameChosen: true, id });
      await this.props.whenClassClicked(this.state.classState);
      await this.props.nameClicked(id);
      await this.props.fetchPerson(fullName);
   };

   whenSubmitClick = async () => {
      await this.props.whenSubmitClicked(); // Saving the chosen attendants(inc. indivual) until now.
      this.setState({ isNameChosen: false, beltState: null, id: null });
   };

   classStateChange = cls => {
      this.setState({ classState: cls });
   };

   beltClicked = belt => {
      this.setState({ beltState: belt });
   };

   render() {
      let logIn = null;
      if (!this.state.isNameChosen) {
         logIn = (
            <div className={classes.checkInWrapper}>
               <div
                  className={classes.dayBar}
                  onClick={this.props.backToAuthHome}
               >
                  <DayBar />
               </div>
               <SmallClassButton
                  whenClassClicked={cls => this.classStateChange(cls)}
                  classToday={this.props.classToday}
                  currClass={this.state.classState}
               />
               {this.state.classState ? (
                  <React.Fragment>
                     <WelcomeToClass cls={this.state.classState} />
                     <BeltSelect
                        currBelt={this.state.beltState}
                        beltClicked={this.beltClicked}
                        nameClicked={this.nameClicked}
                        persons={this.props.persons}
                        beltState={this.state.beltState}
                        attender={
                           this.props.classAttender[this.state.classState]
                        }
                     />
                  </React.Fragment>
               ) : null}
            </div>
         );
      }

      let personalData = null;
      if (this.props.personalAttendance && this.state.isNameChosen) {
         personalData = (
            <PersonalData
               personalAttendance={this.props.personalAttendance}
               whenSubmitClick={this.whenSubmitClick}
               persons={this.props.persons}
               id={this.state.id}
            />
         );
      }

      return (
         <React.Fragment>
            {logIn}
            {personalData}
            {this.props.saving ? <Spinner /> : null}
         </React.Fragment>
      );
   }
}

export default CheckIn;
