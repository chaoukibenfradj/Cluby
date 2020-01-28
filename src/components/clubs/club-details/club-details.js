import React, { Component } from 'react';
import { getClubById } from '../../../services/club.service';
import './../../../assets/styles/main.scss';
import './club-details.scss';
import placeholder from './../../../assets/imgs/placeholder.png';
import { Button, Icon, Divider, Skeleton, Card, notification } from 'antd';
import './../../../services/club.service';
const { Meta } = Card;

export default class ClubDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedClub: {},
            isLoading: true,
            currentUser: {}
        };
    }

    componentDidMount() {
        const clubId = this.props.match.params.id;
        this.setState({ currentUser: JSON.parse(localStorage.getItem('CURRENT_USER')) });
        getClubById(clubId).then(data => {
            console.log(data);
            this.setState({ isLoading: false });
            this.setState({ selectedClub: data.data });
        }).catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
        })
    }

    getClubByIdRefresh() {
        const clubId = this.props.match.params.id;
        getClubById(clubId).then(data => {
            console.log(data);
            this.setState({ selectedClub: data.data });
        }).catch(err => {
            console.log(err);
        })
    }

    openSuccessNotification = () => {
        notification.success({
            message: 'Done',
            description:
                'Your participation has been saved !',
            style: {
                width: 250,
                marginLeft: 335 - 250,
            },
        });
    };

    openErrorNotification = () => {
        notification.warn({
            message: 'Done',
            description:
                'Your participation has been cancelled !',
            style: {
                width: 250,
                marginLeft: 335 - 250,
            },
        });
    };



    render() {
        return (

            (!this.state.isLoading) ?
                <div style={{ padding: '30px', width: '100%' }} className="website-layout-view-container">

                    <div className="club-details">
                        <div>
                            <h2>{this.state.selectedClub.name}</h2>
                        </div>
                        <div>
                            <img alt="club-card" className="club-image" src={this.state.selectedClub.photo} onError={(e) => { e.target.src = placeholder }} />
                        </div>
                        <div className="description-section">
                            <div className="description">
                                <Divider orientation="left">Description</Divider>
                                <p>
                                    {this.state.selectedClub.description}
                                </p>
                            </div>
                            <div className="right-section-bottom">
                                <h4>
                                    <Icon type="team" className="icon" /> {this.state.selectedClub.club}
                                </h4>
                                <h4>
                                    <Icon type="environment" className="icon" />
                                    {this.state.selectedClub.institute}
                                </h4>
                                <h4>
                                    <Icon type="calendar" className="icon" />
                                    {this.state.selectedClub.beginDate} - {this.state.selectedClub.endDate}
                                </h4>

                                <h4>
                                    <Icon type="tag" className="icon" />
                                    {this.state.selectedClub.domain}
                                </h4>
                            </div>
                        </div>
                    </div>


                </div>
                :
                <div style={{ padding: '30px', width: '100%' }} className="website-layout-view-container">
                    <Skeleton loading={this.state.isLoading} active >
                    </Skeleton>
                    <Skeleton loading={this.state.isLoading} active >
                    </Skeleton>
                    <Skeleton loading={this.state.isLoading} active >
                    </Skeleton>
                </div>
        )
    }

}


