import React, { Component } from 'react';
import { colors } from '../../../shared/refData';
import { getSheetObj } from '../../../shared/GgleIO';
import classes from './AddNewMember.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'

const now = new Date();
const date = now.getMonth() + 1 + '/' + now.getDate() + '/' + now.getFullYear();

class AddNewMember extends Component {
   state = {
      newMember: { Name: '', Beltcolor: '' },
      nameError: '',
      beltError: '',
   };

   addToSheet = () => {
      let errorName = '';
      let errorBelt = '';

      if (!this.state.newMember.Name) {
         errorName = 'Name is needed!';
      }

      if (!this.state.newMember.Beltcolor) {
         errorBelt = 'Choose the belt color!';
      }

      if (errorName || errorBelt) {
         this.setState({ nameError: errorName });
         this.setState({ beltError: errorBelt });
      } else {
         this.saveToSheet();
         this.setState({ nameError: '' });
         this.setState({ beltError: '' });
      }
   };

   saveToSheet = async () => {
      this.props.resetButtons('startSaving');
      const sheet = await getSheetObj(0);
      this.state.newMember[date] = '!Start[' + this.state.newMember.Beltcolor + ']';
      this.state.newMember.StartedOn = date;
      await sheet.addRow(this.state.newMember);
      await this.props.onGgl();
      this.setState({ newMember: { Name: '', Beltcolor: '' } });
      this.props.resetButtons('finishSaving');
   };

   onChangeName = e => {
      e.preventDefault();
      this.setState({ newMember: { ...this.state.newMember, Name: e.target.value } });
   };

   onChoiceBelt = e => {
      e.preventDefault();
      this.setState({ newMember: { ...this.state.newMember, Beltcolor: e.target.value } });
   };

   render() {
      return (
         <React.Fragment>
            <div className={classes.addMemberBox}>
               <div className={classes.layerOne}>
                  <input
                     className={classes.inputBox}
                     type="text"
                     onChange={this.onChangeName}
                     value={this.state.newMember.Name}
                     placeholder="Input full name!"
                  />
                  <select
                     className={classes.selBox}
                     onChange={this.onChoiceBelt}
                     value={this.state.newMember.Beltcolor}
                  >
                     <option>Select a belt color</option>
                     {colors.map((color, index) => (
                        <option key={index + 1} value={color}>
                           {color}
                        </option>
                     ))}
                  </select>
               </div>

               <div>
                  {this.state.nameError && (
                     <div style={{ color: 'red', fontSize: '18px' }}>
                        * {this.state.nameError}
                     </div>
                  )}
                  {this.state.beltError && (
                     <div style={{ color: 'red', fontSize: '18px' }}>
                        * {this.state.beltError}
                     </div>
                  )}
               </div>

               <div className={classes.layerTwo}>
                  <button
                     className={classes.submitBtn}
                     onClick={this.addToSheet}
                  >
                     Register
                  </button>
               </div>
            </div>
         </React.Fragment>
      );
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onGgl: () => dispatch(actions.fetchGglDocs()),
   };
};

export default connect(null, mapDispatchToProps)(AddNewMember);
