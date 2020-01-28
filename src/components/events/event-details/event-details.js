import React, { Component } from 'react';
import { getEventById, studentCancelParticipation, addStudentParticipation, getListParticipators, deleteEvent } from '../../../services/event.service';
import './../../../assets/styles/main.scss';
import './event-details.scss';
import moment from 'moment';
import placeholder from './../../../assets/imgs/placeholder.png';
import { Button, Icon, Divider, Skeleton, Modal, notification, List, Avatar } from 'antd';
import './../../../services/event.service';
import AddEvent from './../add-event';

export default class EventDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedEvent: {},
            isLoading: true,
            currentUser: JSON.parse(localStorage.getItem('CURRENT_USER')),
            eventParticipators: [],
            clubId: localStorage.getItem('clubId')
        };
    }

    getAllParticipators() {
        getListParticipators(this.props.match.params.id)
            .then(data => {
                console.log(data.data);
                this.setState({ eventParticipators: data.data })
            })
            .catch(err => {
                console.log(err);
            })
    }
    componentDidMount() {
        console.log("Details");
        const eventId = this.props.match.params.id;
        this.getAllParticipators();
        getEventById(eventId).then(data => {
            console.log(data.data);
            this.setState({ selectedEvent: data.data });
            this.setState({ isLoading: false });
        }).catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
        })
    }

    getEventByIdRefresh() {
        const eventId = this.props.match.params.id;
        this.getAllParticipators();
        getEventById(eventId).then(data => {
            this.setState({ selectedEvent: data.data });
        }).catch(err => {
            console.log(err);
        })
    }

    openSuccessNotification = (message) => {
        notification.success({
            message: 'Done',
            description: message,
            style: {
                width: 250,
                marginLeft: 335 - 250,
            },
        });
    };

    openErrorNotification = (message) => {
        notification.warn({
            message: 'Done',
            description: message,
            style: {
                width: 250,
                marginLeft: 335 - 250,
            },
        });
    };

    cancelStudentParticipation() {
        studentCancelParticipation(this.props.match.params.id, localStorage.getItem('studentId'))
            .then(data => {
                this.openErrorNotification('Your participation has been cancelled !');
                this.getEventByIdRefresh();
                console.log(data);
            }).catch(err => {
                console.log(err);
            })
    }


    addStdntParticipation() {
        addStudentParticipation(this.props.match.params.id, localStorage.getItem('studentId'))
            .then(data => {
                this.getEventByIdRefresh();
                console.log(data);
                this.openSuccessNotification('Your participation has been saved !');
            }).catch(err => {
                console.log(err);
            })
    }

    showListPartModal = () => {
        Modal.info({
            title: 'List Participators',
            content: (
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.eventParticipators}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href="https://ant.design">{item.user.user.firstName + ' ' + item.user.user.lastName}</a>}
                                    description={`Participated at ${item.dateParticipate}`}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            ),
            onOk() { },

        })
    }

    showDeleteConfirm() {
        Modal.confirm({
            title: 'Confirm Action',
            content: 'Are you sure delete this task?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                deleteEvent(this.props.match.params.id)
                    .then(data => {
                        this.openSuccessNotification('The event has been deleted successfully !');
                        this.props.history.push('/events/club');
                    })
                    .catch(err => {
                        console.log(err);
                        this.props.history.push('/events/club');
                    })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    render() {
        return (
            <>
            {(!this.state.isLoading) ?
                <div style={{ padding: '30px', width: '100%' }} className="website-layout-view-container">
                    {(this.state.currentUser && this.state.currentUser.role === 'Club' && this.state.clubId === this.state.selectedEvent.club.id) ? 
                    <AddEvent isUpdate="true" eventId={this.props.match.params.id} />
                    :''}
                    <div className="event-details">
                        <div>
                            <h2>{this.state.selectedEvent.name}</h2>
                        </div>
                        <div>
                            <img alt="event-card" className="event-image" src={this.state.selectedEvent.photo} onError={(e) => { e.target.src = placeholder }} />
                        </div>
                        <div className="description-section">
                            <div className="description">
                                <Divider orientation="left">Description</Divider>
                                <p>
                                    {this.state.selectedEvent.description}
                                </p>
                            </div>
                            <div className="right-section-bottom">
                                <h4 className="detail-item">
                                    <Icon type="team" className="icon" /> {(this.state.selectedEvent) ? this.state.selectedEvent.club.name : ''}
                                </h4>
                                <h4 className="detail-item" >
                                    <Icon type="info-circle" className="icon" />
                                    Places available: {this.state.selectedEvent.numberParticipation}
                                </h4>
                                <h4 className="detail-item" >
                                    <Icon type="environment" className="icon" />
                                    {this.state.selectedEvent.institute.name}
                                </h4>
                                <h4 className="detail-item">
                                    <Icon type="calendar" className="icon" />
                                    {moment(this.state.selectedEvent.beginDate).format('DD/MM/YYYY HH:mm')} - {moment(this.state.selectedEvent.endDate).format('DD/MM/YYYY HH:mm')}
                                </h4>
                                <h4 className="detail-item">
                                    <Icon type="dollar" className="icon" />
                                    {this.state.selectedEvent.price} D.T.
                                </h4>
                                <h4 className="detail-item">
                                    <Icon type="tag" className="icon" />
                                    {this.state.selectedEvent.domain.name}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="right-section">
                        {
                            (this.state.currentUser && this.state.currentUser.role === 'Student') ?
                                (!this.state.eventParticipators || this.state.eventParticipators.map(element => { return element.user.user.id }).indexOf(this.state.currentUser.id) == -1) ?
                                    <Button className="btn-secondary-solid" onClick={() => { this.addStdntParticipation() }}>Participate</Button>
                                    :
                                    <Button type="danger" onClick={() => { this.cancelStudentParticipation() }}>Cancel participation</Button>
                                : ""
                        }
                        {
                            (this.state.currentUser && this.state.currentUser.role === 'Club' && this.state.clubId === this.state.selectedEvent.club.id) ?
                                <>
                                    <Button className="btn-secondary-solid" onClick={this.showListPartModal}>List Participators</Button>
                                    <Button style={{ height: '30px', lineHeight: 0 }} className="nb-participant" type="danger" onClick={() => { this.showDeleteConfirm() }}>Delete</Button>
                                </>
                                : ""
                        }
                        <span className="nb-participant">
                            {(this.state.eventParticipators) ? this.state.eventParticipators.length : '0'} participated
                    </span>
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
                </div>}
                </>
        )
    }

}
