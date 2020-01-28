import React, { Component } from 'react';

import { Button, Radio, Empty } from 'antd';

import axios from 'axios';
import moment from 'moment';

import NewEmailModal from './new-email-modal';

import './emails.scss';


export default class Emails extends Component {

    emailsType = 'RECEIVED_EMAILS';

    constructor(props) {
        super(props);
        this.state = {
            emails: [],
            selectedEmail: null,
            newEmailModalVisibility: false
        };
    }

    loadEmails() {
        let url = 'https://cors-anywhere.herokuapp.com/https://cluby1.herokuapp.com/api/v1/users/mails/';
        if (this.emailsType === 'RECEIVED_EMAILS') {
            url = url + 'receiver';
        } else if (this.emailsType === 'SENT_EMAILS') {
            url = url + 'sender';
        } else {
            return;
        }
        axios.get(url + '/' + JSON.parse(localStorage.getItem('CURRENT_USER')).id).then(
            (response) => {
                console.log(response.data);
                this.setState({
                    emails: response.data
                })
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }

    componentDidMount() {
        this.loadEmails();
    }

    onEmailsSelectorChange = (event) => {
        this.setState({
            selectedEmail: null
        });
        this.emailsType = event.target.value;
        this.loadEmails();
    }

    onEmailSelection = (email) => {
        this.setState({
            selectedEmail: (this.state.selectedEmail && email.id === this.state.selectedEmail.id) ? null : { ...email }
        })
    }

    showNewEmailModal = () => {
        this.setState({
            newEmailModalVisibility: true
        });
    }

    hideNewEmailModal = () => {
        this.setState({
            newEmailModalVisibility: false
        });
        this.formRef.props.form.resetFields();
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    sendEmail = () => {
        const { form } = this.formRef.props;
        form.validateFields((errors, values) => {
            if (!errors) {
                values['Sender'] = JSON.parse(localStorage.getItem('CURRENT_USER')).email;
                console.log(values);
                axios.post('https://cors-anywhere.herokuapp.com/https://cluby1.herokuapp.com/api/v1/users/mails', values).then(
                    (response) => {
                        this.loadEmails();
                        this.hideNewEmailModal();
                        console.log(response);
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                );
            }
        });
    }

    render() {
        const emails = this.state.emails;
        const selectedEmail = this.state.selectedEmail;
        const newEmailModalVisibility = this.state.newEmailModalVisibility;

        return (
            <div className="website-layout-content-wrapper">
                <div className="website-layout-view-container">
                    <div className="emails-selector-container">
                        <Radio.Group defaultValue="RECEIVED_EMAILS" buttonStyle="solid" onChange={this.onEmailsSelectorChange}>
                            <Radio.Button value="RECEIVED_EMAILS">Received emails</Radio.Button>
                            <Radio.Button value="SENT_EMAILS">Sent emails</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className="card card-elevated emails-card">
                        <div className="emails-list-container">
                            {
                                (!emails || emails.length <= 0) && 
                                <Empty description="No emails..." />
                            }
                            {
                                emails.sort((a, b) => moment(a.sendDate, 'YYYY-MM-DD HH:mm:ss').isSameOrBefore(b.sendDate, 'YYYY-MM-DD HH:mm:ss') ? 1 : -1).map(
                                    (email, index) => {
                                        return (
                                            <div key={email.id} className={(selectedEmail && selectedEmail.id === email.id) ? "email-item-container selected-email" : "email-item-container"} onClick={() => this.onEmailSelection(email)}>
                                                <div className={(index % 2 === 0) ? "email-item even" : "email-item odd"}>
                                                    <div className="row">
                                                        <div className="subject">
                                                            <h4>{email.subject}</h4>
                                                        </div>
                                                        <div className="sent-date">{moment(email.sendDate, 'YYYY-MM-DD HH:mm:ss').format('D MMM, YYYY - HH:mm')}</div>
                                                    </div>
                                                    <div className="name">{ (this.emailsType === 'RECEIVED_EMAILS') ? email.sender.firstName + ' ' + email.sender.lastName : email.receiver.firstName + ' ' + email.receiver.lastName }</div>
                                                    <div className="content-excerpt">{email.content.substring(0, 60)}</div>
                                                </div>
                                            </div>
                                        );
                                    }
                                )
                            }
                        </div>
                        <div className="email-details-container" style={{flex: selectedEmail ? 1 : 0}}>
                            <div className="email-details">
                                <h3 className="subject">{selectedEmail && selectedEmail.subject}</h3>
                                <div className="row">
                                    <div className="sender">{selectedEmail && ((this.emailsType === 'RECEIVED_EMAILS') ? 'From ' + selectedEmail.sender.firstName : 'To ' + selectedEmail.receiver.firstName)}</div>
                                    <div className="sent-date">{selectedEmail && moment(selectedEmail.sendDate, 'YYYY-MM-DD HH:mm:ss').format('D MMM, YYYY - HH:mm')}</div>
                                </div>
                                <div className="content">{selectedEmail && selectedEmail.content}</div>
                            </div>
                        </div>
                        {
                            (this.emailsType === 'SENT_EMAILS') &&
                            <Button className="btn-secondary-solid btn-circle btn-fab" shape="circle" icon="plus" onClick={this.showNewEmailModal} />
                        }
                    </div>
                    <NewEmailModal 
                        wrappedComponentRef={this.saveFormRef} 
                        visible={newEmailModalVisibility} 
                        onSend={this.sendEmail} 
                        onCancel={this.hideNewEmailModal}
                    ></NewEmailModal>
                </div>
            </div>
        )
    }

}
