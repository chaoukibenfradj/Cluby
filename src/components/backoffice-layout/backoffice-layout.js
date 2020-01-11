import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';

import HeaderUserInfo from '../header-user-info';
import ClubView from '../club-view';

import logoLight from '../../assets/imgs/logo-light.png';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const CLUB_MAIN_MENU_ITEMS = [
    {
        key: '/',
        label: 'Dashboard',
        icon: 'appstore',
        link: '/'
    },
    {
        key: '/events',
        label: 'Events',
        icon: 'calendar',
        children: [
            {
                key: '/events/club',
                label: 'Add Event',
                link: '/events/add'
            },
            {
                key: '/events/club',
                label: 'Club events',
                link: '/events/club'
            },
            {
                key: '/events/all',
                label: 'All events',
                link: '/events/all'
            }
        ]
    },
    {
        key: '/clubs',
        label: 'Clubs',
        icon: 'deployment-unit',
        link: '/clubs'
    },
    {
        key: '/sponsors',
        label: 'Sponsors',
        icon: 'user',
        link: '/sponsors'
    },
    {
        key: '/emails',
        label: 'Emails',
        icon: 'inbox',
        link: '/emails'
    }
];


export default class BackofficeLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSiderCollapsed: false
        };
    }

    toggleSider = () => {
        this.setState({ isSiderCollapsed: !this.state.isSiderCollapsed });
    };

    render() {
        let userView;
        let mainMenuItems;
        if (this.props.currentUser && this.props.currentUser.role === 'Club') {
            userView = <ClubView />;
            mainMenuItems = CLUB_MAIN_MENU_ITEMS.slice(0);
        }
        const mainMenu = (
            <Menu
                mode="inline"
                theme="light"
                selectedKeys={[this.props.location.pathname]}
                style={{ height: '100%', borderRight: 0 }}
            >
                {
                    mainMenuItems.map(
                        (item) => {
                            if (item.children && item.children.length > 0) {
                                return (
                                    <SubMenu
                                        key={item.key}
                                        title={
                                            <span>
                                                <Icon type={item.icon} />
                                                {item.label}
                                            </span>
                                        }
                                    >
                                        {
                                            item.children.map(
                                                (child) => {
                                                    return (
                                                        <Menu.Item key={child.key}>
                                                            <span>{child.label}</span>
                                                            <Link to={child.link}></Link>
                                                        </Menu.Item>
                                                    );
                                                }
                                            )
                                        }
                                    </SubMenu>
                                );
                            } else {
                                return (
                                    <Menu.Item key={item.key}>
                                        <Icon type={item.icon} />
                                        <span>{item.label}</span>
                                        <Link to={item.link}></Link>
                                    </Menu.Item>
                                );
                            }
                        }
                    )
                }
            </Menu>
        );

        return (
            <Layout className="layout">
                <Header className="backoffice-layout-header">
                    <div className="header-item">
                        <Icon
                            className="sider-toggle-btn"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggleSider}
                        />
                    </div>
                    <div className="header-item clickable">
                        <Link to="/">
                            <img src={logoLight} alt="Cluby" className="logo" />
                        </Link>
                    </div>
                    <div className="space-filler"></div>
                    <div className="header-item clickable">
                        <HeaderUserInfo currentUser={this.props.currentUser} />
                    </div>
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
                        {mainMenu}
                    </Sider>
                    <Layout>
                        <Content className="backoffice-layout-content-container">
                            {userView}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }

}
