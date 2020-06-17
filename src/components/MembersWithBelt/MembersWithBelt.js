import React, { Component } from 'react';
import classes from './MembersWithBelt.module.css';
import Spinner from '../../components/layout/Spinner';
import Loader from '../UI/Loader/Loader';
import RoundButton from '../UI/Button/RoundButton';

class MembersWithBelt extends Component {
   
   render() {
      let attenderIdList = this.props.currClassAttender.map(el => el[1]);
      let members = this.props.persons.map(person => (
         <RoundButton
            type="name"
            key={person.id}
            chosen={
               person.belt !== this.props.currBelt || attenderIdList.includes(person.id)
            }
            beltColor={person.belt}
            clicked={() => this.props.clicked(person.id)}
         >
            {person.name.split(' ')[0]}
         </RoundButton>
      ));

      if (this.props.persons === undefined || this.props.persons.length === 0) {
         return (
            <div>
               <Spinner />
               <Loader />
            </div>
         );
      } else {
         return (
            <React.Fragment>
               <div className={classes.membersWithABelt}> {members} </div>
            </React.Fragment>
         );
      }
   }
}

export default MembersWithBelt;
