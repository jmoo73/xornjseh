import React from 'react';
import classes from './Home.module.css';

const Home = () => {

   return (
      <React.Fragment>
         <div className={classes.HomeWrapper}>
            <h1>Home</h1>
            <h4>since Apr 12, 2020</h4>
         </div>
      </React.Fragment>
   );
};

export default Home;
