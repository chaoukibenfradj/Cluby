import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Events from '../events' ;
import EventDetails from '../events/event-details';
import ClubDetails from '../clubs/club-details';
import Emails from '../emails';
import EditProfile from '../edit-profile';


export default class SponsorView extends Component {

    render() {
        return (
            <Switch>
                <Route exact path={`/`} component={Events} />
                <Route path={`/events/event-details/:id`} component={EventDetails} />
                <Route path={`/clubs/club-details/:id`} component={ClubDetails} />
                <Route path={`/emails`} component={Emails} />
                <Route path={`/edit-profile`} component={EditProfile} />
            </Switch>
        )
    }

}
