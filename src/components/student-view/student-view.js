import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ClubDetails from '../clubs/club-details';
import EventDetails from '../events/event-details';
import Events from '../events';
import SignIn from '../sign-in/sign-in';
import SignUp from '../sign-up/sign-up';


export default class StudentView extends Component {

    render() {
        return (
            <Switch>
                <Route exact path={`/`} component={Events} />
                <Route path={`/events/event-details/:id`} component={EventDetails} />
                <Route path={`/clubs/club-details/:id`} component={ClubDetails} />
                <Route path={`/sign-in`} component={SignIn} />
                <Route path={`/sign-up`} component={SignUp} />
            </Switch>

        )
    }

}
