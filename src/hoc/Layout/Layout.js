import React, { Component } from "react";
import { connect } from "react-redux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Dropdown from "../../components/Navigation/Dropdown/Dropdown";

class Layout extends Component {
  state = {
    showDropdown: false,
  };

  dropdownToggler = () => {
    this.setState((prevState) => {
      return { showDropdown: !prevState.showDropdown };
    });
  };

  dropdownCloser = () => {
    this.setState({ showDropdown: false });
  };

  render() {
    return (
      <div>
        <Toolbar
          dropdownToggler={this.dropdownToggler}
          isAuth={this.props.isAuthenticated}
          location={this.props.location}
          />
        <Dropdown
          isAuth={this.props.isAuthenticated}
          open={this.state.showDropdown}
          dropdownCloser={this.dropdownCloser}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    location: state.auth.location,
  };
};

export default connect(mapStateToProps)(Layout);
