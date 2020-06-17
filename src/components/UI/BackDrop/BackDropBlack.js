import React from 'react';

import classes from './BackDropBlack.module.css';

const backdropblack = (props) => (
    props.show ? <div className={classes.BackdropBlack} onClick={props.clicked}></div> : null
);

export default backdropblack;