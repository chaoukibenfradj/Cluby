import React, { Component } from 'react';
import { getEventById } from '../../../services/event.service';
import './../../../assets/styles/main.scss';
import './event-details.scss';
import placeholder from './../../../assets/imgs/placeholder.png';
import { Button, Icon } from 'antd';

export default class EventDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedEvent: {}
        };
    }

    componentDidMount() {
        const eventId = this.props.match.params.id;
        getEventById(eventId).then(data => {
            console.log(data);
            this.setState({ selectedEvent: data.data });
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
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
                            {this.state.selectedEvent.description}
                        </div>
                    </div>
                </div>
                <div className="right-section">
                    <Button className="btn-secondary-solid">Je participe</Button>
                    <span className="nb-participant">
                        {this.state.selectedEvent.numberParticipation} ont participé
                    </span>
                </div>
                <div className="right-section-bottom">
                    <div className="nb-participant">
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
        )
    }

}
