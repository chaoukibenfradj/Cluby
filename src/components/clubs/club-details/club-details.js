import React, { Component } from 'react';
import { getClubById } from '../../../services/club.service';
import './../../../assets/styles/main.scss';
import './club-details.scss';
import moment from 'moment';
import placeholder from './../../../assets/imgs/placeholder.png';
import { Button, Icon, Divider, Skeleton, Modal, notification, List, Avatar } from 'antd';
import './../../../services/club.service';


export default class ClubDetails extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         selectedClub: {},
    //         isLoading: true,
    //         currentUser: JSON.parse(localStorage.getItem('CURRENT_USER')),
    //         clubId: localStorage.getItem('clubId')
    //     };
    // }


    // componentDidMount() {
    //     console.log("HANA Montana");
    //     const clubId = this.props.match.params.id;
    //     console.log(this.props.match.params.id);

    //     getClubById(clubId).then(data => {
    //         console.log(this.props.match.params.id);

    //         console.log(data.data);
    //         this.setState({ selectedClub: data.data });
    //         this.setState({ isLoading: false });
    //     }).catch(err => {
    //         console.log(err);
    //         this.setState({ isLoading: false });
    //     })
    // }

    // getClubByIdRefresh() {
    //     const clubId = this.props.match.params.id;
    //     this.getAllParticipators();
    //     getClubById(clubId).then(data => {
    //         this.setState({ selectedClub: data.data });
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }


    render() {
        return (
            <div>
                Hello
            </div>
            // <>
            //     {(!this.state.isLoading) ?
            //         <div style={{ padding: '30px', width: '100%' }} className="website-layout-view-container">

            //             <div className="club-details">
            //                 <div>
            //                     <h2>{this.state.selectedClub.name}</h2>
            //                 </div>
            //                 <div>
            //                     <img alt="club-card" className="club-image" src={this.state.selectedClub.photo} onError={(e) => { e.target.src = placeholder }} />
            //                 </div>
            //                 <div className="description-section">
            //                     <div className="description">
            //                         <Divider orientation="left">Description</Divider>
            //                         <p>
            //                             {this.state.selectedClub.description}
            //                         </p>
            //                     </div>
            //                     <div className="right-section-bottom">


            //                         <h4 className="detail-item" >
            //                             <Icon type="environment" className="icon" />
            //                             {this.state.selectedClub.institute.name}
            //                         </h4>


            //                     </div>
            //                 </div>
            //             </div>


            //         </div>
            //         :
            //         <div style={{ padding: '30px', width: '100%' }} className="website-layout-view-container">
            //             <Skeleton loading={this.state.isLoading} active >
            //             </Skeleton>
            //             <Skeleton loading={this.state.isLoading} active >
            //             </Skeleton>
            //             <Skeleton loading={this.state.isLoading} active >
            //             </Skeleton>
            //         </div>}
            // </>
        )
    }

}
