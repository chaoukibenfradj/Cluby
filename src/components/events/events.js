import React, { Component } from 'react';
import './../../assets/styles/main.scss';
import { Col, Row, Card, Skeleton, Input, Icon, Select, Divider, Empty } from 'antd';
import './../../services/event.service';
import placeholder from './../../assets/imgs/placeholder.png';
import './events.scss';
import { getAllEvents, getEventByClubId } from './../../services/event.service';
import AddEvent from './add-event';
import moment from 'moment';
const { Option } = Select;
const { Meta } = Card;
const { Search } = Input;


export default class Events extends Component {
    constructor(props) {
        console.log('props', props);
        super(props);

        this.state = {
            listEventsInit: [],
            listEventsSearch: [],
            isLoading: true,
            currentUser: JSON.parse(localStorage.getItem('CURRENT_USER')),
            fetchType: props.fetchType
        };
    }

    createSkeleton = () => {
        let row = []
        for (let i = 0; i < 3; i++) {
            let col = []
            for (let j = 0; j < 3; j++) {
                col.push(
                    <Col span={8} key={i + j}>
                        <Skeleton loading={this.state.isLoading} active >
                            <Meta
                                title="Loading"
                                description="Loading"
                            />
                        </Skeleton>
                    </Col>
                )
            }
            row.push(<Row gutter={[8, 8]} key={i}>{col}</Row>)
        }
        return row;
    }

    createEventRows = (listEventsSearch) => {
        let row = [];
        let col = [];
        let chunkedArray = [];
        var chunk = 3;
        for (let i = 0, j = listEventsSearch.length; i < j; i += chunk) {
            chunkedArray = listEventsSearch.slice(i, i + chunk);
            col = [];
            chunkedArray.forEach(element => {
                col.push(
                    <Col span={8} key={element.id} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Card
                            onClick={() => { this.props.history.push(`/events/event-details/${element.id}`) }}
                            hoverable
                            style={{ width: '85%', borderRadius: '20px' }}
                            cover={<img alt="event-card" src={element.photo} onError={(e) => { e.target.src = placeholder }} />}
                        >
                            <Meta title={
                                <div className="event-details-card">
                                    <span className="event-title">
                                        {element.name}
                                    </span>
                                    <span className="event-price">
                                        {element.price} D.T.
                                    </span>
                                </div>
                            } description={
                                <div className="event-details-card">
                                    <span className="text-limit">
                                        {element.description}
                                    </span>
                                    <span className="event-date">
                                        Still {moment(element.beginDate).diff(Date.now(), "days")} days !
                                    </span>
                                </div>
                            } />
                        </Card>
                    </Col>
                )
            })
            row.push(<Row key={i} gutter={[8, 32]} type="flex">{col}</Row>)
        }
        return row;
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        switch (this.state.fetchType) {
            case 'all':
                this.getEvents();
                break;
            case 'club':
                this.getClubEvents();
                break;
            default:
                this.getEvents();
                break;
        }
    }
    getEvents() {
        getAllEvents().then(data => {
            console.log(data);
            this.setState({ listEventsInit: data.data, listEventsSearch: data.data });
            this.setState({ isLoading: false });
        }).catch(err => {
            this.setState({ isLoading: false });
            console.log(err);
        })
    }

    getClubEvents() {
        getEventByClubId(localStorage.getItem('clubId')).then(data => {
            console.log(data);
            this.setState({ listEventsInit: data.data, listEventsSearch: data.data });
            this.setState({ isLoading: false });
        }).catch(err => {
            this.setState({ isLoading: false });
            console.log(err);
        })
    }

    onSearchInput = (value) => {
        console.log(value);
        if (value.length == 0) {
            console.log("Reset List");
            this.resetList();
        } else {
            const { listEventsInit } = this.state;
            const listEventFiltred = listEventsInit.filter(element => {
                return element.name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
            });
            console.log(listEventFiltred);
            this.setState({
                listEventsSearch: listEventFiltred
            });
        }
    }

    resetList = () => {
        this.setState({ listEventsSearch: this.state.listEventsInit });
    }

    onChange(value) {
        console.log(value);
        if (value === "--") {
            console.log("Reset List");
            this.resetList();
        } else {
            const { listEventsInit } = this.state;
            const listEventFiltred = listEventsInit.filter(element => {
                return element.domain.toLowerCase().indexOf(value.toLowerCase()) >= 0;
            });
            console.log(listEventFiltred);
            this.setState({
                listEventsSearch: listEventFiltred
            });
        }
    }

    render() {
        return (
            <div style={{ padding: '30px', width: '100%' }} className="website-layout-view-container events-list">
                <div>
                    {(this.state.currentUser && this.state.currentUser.role === 'Club') ?
                        < AddEvent />
                        : ""
                    }
                </div>
                <div className="search-section">
                    <div><Search
                        placeholder="Search"
                        onSearch={value => this.onSearchInput(value)}
                        style={{ width: 200 }}
                    />
                    </div>
                    <div>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Domaine"
                            optionFilterProp="children"
                            onChange={this.onChange.bind(this)}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="--">---</Option>
                            <Option value="it">IT</Option>
                            <Option value="music">Music</Option>
                            <Option value="cinema">Cinema</Option>
                        </Select>
                    </div>

                    <div>
                        {/* <Button icon="search">Search</Button> */}
                    </div>

                </div>
                <Divider>Events</Divider>
                <div>
                    {(this.state.listEventsSearch && this.state.listEventsSearch.length > 0 && !this.state.isLoading) ?
                        this.createEventRows(this.state.listEventsSearch)
                        : (!this.state.isLoading && this.state.listEventsSearch.length === 0)
                            ? <Empty />
                            : ""

                    }
                    {(this.state.isLoading) &&
                        this.createSkeleton()
                    }
                </div>
            </div>
        )
    }
}

function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}