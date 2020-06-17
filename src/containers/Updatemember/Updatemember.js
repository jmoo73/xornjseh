import React, { Component } from 'react';
import classes from './Updatemember.module.css';
import AddNewMember from '../../components/Updatemember/AddNewMember/AddNewMember';
import UpdateBeltColor from '../../components/Updatemember/UpdateBeltColor/UpdateBeltColor';
import Spinner from '../../components/UI/Spinner/Spinner';
import BackDrop from '../../components/UI/BackDrop/BackDrop';

class Updatemember extends Component {
   state = {
      left: false,
      right: false,
      saving: false,
   };

   resetButtons = opt => {
      if (opt === 'startSaving') {
         this.setState({ saving: true });
      }
      if (opt === 'finishSaving' || opt === 'backHome') {
         this.setState({ right: false, left: false, saving: false });
      }
   };

   toggleButtons = LR => {
      if (LR === 'left') {
         this.setState({ left: true });
      } else {
         this.setState({ right: true });
      }
   };

   render() {
      let leftClass =
         classes.leftButton + ' ' + (this.state.left ? classes.clicked : null);
      let rightClass =
         classes.rightButton + ' ' + (this.state.right ? classes.clicked : null);

      return (
         <React.Fragment>
            <div className={classes.outerBox}>
               <div className={classes.buttonBox}>
                  <button
                     className={leftClass}
                     onClick={() => this.toggleButtons('left')}
                  >
                     Add member
                  </button>
                  <button
                     className={rightClass}
                     onClick={() => this.toggleButtons('right')}
                  >
                     Update belt
                  </button>
               </div>
               <BackDrop
                  show={this.state.left && !this.state.saving}
                  clicked={() => this.resetButtons('backHome')}
               />
               {this.state.left ? (
                  <AddNewMember
                     resetButtons={this.resetButtons}
                     isSaving={this.state.saving}
                  />
               ) : null}

               {this.state.right ? (
                  <UpdateBeltColor show={this.state.right} resetButtons={this.resetButtons} />
               ) : null}

               {this.state.saving ? <Spinner /> : null}
            </div>
         </React.Fragment>
      );
   }
}

export default Updatemember;
