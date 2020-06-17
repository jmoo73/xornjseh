import React, { Component } from 'react';
import classes from './Dailylog.module.css';
import ClassBar from '../../components/ClassBar/ClassBar';
import ChooseColor from '../../components/ChooseColor/ChooseColor';
import Attender from '../../components/Attender/Attender';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Modal from '../../components/UI/Modal/Modal';
import ModalTransparent from '../../components/UI/Modal/ModalTransparent';
import Line from '../../components/UI/Line/Line';
import Spinner from '../../components/UI/Spinner/Spinner';

class Dailylog extends Component {
   state = {
      number: 0,
   };

   whenActivityClicked = activity => {
      this.setState({ number: this.props.dailyStat[activity] });
      this.props.clickedActivity(activity);
   };
   changeState = event => {
      this.setState({ number: event.target.value });
   };

   submitHandler = event => {
      event.preventDefault();
      this.props.clickedActivitySubmit(this.props.currActivity, this.state.number);
   };

   render() {
      let activitySaving = null;
      if (this.props.statsSaving) {
         activitySaving = <Spinner />;
      }

      let classSaving = null;
      if (this.props.gglSaving) {
         classSaving = <Spinner />;
      }

      const clickedAttenderSubmit = () => {
         if (!this.props.attenderTouched) {
            this.props.resetCurrClass();
         } else {
            alert('Contents modified. Press submit button before leaving.');
         }
      };

      const initActivity = () => {
         this.setState({ number: this.props.dailyStat[this.props.currActivity] });
         this.props.initActivity();
      };

      let classBar = (
         <ClassBar
            classToday={this.props.classToday}
            currClass={this.props.currClass}
            clickedClass={this.props.clickedClass}
            classAttender={this.props.classAttender}
            dailyStat={this.props.dailyStat}
            keyList={this.props.keyList}
            clickedActivity={this.whenActivityClicked}
         />
      );

      let showChooseColor = (
         <ChooseColor
            currBelt={this.props.currBelt}
            persons={this.props.persons}
            currClassAttender={this.props.classAttender[this.props.currClass]}
            clickedMember={this.props.clickedMember}
            clickedBelt={this.props.clickedBelt}
            currClass={this.props.currClass}
         />
      );
      let showAttender = (
         <Attender
            currClass={this.props.currClass}
            currClassAttender={this.props.classAttender[this.props.currClass]}
            persons={this.props.persons}
            clickedAttender={this.props.clickedAttender}
            clickedSubmit={this.props.clickedAttenderSubmit}
         />
      );

      let showForm = (
         <div className={classes.formWrapper}>
            <form className={classes.formBox} onSubmit={this.submitHandler}>
               <div className={classes.labelBox}>{this.props.currActivity}</div>
               <div className={classes.inputBox}>
                  <input
                     key={this.props.currActivity}
                     value={this.state.number}
                     name={this.props.currActivity}
                     onChange={this.changeState}
                     autoComplete="off"
                  />
               </div>
               <input className={classes.submitBtn} type="submit" value="Submit" />
            </form>
         </div>
      );

      return (
         <React.Fragment>
            <div className={classes.dayLogBox}>
               {classBar}
               <Modal
                  show={this.props.currClass && !this.props.gglSaving}
                  clicked={clickedAttenderSubmit}
               >
                  {this.props.currClass ? showChooseColor : null}
                  <Line />
                  {this.props.currClass ? showAttender : null}
               </Modal>
               {classSaving}
               <ModalTransparent
                  show={this.props.currActivity && !this.props.statsSaving}
                  clicked={initActivity}
               >
                  {this.props.currActivity && !this.props.statsSaving ? showForm : null}
               </ModalTransparent>
               {activitySaving}
            </div>
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => {
   return {
      currClass: state.ggl.currClass,
      currBelt: state.ggl.currBelt,
      classToday: state.ggl.classToday,
      classAttender: state.ggl.classAttender,
      persons: state.ggl.persons,
      gglSaving: state.ggl.saving,
      attenderTouched: state.ggl.attenderTouched,
      dailyStat: state.stats.dailyStat,
      currActivity: state.stats.currActivity,
      keyList: state.stats.keyList,
      statsSaving: state.stats.saving,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      resetCurrClass: () => dispatch(actions.resetCurrClass()),
      clickedClass: cl => dispatch(actions.whenClassClicked(cl)),
      clickedAttender: id => dispatch(actions.whenAttenderNameClicked(id)),
      clickedAttenderSubmit: () =>
         dispatch(actions.whenAttenderSubmitClicked()),
      clickedBelt: belt => dispatch(actions.whenBeltClicked(belt)),
      clickedMember: id => dispatch(actions.whenMemberNameClicked(id)),
      clickedActivity: activity => dispatch(actions.whenActivityClicked(activity)),
      clickedActivitySubmit: (currActivity, number) =>
         dispatch(actions.whenActivitySubmitClicked(currActivity, number)),
      initActivity: () => dispatch(actions.initActivity()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dailylog);
