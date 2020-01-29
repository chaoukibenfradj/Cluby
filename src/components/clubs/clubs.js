import React, { Component } from 'react';
import './../../assets/styles/main.scss';
import { Col, Row, Card, Skeleton, Input, Icon, Select, Divider, Empty } from 'antd';
import './../../services/club.service';
import placeholder from './../../assets/imgs/placeholder.png';
import './clubs.scss';
import { getAllClubs } from './../../services/club.service';
const { Meta } = Card;



export default class Clubs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClubsInit: [],
            listClubsSearch: [],
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

    createClubRows = (listClubsSearch) => {
        let row = [];
        let col = [];
        let chunkedArray = [];
        var chunk = 3;
        for (let i = 0, j = listClubsSearch.length; i < j; i += chunk) {
            chunkedArray = listClubsSearch.slice(i, i + chunk);
            col = [];
            chunkedArray.forEach(element => {
                col.push(
                    <Col span={8} key={element.id} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Card
                            onClick={() => { this.props.history.push(`/clubs/test/${element.id}`) }}
                            hoverable
                            style={{ width: '85%', borderRadius: '20px' }}
                            cover={<img alt="club-card" src={element.photo} onError={(e) => { e.target.src = placeholder }} />}
                        >
                            <Meta title={
                                <div className="club-details-card">
                                    <span className="club-title">
                                        {element.name}
                                    </span>
                                </div>
                            } description={
                                <div className="club-details-card">
                                    <span className="text-limit">
                                        {element.description}
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
        getAllClubs().then(data => {
            console.log(data.data);
            this.setState({ listClubInit: data.data, listClubsSearch: data.data });
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
            const { listClubsInit } = this.state;
            const listClubFiltred = listClubsInit.filter(element => {
                return element.name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
            });
            console.log(listClubFiltred);
            this.setState({
                listClubsSearch: listClubFiltred
            });
        }
    }

    resetList = () => {
        this.setState({ listClubsSearch: this.state.listClubsInit });
    }

    onChange(value) {
        console.log(value);
        if (value === "--") {
            console.log("Reset List");
            this.resetList();
        } else {
            const { listClubsInit } = this.state;
            const listClubFiltred = listClubsInit.filter(element => {
                return element.domain.toLowerCase().indexOf(value.toLowerCase()) >= 0;
            });
            console.log(listClubFiltred);
            this.setState({
                listClubsSearch: listClubFiltred
            });
        }
    }

    render() {
        return (
            <div style={{ padding: '30px', width: '100%' }} className="website-layout-view-container clubs-list">

                <Divider>Clubs</Divider>
                <div>
                    {(this.state.listClubsSearch && this.state.listClubsSearch.length > 0 && !this.state.isLoading) ?
                        this.createClubRows(this.state.listClubsSearch)
                        : (!this.state.isLoading && this.state.listClubsSearch.length === 0)
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

