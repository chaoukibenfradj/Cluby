import React, { Component } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import SignIn from '../sign-in' ;
import SignUp from '../sign-up' ;
import Events from '../events' ;
import EventDetails from '../events/event-details';
import ClubDetails from '../clubs/club-details';


export default class VisitorView extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <div className="website-layout-content-wrapper">
                        <div className="website-layout-view-container">
                            <Route exact path={`/`} component={Events} />
                            <Route path={`/events/event-details/:id`} component={EventDetails} />
                            <Route path={`/clubs/club-details/:id`} component={ClubDetails} />
                            <Route path={`/sign-in`} component={SignIn} />
                            <Route path={`/sign-up`} component={SignUp} />
                        </div>
                    </div>
                </Switch>
            </Router>
        )
    }

}
