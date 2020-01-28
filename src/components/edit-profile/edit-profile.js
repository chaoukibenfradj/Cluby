import React, { Component } from 'react';

import './edit-profile.scss';


export default class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="website-layout-content-wrapper">
                <div className="website-layout-view-container">
                    <h1>Edit profile</h1>
                </div>
            </div>
        );
    }

}
