import React, { Component } from 'react';

import { Layout } from 'antd';

import StudentView from '../student-view';
import SponsorView from '../sponsor-view';
import VisitorView from '../visitor-view';

import logoLight from '../../assets/imgs/logo-light.png';

const { Header, Content } = Layout;


export default class WebsiteLayout extends Component {

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
                                <img src={logoLight} alt="Cluby" className="logo" />
                            </div>
                            <div className="space-filler"></div>
                            <div className="header-item">Sign up</div>
                            <div className="header-item">Sign in</div>
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
