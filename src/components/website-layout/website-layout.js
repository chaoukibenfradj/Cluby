import React, { Component } from 'react';

import Sponsor from '../sponsor';
import Visitor from '../visitor';
import Student from '../student';


export default class WebsiteLayout extends Component {

    render() {
        if (this.props.currentUser && this.props.currentUser.userType === 'STUDENT') {
            return <Student />
        } else if (this.props.currentUser && this.props.currentUser.userType === 'SPONSOR') {
            return <Sponsor />
        } else {
           return  <Visitor />
        }
    }

}
