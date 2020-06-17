import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import classes from './AuthHome.module.css';
import SquareButton from '../../components/UI/Button/SquareButton';
import BackDropBlack from '../../components/UI/BackDrop/BackDropBlack';
import CheckIn from '../../components/CheckIn/CheckIn';
import { day } from '../../shared/refData';

class Home extends Component {
   state = {
      checkInScreen: false,
   };

   async componentDidMount() {
      if (!this.props.dataLoaded && this.props.isAuthenticated && day) {
         await this.props.onStats();
         await this.props.onGgl();
      }
   }

   goToCheckInScreen = () => {
      this.setState({ checkInScreen: true });
   };

   backToAuthHome = () => {
      this.setState({ checkInScreen: false });
   }

   render() {
      let checkInScreen = (
         <CheckIn
            currClass={this.props.currClass}
            currBelt={this.props.currBelt}
            classAttender={this.props.classAttender}
            classToday={this.props.classToday}
            persons={this.props.persons}
            whenClassClicked={this.props.whenClassClicked}
            nameClicked={this.props.whenNameClicked}
            beltClicked={this.props.whenBeltClicked}
            fetchPerson={this.props.fetchPerson}
            personalAttendance={this.props.personalAttendance}
            whenSubmitClicked={this.props.whenSubmitClicked}
            saving={this.props.gglSaving}
            backToAuthHome={this.backToAuthHome}
         />
      );
      
      let individualCheckIn = null;
      if (day) {
         individualCheckIn = (
            <SquareButton clicked={this.goToCheckInScreen}>
               Individual check-in
            </SquareButton>
         );
      }

      let gglLoading = null;
      if (this.props.statsLoading || this.props.gglLoading) {
         gglLoading = <Spinner />;
      }
      return (
         <React.Fragment>
            <div className={classes.AuthHomeWrapper}>
               {gglLoading}
               <h1>AuthHome</h1>
               <h4>since Apr 12, 2020</h4>
               {individualCheckIn}
               <BackDropBlack show={this.state.checkInScreen} />
               <div className={classes.checkInWrapper}>
                  {this.state.checkInScreen ? checkInScreen : null}
               </div>
            </div>
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => {
   return {
      dataLoaded: state.ggl.dataLoaded,
      gglLoading: state.ggl.loading,
      statsLoading: state.stats.loading,
      isAuthenticated: state.auth.token !== null,
      personalAttendance: state.ggl.personalAttendance,
      currClass: state.ggl.currClass,
      currBelt: state.ggl.currBelt,
      classToday: state.ggl.classToday,
      persons: state.ggl.persons,
      gglSaving: state.ggl.saving,
      classAttender: state.ggl.classAttender,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      onGgl: () => dispatch(actions.fetchGglDocs()),
      onStats: () => dispatch(actions.fetchStat()),
      fetchPerson: fullName => dispatch(actions.fetchPerson(fullName)),
      whenSubmitClicked: () => dispatch(actions.whenAttenderSubmitClicked()),
      whenNameClicked: id => dispatch(actions.whenMemberNameClicked(id)),
      whenBeltClicked: belt => dispatch(actions.whenBeltClicked(belt)),
      whenClassClicked: cl => dispatch(actions.whenClassClicked(cl)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
