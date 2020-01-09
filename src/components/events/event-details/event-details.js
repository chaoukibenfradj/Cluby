import React, { Component } from 'react';
import { getEventById, studentCancelParticipation, nikomk, addStudentParticipation } from '../../../services/event.service';
import './../../../assets/styles/main.scss';
import './event-details.scss';
import placeholder from './../../../assets/imgs/placeholder.png';
import { Button, Icon, Divider, Skeleton, Card } from 'antd';
import './../../../services/event.service' ;
const { Meta } = Card;

export default class EventDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedEvent: {},
            isLoading: true,
            currentUser: {}
        };
    }

    componentDidMount() {
        const eventId = this.props.match.params.id;
        this.setState({ currentUser: JSON.parse(localStorage.getItem('currentUser')) });
        getEventById(eventId).then(data => {
            console.log(data);
            this.setState({ isLoading: false });
            this.setState({ selectedEvent: data.data });
        }).catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
        })
    }

    getEventByIdRefresh(){
        const eventId = this.props.match.params.id;
        getEventById(eventId).then(data => {
            console.log(data);
            this.setState({ selectedEvent: data.data });
        }).catch(err => {
            console.log(err);
        })
    }

    cancelStudentParticipation() {
        studentCancelParticipation(this.props.match.params.id, this.state.currentUser.id)
            .then(data => {
                this.getEventByIdRefresh();
                console.log(data);
            }).catch(err => {
                console.log(err);
            })
    }

    addStdntParticipation(){
        addStudentParticipation(this.props.match.params.id, this.state.currentUser.id)
        .then(data => {
            this.getEventByIdRefresh();
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (

            (!this.state.isLoading) ?
                <div style={{ padding: '30px', width: '100%' }} className="website-layout-view-container">

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
                                <h4>
                                    <Icon type="team" className="icon" /> {this.state.selectedEvent.club}
                                </h4>
                                <h4>
                                    <Icon type="environment" className="icon" />
                                    {this.state.selectedEvent.institute}
                                </h4>
                                <h4>
                                    <Icon type="calendar" className="icon" />
                                    {this.state.selectedEvent.beginDate} - {this.state.selectedEvent.endDate}
                                </h4>
                                <h4>
                                    <Icon type="dollar" className="icon" />
                                    {this.state.selectedEvent.price} D.T.
                        </h4>
                                <h4>
                                    <Icon type="tag" className="icon" />
                                    {this.state.selectedEvent.domain}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="right-section">
                        {(this.state.selectedEvent.listParticipation && this.state.selectedEvent.listParticipation.map(element => { return element.userId }).indexOf(this.state.currentUser.id)) ?
                            <Button className="btn-secondary-solid" onClick={()=>{this.addStdntParticipation()}}>Participate</Button>
                            :
                            <Button type="danger" onClick={()=>{this.cancelStudentParticipation()}}>Cancel participation</Button>

                        }

                        <span className="nb-participant">
                            {(this.state.selectedEvent.listParticipation) ? this.state.selectedEvent.listParticipation.length : '0'}  ont participé
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
                </div>
        )
    }

}
