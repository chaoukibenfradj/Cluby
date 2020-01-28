
import React, { Component } from 'react';
import './../../assets/styles/main.scss';
import { Col, Row, Card, Skeleton, Input, Icon, Select, Divider } from 'antd';
import './../../services/sponsor.service';
import placeholder from './../../assets/imgs/placeholder.png';
import './sponsor.scss';
import { getAllSponsors } from './../../services/sponsor.service';

const { Meta } = Card;


export default class Sponsors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSponsorsInit: [],
            listSponsorsSearch: [],
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

    createSponsorRows = (listSponsorsSearch) => {
        let row = [];
        let col = [];
        let chunkedArray = [];
        var chunk = 3;
        for (let i = 0, j = listSponsorsSearch.length; i < j; i += chunk) {
            chunkedArray = listSponsorsSearch.slice(i, i + chunk);
            col = [];
            chunkedArray.forEach(element => {
                col.push(
                    <Col span={8} key={element.id} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Card
                            onClick={() => { this.props.history.push(`/sponsors/sponsor-details/${element.id}`) }}
                            hoverable
                            style={{ width: '25vw', borderRadius: '20px' }}
                            cover={<img alt="sponsor-card" src={element.photo} onError={(e) => { e.target.src = placeholder }} />}
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
        getAllSponsors().then(data => {
            console.log(data.data);
            this.setState({ listSponsorsInit: data.data, listSponsorsSearch: data.data });
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
            const { listSponsorsInit } = this.state;
            const listSponsorFiltred = listSponsorsInit.filter(element => {
                return element.name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
            });
            console.log(listSponsorFiltred);
            this.setState({
                listSponsorsSearch: listSponsorFiltred
            });
        }
    }

    resetList = () => {
        this.setState({ listSponsorsSearch: this.state.listSponsorsInit });
    }


    onChange(value) {
        console.log(value);
        if (value === "--") {
            console.log("Reset List");
            this.resetList();
        } else {
            const { listSponsorsInit } = this.state;
            const listSponsorFiltred = listSponsorsInit.filter(element => {
                return element.domain.toLowerCase().indexOf(value.toLowerCase()) >= 0;
            });
            console.log(listSponsorFiltred);
            this.setState({
                listSponsorsSearch: listSponsorFiltred
            });
        }
    }

    render() {
        return (
            <div style={{ padding: '30px', width: '100%' }} className="website-layout-view-container sponsors-list">




                <Divider>Sponsors</Divider>
                <div>
                    {(this.state.listSponsorsSearch && this.state.listSponsorsSearch.length > 0 && !this.state.isLoading) ?
                        this.createSponsorRows(this.state.listSponsorsSearch)
                        : (!this.state.isLoading && this.state.listSponsorsSearch.length === 0)
                            ? <div className="center-div">
                                <Icon className="error-icon" type="frown" />
                                No Sponsors
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
