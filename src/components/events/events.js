import React, { Component } from 'react';
import './../../assets/styles/main.scss';
import { Col, Row, Card, Skeleton, Input, Icon, Select, Divider } from 'antd';
import './../../services/event.service' ; 
import placeholder from './../../assets/imgs/placeholder.png';
import './student-view.scss';
import { getAllEvents } from './../../services/event.service';

const { Option } = Select;
const { Meta } = Card;
const { Search } = Input;


export default class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listEventsInit: [],
            listEventsSearch: [],
            isLoading: true,
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
                            style={{ width: '25vw', borderRadius: '20px' }}
                            cover={<img alt="event-card" src={element.photo} onError={(e) => { e.target.src = placeholder }} />}
                        >
                            <Meta title={element.name} className="text-limit" description={element.description} />
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
        getAllEvents().then(data => {
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
                            ? <div className="center-div">
                                <Icon className="error-icon" type="frown" />
                                No Events
                            </div>
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