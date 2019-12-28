import React, { Component } from 'react';

import { Avatar, Popover, Button, Divider } from 'antd';


export default class HeaderUserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUserPopoverVisible: false,
        };
    }

    handleUserPopoverVisible = isUserPopoverVisible => {
        this.setState({
            isUserPopoverVisible
        });
    };

    getCurrentUserInitials() {
        let initials = '';
        if (
            this.props.currentUser && 
            this.props.currentUser.firstName && this.props.currentUser.firstName.length > 0 && 
            this.props.currentUser.lastName && this.props.currentUser.lastName.length > 0
        ) {
            initials = this.props.currentUser.firstName.charAt(0).toUpperCase() + this.props.currentUser.lastName.charAt(0).toUpperCase();
        }
        return initials;
    }

    render() {
        return (
            <Popover
                content={
                    <div className="popover-content">
                        <div className="popover-header">
                            <p className="fullname">{this.props.currentUser.firstName + ' ' + this.props.currentUser.lastName}</p>
                            <p className="email">{this.props.currentUser.email}</p>
                        </div>
                        <Divider />
                        <div className="popover-actions">
                            <Button type="link">Edit profile</Button>
                            <Button type="link">Sign out</Button>
                        </div>
                    </div>
                }
                placement="bottomRight"
                trigger="click"
                visible={this.state.isUserPopoverVisible}
                onVisibleChange={this.handleUserPopoverVisible}
            >
                {
                    (this.getCurrentUserInitials() && this.getCurrentUserInitials().length > 0) ? (
                        <Avatar>{this.getCurrentUserInitials()}</Avatar>
                    ) : (
                        <Avatar icon="user" />
                    )
                }
            </Popover>
        );
    }

}
