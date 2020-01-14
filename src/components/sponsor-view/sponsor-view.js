import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Emails from '../emails';


export default class SponsorView extends Component {

    render() {
        return (
            <Switch>
                <Route path={`/emails`} component={Emails} />
            </Switch>
        )
    }

}
