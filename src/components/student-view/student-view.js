import React, { Component } from 'react';
import './../../assets/styles/main.scss';
import { Col, Row, Card, Skeleton, Input, Button, Select } from 'antd';
import { getAllEvents } from '../../services/event.service';
import placeholder from './../../assets/imgs/placeholder.png';
import separator from './../../assets/imgs/separator.png';
import './student-view.scss';

const { Option } = Select;
const { Meta } = Card;
const { Search } = Input;

export default class StudentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listEvents: [],
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

    createEventRows = (listEvents) => {
        let row = [];
        let col = [];
        let chunkedArray = [];
        var chunk = 3;
        for (let i = 0, j = listEvents.length; i < j; i += chunk) {
            chunkedArray = listEvents.slice(i, i + chunk);
            col = [];
            chunkedArray.forEach(element => {
                col.push(
                    <Col span={8} key={element.id} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Card
                            onClick={() => { this.props.history.push(`/event/${element.id}`) }}
                            hoverable
                            style={{ width: '25vw' }}
                            cover={<img alt="event-card" src={element.photo} onError={(e) => { e.target.src = placeholder }} />}
                        >
                            <Meta title={element.name} description={element.description} />
                        </Card>
                    </Col>
                )
            })
            row.push(<Row gutter={[8, 32]} type="flex">{col}</Row>)
        }
        return row;
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        getAllEvents().then(data => {
            this.setState({ listEvents: data.data });
            this.setState({ isLoading: false });
        }).catch(err => {
            this.setState({ isLoading: false });
            console.log(err);
        })
    }

    render() {
        return (
            <div style={{ padding: '30px', width: '100%' }} className="website-layout-view-container events-list">
                <div className="search-section">
                    <div><Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                    />
                    </div>
                    <div>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Type événement"
                            optionFilterProp="children"
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="jack">Challenge</Option>
                            <Option value="lucy">Workshop</Option>
                            <Option value="lucy">Formation</Option>
                        </Select>
                    </div>

                    <div>
                        <Button icon="search">Search</Button>
                    </div>

                </div>
                <div className="separator">
                    <img src={separator} style={{ width: '35vw' }}></img>
                </div>
                <div>
                    {(this.state.listEvents && this.state.listEvents.length > 0 && !this.state.isLoading) &&
                        this.createEventRows(this.state.listEvents)
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