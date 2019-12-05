import React, { Component } from 'react';

import BackofficeLayout from '../backoffice-layout';
import WebsiteLayout from '../website-layout';


const CURRENT_USER = undefined;
// const CURRENT_USER = {
//   firstName : 'Jhon' , 
//   lastName : 'Doe' , 
//   userType : 'SPONSOR' 
// };

export default class App extends Component {

    render() {
        if (CURRENT_USER && CURRENT_USER.userType === 'CLUB') {
            return <BackofficeLayout currentUser={CURRENT_USER} />;
        } else {
            return <WebsiteLayout currentUser={CURRENT_USER} />;
        }
    }

}
