import React, { Component } from 'react';

import { Layout } from 'antd';

import Sponsor from '../sponsor';
import Visitor from '../visitor';
import Student from '../student';

import logoLight from '../../assets/imgs/logo-light.png';

const { Header, Content } = Layout;


export default class WebsiteLayout extends Component {

    render() {
        let userView;
        if (this.props.currentUser && this.props.currentUser.userType === 'STUDENT') {
            userView = <Student />;
        } else if (this.props.currentUser && this.props.currentUser.userType === 'SPONSOR') {
            userView = <Sponsor />;
        } else {
            userView = <Visitor />;
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
