import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import { Subject } from 'rxjs';

import BackofficeLayout from '../backoffice-layout';
import WebsiteLayout from '../website-layout';

const currentUserSubject = new Subject();

export const publishCurrentUserUpdate = (currentUser) => currentUserSubject.next(currentUser);


export default class App extends Component {

    currentUserSubscription = null;

    constructor(props) {
        super(props);
        this.state = {
            currentUser: JSON.parse(localStorage.getItem('CURRENT_USER'))
        };
        this.currentUserSubscription = currentUserSubject.subscribe(
            (currentUser) => {
                localStorage.setItem('CURRENT_USER', JSON.stringify(currentUser));
                this.setState({
                    currentUser: currentUser
                });
            }
        );
    }

    render() {
        const currentUser = this.state.currentUser;
        let layout;
        if (currentUser && currentUser.role === 'Club') {
            layout = <BackofficeLayout currentUser={currentUser} />;
        } else {
            layout = <WebsiteLayout currentUser={currentUser} />;
        }
        return (
            <Router>
                { layout }
            </Router>
        );
    }

    componentWillUnmount() {
        this.currentUserSubscription.unsubscribe();
    }

}
