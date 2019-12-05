import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";

import BackofficeLayout from '../backoffice-layout';
import WebsiteLayout from '../website-layout';
import Sponsor from '../sponsor'
import Visitor from '../visitor'
import Student from '../student'
import Events from '../events'

const CURRENT_USER = undefined;
// const CURRENT_USER = {
//   firstName : 'Jhon' , 
//   lastName : 'Doe' , 
//   userType : 'SPONSOR' 
// };
export default class App extends Component {
  render() {
    let layout;
    if(CURRENT_USER && CURRENT_USER.userType==='CLUB') {
      layout = <BackofficeLayout currentUser={CURRENT_USER}/>;
    } else {
      layout = <WebsiteLayout currentUser={CURRENT_USER}/>;
    }
    return (
      <div>
        { layout }
        </div>
    );

  }
}
