import React, { Component } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import SignIn from '../sign-in' ; 
import SignUp from '../sign-up' ; 
import Events from '../events' ; 
import EventDetails from '../events/event-details';
import ClubDetails from '../clubs/club-details';


export default class Visitor extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <div className="website-layout-content-wrapper">
                        <div className="website-layout-view-container">
                            <Route exact path={`/visitor/events`} component={Events} />
                            <Route path={`/visitor/events/event-details/:id`} component={EventDetails} />
                            <Route path={`/visitor/clubs/club-details/:id`} component={ClubDetails} />
                            <Route path={`/visitor/sign-in`} component={SignIn} />
                            <Route path={`/visitor/sign-up`} component={SignUp} />
                        </div>
                    </div>
                </Switch>
            </Router>
        )
    }

}
