import React, { Component } from 'react';
import ChooseBeltColor from './ChooseBeltColor/ChooseBeltColor';
import ChooseNames from './ChooseNames/ChooseNames';
import ShowChosenNames from './ShowChosenNames/ShowChosenNames';
import classes from './UpdateBeltColor.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner'
import BackDrop from '../../UI/BackDrop/BackDrop'

class UpdateBeltColor extends Component {
   state = {
      currBeltColor: 'White',
      testees: [], //[ ['BeltColor', index], ... ]
   };

   switchBeltColor = color => {
      this.setState({ currBeltColor: color });
   };

   handleTestee = (testee, action) => {
      let testees = this.state.testees;
      if (action === 'add') {
         testees.push(testee);
      }
      if (action === 'remove') {
         testees = testees.filter(each => testee[1] !== each[1]);
      }
      this.setState({ testees });
   };

   triggerSave = async () => {
      await this.props.saveTestee(this.state.testees);
      await this.props.onGgl();
      this.props.resetButtons('backHome');
   };

   render() {
      let whileSaving = null;
      if(this.props.saving || this.props.loading) {
         whileSaving = <Spinner />;
      }

      return (
         <React.Fragment>
            <BackDrop
               show={this.props.show && !this.props.saving && !this.props.loading}
               clicked={() => this.props.resetButtons('backHome')}
            />
            <div className={classes.updateWrapper}>
               <ChooseBeltColor
                  currBeltColor={this.state.currBeltColor}
                  clicked={this.switchBeltColor}
               />
               <ChooseNames
                  currBeltColor={this.state.currBeltColor}
                  persons={this.props.persons}
                  testees={this.state.testees}
                  clicked={this.handleTestee}
               />
               <div className={classes.garoLineUpdate}></div>
               <ShowChosenNames
                  triggerSave={this.triggerSave}
                  testees={this.state.testees}
                  clicked={this.handleTestee}
                  persons={this.props.persons}
               />
            </div>
            {whileSaving}
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => {
   return {
      persons: state.ggl.persons,
      saving: state.ggl.saving,
      loading: state.ggl.loading, // for refreshing entire data.
   };
};

const mapDispatchToProps = dispatch => {
   return {
      saveTestee: testees => dispatch(actions.saveTestee(testees)),
      onGgl: () => dispatch(actions.fetchGglDocs()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBeltColor);
