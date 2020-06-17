import React, { Component } from 'react';

import classes from './ModalTransparent.module.css';
import Backdrop from '../BackDrop/BackDrop';

class ModalTransparent extends Component {

    render () {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.clicked}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default ModalTransparent;