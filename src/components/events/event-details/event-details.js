import React, { Component } from 'react';
import { getEventById } from '../../../services/event.service';


export default class EventDetails extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const eventId = this.props.match.params.id;
        getEventById(eventId).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        console.log('i')
        return (
            <h2>Event details</h2>
        )
    }

}
