import React, { Component } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Events from '../events' ; 
import EventDetails from '../events/event-details';
import ClubDetails from '../clubs/club-details';


export default class Visitor extends Component {

    render() {
        return (
            <Router>
                <h1>Visitor</h1>
                <Switch>
                    <Route exact path={`/visitor/events`} component={Events} />
                    <Route exact path={`/visitor/events/event-details/:id`} component={EventDetails} />
                    <Route exact path={`/visitor/clubs/club-details/:id`} component={ClubDetails} />
                </Switch>
            </Router>
        )
    }

}
