import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Emails from '../emails';
import EditProfile from '../edit-profile';


export default class SponsorView extends Component {

    render() {
        return (
            <Switch>
                <Route path={`/emails`} component={Emails} />
                <Route path={`/edit-profile`} component={EditProfile} />
            </Switch>
        )
    }

}
