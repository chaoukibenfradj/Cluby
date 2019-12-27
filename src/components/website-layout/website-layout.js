import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { Layout, Avatar, Popover } from 'antd';

import StudentView from '../student-view';
import SponsorView from '../sponsor-view';
import VisitorView from '../visitor-view';

import logoLight from '../../assets/imgs/logo-light.png';

const { Header, Content } = Layout;


export default class WebsiteLayout extends Component {

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
        let userView;
        if (this.props.currentUser && this.props.currentUser.userType === 'STUDENT') {
            userView = <StudentView />;
        } else if (this.props.currentUser && this.props.currentUser.userType === 'SPONSOR') {
            userView = <SponsorView />;
        } else {
            userView = <VisitorView />;
        }
        return (
            <Layout>
                <Header className="website-layout-header">
                    <div className="website-layout-content-wrapper">
                        <div className="header-content-container">
                            <div className="header-item">
                                <Link to="/">
                                    <img src={logoLight} alt="Cluby" className="logo" />
                                </Link>
                            </div>
                            <div className="space-filler"></div>
                            {
                                this.props.currentUser ? (
                                    <div className="header-item">
                                        {
                                            (this.getCurrentUserInitials() && this.getCurrentUserInitials().length > 0) ? (
                                                <Popover
                                                    content={
                                                        <>
                                                            <div>{this.props.currentUser.firstName + ' ' + this.props.currentUser.lastName}</div>
                                                            <div>{this.props.currentUser.email}</div>
                                                        </>
                                                    }
                                                    trigger="click"
                                                    visible={this.state.isUserPopoverVisible}
                                                    onVisibleChange={this.handleUserPopoverVisible}
                                                >
                                                    <Avatar>{this.getCurrentUserInitials()}</Avatar>
                                                </Popover>
                                            ) : (
                                                <Avatar icon="user" />
                                            )
                                        }
                                    </div>
                                ) : (
                                    <>
                                        <div className="header-item">
                                            <Link to="/sign-up">Sign up</Link>
                                        </div>
                                        <div className="header-item">
                                            <Link to="/sign-in">Sign in</Link>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </Header>
                <Content>
                    { userView }
                </Content>
            </Layout>
        );
    }

}
