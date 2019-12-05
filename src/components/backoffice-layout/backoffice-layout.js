import React, { Component } from 'react';

import Club from '../club';


export default class BackofficeLayout extends Component {

    render() {
        if (this.props.currentUser && this.props.currentUser.userType === 'CLUB') {
            return <Club />
        }
    }

}
