import React, { Component } from 'react';
import { BrowserRouter as Router,Link,Switch,Route } from 'react-router-dom'

import { Layout } from 'antd';

import HeaderUserInfo from '../header-user-info';
import StudentView from '../student-view';
import SponsorView from '../sponsor-view';
import VisitorView from '../visitor-view';
import EventDetails from '../events/event-details' ;
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
            <Layout className="layout">
                <Header className="website-layout-header">
                    <div className="website-layout-content-wrapper">
                        <div className="header-content-container">
                            <div className="header-item clickable">
                                <Link to="/">
                                    <img src={logoLight} alt="Cluby" className="logo" />
                                </Link>
                            </div>
                            <div className="space-filler"></div>
                            {
                                this.props.currentUser ? (
                                    <div className="header-item clickable">
                                        <HeaderUserInfo currentUser={this.props.currentUser} />
                                    </div>
                                ) : (
                                    <>
                                        <div className="header-item clickable">
                                            <Link to="/sign-up">Sign up</Link>
                                        </div>
                                        <div className="header-item clickable">
                                            <Link to="/sign-in">Sign in</Link>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </Header>
                <Content>
               <Router>
                        <Switch>
                            <Route path={'/'}
                            // component={StudentView}
                            exact
                            render={(props)=>{
                                if (this.props.currentUser && this.props.currentUser.userType === 'STUDENT') {
                                    return <StudentView {...props}/>;
                                } else if (this.props.currentUser && this.props.currentUser.userType === 'SPONSOR') {
                                    return  <SponsorView {...props}/>;
                                } else {
                                    return <VisitorView {...props}/>;
                                }
                            }}
                            />
                            <Route path={'/event/:id'} component={EventDetails}/>
                        </Switch>
                    </Router>
                </Content>
            </Layout>
        );
    }

}
