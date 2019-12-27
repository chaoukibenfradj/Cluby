import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { Layout, Menu, Icon } from 'antd';

import ClubView from '../club-view';

import logoLight from '../../assets/imgs/logo-light.png';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;


export default class BackofficeLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSiderCollapsed: false,
        };
    }

    toggleSider = () => {
        this.setState({ isSiderCollapsed: !this.state.isSiderCollapsed });
    };

    render() {
        let userView;
        if (this.props.currentUser && this.props.currentUser.userType === 'CLUB') {
            userView = <ClubView />;
        }
        return (
            <Layout>
                <Header className="backoffice-layout-header">
                    <div className="header-item">
                        <Icon
                            className="sider-toggle-btn"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggleSider}
                        />
                    </div>
                    <div className="header-item">
                        <img src={logoLight} alt="Cluby" className="logo" />
                    </div>
                    <div className="space-filler"></div>
                </Header>
                <Layout>
                    <Sider
                        width={240}
                        collapsedWidth={0}
                        theme="light"
                        trigger={null}
                        collapsible
                        collapsed={this.state.isSiderCollapsed}
                        className="backoffice-layout-main-menu-sider"
                    >
                        <Menu
                            mode="inline"
                            theme="light"
                            defaultSelectedKeys={['menu-item-1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="menu-item-1">
                                <Icon type="appstore" />
                                <span>Dashboard</span>
                                <Link to="/"></Link>
                            </Menu.Item>
                            <SubMenu
                                key="sub-menu-1"
                                title={
                                    <span>
                                        <Icon type="calendar" />
                                        Events
                                    </span>
                                }
                            >
                                <Menu.Item key="menu-item-2">
                                    <span>Club events</span>
                                    <Link to="/events/club"></Link>
                                </Menu.Item>
                                <Menu.Item key="menu-item-3">
                                    <span>All events</span>
                                    <Link to="/events/all"></Link>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="menu-item-4">
                                <Icon type="deployment-unit" />
                                <span>Clubs</span>
                                <Link to="/clubs"></Link>
                            </Menu.Item>
                            <Menu.Item key="menu-item-5">
                                <Icon type="user" />
                                <span>Sponsors</span>
                                <Link to="/sponsors"></Link>
                            </Menu.Item>
                            <Menu.Item key="menu-item-6">
                                <Icon type="inbox" />
                                <span>Emails</span>
                                <Link to="/emails"></Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content className="backoffice-layout-content-container">
                            { userView }
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }

}
