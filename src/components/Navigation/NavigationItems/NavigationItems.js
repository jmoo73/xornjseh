import React from 'react'
import NavigationItem from "./NavigationItem/NavigationItem"
import classes from "./NavigationItems.module.css"
import { day } from '../../../shared/refData';

function NavigationItems(props) {
  let items = (
    <React.Fragment>
      <NavigationItem link="/authHome" exact>Home</NavigationItem>
      {day? <NavigationItem link="/dailylog" exact>Attendance</NavigationItem>: null}
      {day? <NavigationItem link="/weeklylog" exact>Week</NavigationItem>: null}
      <NavigationItem link="/personallog" exact>Person</NavigationItem>
      {day? <NavigationItem link="/updatemember" exact>Update</NavigationItem> : null}
    </React.Fragment>
  )
  return (
    <ul className={classes.NavigationItems}>
      {props.isAuth ? null : <NavigationItem link="/" exact>Home</NavigationItem>}
      {props.isAuth ? items : null}
      {!props.isAuth ? <NavigationItem link="/auth" exact>LogIn</NavigationItem> 
        : <NavigationItem link="/logout" exact>LogOut</NavigationItem>}
    </ul>
  )
}

export default NavigationItems
