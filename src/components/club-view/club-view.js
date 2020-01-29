import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './dashboard';
import Events from '../events';
import Clubs from '../clubs';
import Sponsors from '../sponsors';
import Emails from '../emails';
import AddEvent from '../events/add-event/';
import EditProfile from '../edit-profile';
import EventDetails from '../events/event-details/event-details';
import SponsorDetails from '../sponsors/sponsor-details/sponsor-details';
import ClubDetails from '../clubs/club-details/';
import Test from '../clubs/test/test';
import { getClubByUserId } from '../../services/club.service';


export default class ClubView extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props);
        var currentUser = JSON.parse(localStorage.getItem('CURRENT_USER'));
        getClubByUserId(currentUser.id).then(data => {
            localStorage.setItem('clubId', data.data.id);
        }).catch(err => {
            console.log('Fetching Club Info error : ', err);
        })
    }
    render() {
        return (
            <Switch>
                <Route exact path={`/`} component={Dashboard} />
                <Route path={`/events/club`} component={(props) => <Events {...props} fetchType={'club'} />} />
                <Route path={`/events/event-details/:id`} component={EventDetails} />
                <Route path={`/events/all`} component={(props) => <Events {...props} fetchType={'all'} />} />
                <Route path={`/clubs`} component={Clubs} />
                <Route path={`/clubs/club-details/:id`} component={ClubDetails} />
                <Route path={`/sponsors`} component={Sponsors} />
                <Route path={`/sponsors/sponsor-details/:id`} component={SponsorDetails} />
                <Route path={`/emails`} component={Emails} />
                <Route path={`/edit-profile`} component={EditProfile} />
            </Switch>
        )
    }

}
