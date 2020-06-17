import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class Logout extends Component {
   componentDidMount() {
      this.props.onLogOut();
      this.props.onLogOutGgl();
      this.props.onLogOutStat();
   }

   render() {
      return <Redirect to="/" />;
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onLogOut: () => dispatch(actions.logout()),
      onLogOutGgl: () => dispatch(actions.gglLogout()),
      onLogOutStat: () => dispatch(actions.statLogout()),
   };
};

export default connect(null, mapDispatchToProps)(Logout);
