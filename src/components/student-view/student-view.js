import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ClubDetails from '../clubs/club-details';
import EventDetails from '../events/event-details';
import Events from '../events';
import SignIn from '../sign-in/sign-in';
import SignUp from '../sign-up/sign-up';
import EditProfile from '../edit-profile';
import axios from 'axios' ; 
import { BASE_URL } from '../../const';


export default class StudentView extends Component {

    componentDidMount(){
        axios.get(BASE_URL + 'api/v1/students/user/' + JSON.parse(localStorage.getItem('CURRENT_USER')).id)
        .then(data=>{
            localStorage.setItem('studentId', data.data.id);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    render() {
        return (
            <Switch>
                <Route exact path={`/`} component={Events} />
                <Route path={`/events/event-details/:id`} component={EventDetails} />
                <Route path={`/clubs/club-details/:id`} component={ClubDetails} />
                <Route path={`/sign-in`} component={SignIn} />
                <Route path={`/sign-up`} component={SignUp} />
                <Route path={`/edit-profile`} component={EditProfile} />
            </Switch>

        )
    }

}
