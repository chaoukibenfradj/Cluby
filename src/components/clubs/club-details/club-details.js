import React, { Component } from 'react';

import { Button } from 'antd';

import axios from 'axios';
import moment from 'moment';

import NewEmailModal from './../../emails/new-email-modal';

import './club-details.scss';


export default class ClubDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            club: null,
            newEmailModalVisibility: false
        };
    }

    componentDidMount() {
        const clubId = this.props.match.params.id;
        axios.get('https://cors-anywhere.herokuapp.com/https://cluby1.herokuapp.com/api/v1/clubs/' + clubId).then(
            (response) => {
                const club = response.data;
                axios.get('https://cors-anywhere.herokuapp.com/https://cluby1.herokuapp.com/api/v1/events/club/' + clubId).then(
                    (response) => {
                        club['eventsCount'] = response.data.length;
                        console.log(club);
                        this.setState({
                            club: club
                        });
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                );
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }

    showNewEmailModal = () => {
        this.setState({
            newEmailModalVisibility: true
        });
    }

    hideNewEmailModal = () => {
        this.setState({
            newEmailModalVisibility: false
        });
        this.formRef.props.form.resetFields();
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    sendEmail = () => {
        const { form } = this.formRef.props;
        form.validateFields((errors, values) => {
            if (!errors) {
                values['Sender'] = JSON.parse(localStorage.getItem('CURRENT_USER')).email;
                console.log(values);
                axios.post('https://cors-anywhere.herokuapp.com/https://cluby1.herokuapp.com/api/v1/users/mails', values).then(
                    (response) => {
                        this.hideNewEmailModal();
                        console.log(response);
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                );
            }
        });
    }

    render() {
        const club = this.state.club;
        const currentUser = JSON.parse(localStorage.getItem('CURRENT_USER'));
        const newEmailModalVisibility = this.state.newEmailModalVisibility;

        return (
            <div className="website-layout-content-wrapper">
                <div className="website-layout-view-container">
                    {
                        (club) &&
                        <>
                            <div className="card card-elevated club-details-card">
                                <div className="header-container">
                                    <img className="club-logo" src={ club.photo } />
                                    <h2 className="club-name">{ club.name }</h2>
                                    <p className="club-email">{ (club.user) ? club.user.email : '' }</p>
                                </div>
                                <div className="row">
                                    <div className="cell left">
                                        <p>{ club.eventsCount + ' events' }</p>
                                    </div>
                                    <div className="cell right">
                                        <p>{ 'Since ' + moment(club.creationDate, 'YYYY-MM-DD').format('YYYY') }</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="cell left">
                                        <p>{ (club.domain) ? club.domain.name : '' }</p>
                                    </div>
                                    <div className="cell right">
                                        <p>{ (club.institute) ? club.institute.name + ' - ' + club.institute.region : '' }</p>
                                    </div>
                                </div>
                                <div className="description-container">
                                    <h3>About</h3>
                                    <p>{ club.description }</p>
                                </div>
                                {
                                    (currentUser.role === 'Sponsor' || currentUser.role === 'Club') &&
                                    <div className="actions-container">
                                        <Button className="btn-secondary-solid" onClick={this.showNewEmailModal}>Send Email</Button>
                                    </div>
                                }
                            </div>
                            <NewEmailModal 
                                wrappedComponentRef={this.saveFormRef} 
                                visible={newEmailModalVisibility} 
                                onSend={this.sendEmail} 
                                onCancel={this.hideNewEmailModal}
                                receiverEmailAddress={club.user.email}
                            ></NewEmailModal>
                        </>
                    }
                </div>
            </div>
        )
    }

}
