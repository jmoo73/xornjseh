import React, { Component } from 'react';
import classes from './NameSelect.module.css';
import RoundButton from '../../UI/Button/RoundButton';
import Button from '../../UI/Button/Button';

class NameSelect extends Component {
   state = {
      id: null, // [ person.id, person.name ]
      fullName: null,
      beltColor: null,
   };

   nameChosen = (id, fullName, beltColor) => {
      this.setState({ id, fullName, beltColor });
   };

   render() {
      let attenderIdList = this.props.attender.map(per => per[1]);
      let members = (
         <div className={classes.personWrapper}>
            {this.props.persons.map(person => (
               <RoundButton
                  type="nameBig"
                  key={person.id}
                  makeBiggerButton={this.state.id === person.id ? true : false}
                  chosen={
                     attenderIdList.includes(person.id) ||
                     this.props.currBelt !== person.belt
                  }
                  beltColor={person.belt}
                  clicked={() =>
                     this.nameChosen(person.id, person.name, person.belt)
                  }
               >
                  {person.name.split(' ')[0]}
               </RoundButton>
            ))}
         </div>
      );

      let submitButton = null;
      if (
         this.state.id !== null &&
         this.props.currBelt === this.state.beltColor
      ) {
         submitButton = (
            <div className={classes.buttonWrapper}>
               <Button
                  btnType="confirmName"
                  renderClickedState={true}
                  clicked={() =>
                     this.props.nameClicked(this.state.id, this.state.fullName)
                  }
               >
                  {this.state.fullName}, correct?
               </Button>
            </div>
         );
      }

      return (
         <div className={classes.wrapper}>
            {members}
            {submitButton}
         </div>
      );
   }
}

export default NameSelect;
