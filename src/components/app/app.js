import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import BackofficeLayout from '../backoffice-layout';
import WebsiteLayout from '../website-layout';


// const CURRENT_USER = undefined;
const CURRENT_USER = {
    id: 'IPk23EE4sD56es',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    userType: 'CLUB'
};

export default class App extends Component {

    render() {
        let layout;
        if (CURRENT_USER && CURRENT_USER.userType === 'CLUB') {
            layout = <BackofficeLayout currentUser={CURRENT_USER} />;
        } else {
            layout = <WebsiteLayout currentUser={CURRENT_USER} />;
        }
        return (
            <Router>
                { layout }
            </Router>
        );
    }

}
