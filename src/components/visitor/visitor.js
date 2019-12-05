import React, { Component } from 'react'
import {
    Switch,
    Route,
    BrowserRouter as Router
} from "react-router-dom";
import Events from '../events' ; 
import DetailsEvent from '../events/details-events';
import DetailsClub from '../clubs/details-club';


export default class Visitor extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={`/visitor/events`} component={Events} />
                    <Route exact path={`/visitor/events/event-details/:id`} component={DetailsEvent} />
                    <Route exact path={`/visitor/clubs/club-details/:id`} component={DetailsClub} />
                </Switch>
            </Router>
        )
    }
}
