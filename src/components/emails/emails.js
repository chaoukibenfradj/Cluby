import React, { Component } from 'react';

import { Button, Radio, Empty } from 'antd';

import moment from 'moment';

import NewEmailModal from './new-email-modal';

import './emails.scss';

const RECEIVED_EMAILS = [
    {
        id: 'R001',
        sender: {
            id: 'U001',
            firstName: 'Miles',
            lastName: 'Runolfsdottir',
            email: 'miles.runolfsdottir@email.com'
        },
        receiver: {
            id: '5e1a44c9df0e9100044ce4cd',
            firstName: 'Nader',
            lastName: 'Debbabi',
            email: 'nader.debbabi.30@gmail.com'
        },
        subject: 'Et minim proident est dolore id',
        content: 'Dolore excepteur officia consequat quis dolore do id qui laborum fugiat sint quis cupidatat. Consectetur enim nulla Lorem commodo anim esse non enim magna anim adipisicing dolor. Enim duis incididunt duis cillum aute et sint cillum anim anim id qui incididunt pariatur. Non amet dolore non nisi cupidatat labore commodo ullamco cillum cillum. Proident eiusmod consequat et reprehenderit laborum consequat amet Lorem ea eiusmod laborum. Laborum qui exercitation Lorem aliquip anim laborum id reprehenderit velit exercitation duis. Enim ut id amet cupidatat sit nulla sint eiusmod mollit quis duis sit excepteur.',
        sentDate: '2020-01-11 10:09:33'
    },
    {
        id: 'R002',
        sender: {
            id: 'U002',
            firstName: 'Kolby',
            lastName: 'Rolfson',
            email: 'kolby.rolfson@email.com'
        },
        receiver: {
            id: '5e1a44c9df0e9100044ce4cd',
            firstName: 'Nader',
            lastName: 'Debbabi',
            email: 'nader.debbabi.30@gmail.com'
        },
        subject: 'Consequat tempor labore consequat duis sunt',
        content: 'Commodo est eiusmod consequat voluptate laborum consectetur ex non voluptate id dolor nostrud. Irure est ut id minim excepteur do consequat nulla ad culpa duis. Aliquip laboris elit nulla incididunt consequat aute nulla incididunt irure ea excepteur dolor sit. Eu cillum reprehenderit mollit pariatur non nulla cupidatat magna eu esse aute veniam proident non. Aliquip excepteur commodo ipsum amet quis officia Lorem incididunt culpa et. Commodo eiusmod sint labore ipsum et magna dolor in tempor cupidatat culpa ad. Nisi aliqua quis velit labore ex id veniam anim aliquip. Deserunt mollit quis duis ullamco qui veniam tempor non elit. Lorem officia pariatur tempor aliquip veniam aliqua qui nisi velit. Ea in mollit anim fugiat reprehenderit ex anim minim laborum tempor non cillum. Dolore cillum ullamco consectetur ullamco esse quis.',
        sentDate: '2020-01-02 19:56:11'
    },
    {
        id: 'R003',
        sender: {
            id: 'U003',
            firstName: 'Meghan',
            lastName: 'Streich',
            email: 'meghan.streich@email.com'
        },
        receiver: {
            id: '5e1a44c9df0e9100044ce4cd',
            firstName: 'Nader',
            lastName: 'Debbabi',
            email: 'nader.debbabi.30@gmail.com'
        },
        subject: 'Proident adipisicing sint Lorem eiusmod',
        content: 'Laboris amet ad laboris velit fugiat sunt quis proident. Velit laboris est anim nulla exercitation proident sunt. Sit velit cupidatat exercitation dolore irure et magna et ut. Ad ullamco esse aliquip deserunt consequat nulla nisi elit dolore nostrud minim. Voluptate mollit cillum officia sint est eiusmod. Laboris dolore dolore cupidatat nostrud culpa voluptate non adipisicing. Consequat commodo ut deserunt exercitation laboris excepteur proident ea reprehenderit labore laborum. Nulla nisi cillum aute ea sit occaecat culpa nostrud consectetur fugiat quis officia dolore cupidatat. Eu sint culpa elit est quis voluptate. Sit reprehenderit sit cillum commodo proident ut eu eiusmod mollit enim pariatur anim aliquip proident. Nulla irure velit veniam ea magna ipsum. In magna non adipisicing reprehenderit amet nisi reprehenderit cillum incididunt.',
        sentDate: '2020-01-10 01:43:09'
    },
    {
        id: 'R004',
        sender: {
            id: 'U004',
            firstName: 'Curtis',
            lastName: 'Kautzer',
            email: 'curtis.kautzer@email.com'
        },
        receiver: {
            id: '5e1a44c9df0e9100044ce4cd',
            firstName: 'Nader',
            lastName: 'Debbabi',
            email: 'nader.debbabi.30@gmail.com'
        },
        subject: 'Est mollit aute cupidatat veniam tempor nisi ut adipisicing',
        content: 'In non nostrud ut reprehenderit irure labore do labore enim aliquip irure cillum ea. Reprehenderit quis in nulla Lorem ut reprehenderit veniam aute commodo exercitation id eiusmod. Nostrud occaecat nostrud exercitation dolore. Ea commodo in exercitation et exercitation est nisi. Nostrud est mollit incididunt eiusmod nisi tempor duis. Magna ea tempor incididunt occaecat excepteur dolore non est cillum ut irure sint ad. Minim qui pariatur amet nulla aute. Laborum ex fugiat commodo consectetur laborum minim reprehenderit.',
        sentDate: '2020-01-07 04:45:32'
    },
    {
        id: 'R005',
        sender: {
            id: 'U005',
            firstName: 'Francisca',
            lastName: 'Sauer',
            email: 'francisca.sauer@email.com'
        },
        receiver: {
            id: '5e1a44c9df0e9100044ce4cd',
            firstName: 'Nader',
            lastName: 'Debbabi',
            email: 'nader.debbabi.30@gmail.com'
        },
        subject: 'Anim ullamco consectetur officia irure ad minim dolore minim cupidatat',
        content: 'Dolor nostrud deserunt cupidatat anim id do. Commodo nisi ad adipisicing incididunt aliqua tempor qui consequat labore anim. Culpa ad cupidatat dolore dolore eiusmod dolore ea fugiat ea fugiat laborum. Cupidatat elit ullamco occaecat qui aute amet ad quis amet. Cillum cupidatat laborum veniam ea veniam. Anim ut deserunt velit reprehenderit culpa ipsum excepteur occaecat ullamco minim ut culpa ad culpa. Proident nisi nostrud ut eiusmod. Adipisicing officia nulla ut dolor amet officia occaecat amet fugiat mollit ut. Sit et culpa consequat consectetur nisi deserunt pariatur eiusmod deserunt enim officia id duis sit.',
        sentDate: '2020-01-09 09:00:12'
    },
    {
        id: 'R006',
        sender: {
            id: 'U006',
            firstName: 'Lauryn',
            lastName: 'Stark',
            email: 'lauryn.stark@email.com'
        },
        receiver: {
            id: '5e1a44c9df0e9100044ce4cd',
            firstName: 'Nader',
            lastName: 'Debbabi',
            email: 'nader.debbabi.30@gmail.com'
        },
        subject: 'Tempor ad veniam ullamco non anim aliqua',
        content: 'Aute nostrud ullamco reprehenderit nulla excepteur non amet officia aliqua amet velit. Enim magna labore do elit voluptate. In deserunt duis dolor mollit cillum est voluptate esse est. Consectetur incididunt nisi proident ex nostrud aute eiusmod minim in Lorem cupidatat eiusmod eiusmod. Labore minim laborum anim magna dolor aliqua aliquip non qui consectetur cupidatat adipisicing nulla. Aliquip tempor magna commodo occaecat nisi id eiusmod sunt est deserunt ipsum reprehenderit velit sunt. Sit veniam magna ea occaecat elit in qui eiusmod culpa ullamco duis ut commodo culpa. Ut cillum et in in cillum non consectetur aute consectetur mollit excepteur anim. Minim adipisicing sunt id enim ea in aliquip incididunt incididunt. Sunt anim nostrud proident Lorem non ut voluptate est ipsum veniam consequat. Pariatur aute do in do ex ullamco est eiusmod consectetur minim anim dolor velit id. Nisi sint irure eu commodo non anim consectetur occaecat nostrud id.',
        sentDate: '2020-01-03 14:23:09'
    },
    {
        id: 'R007',
        sender: {
            id: 'U007',
            firstName: 'Delaney',
            lastName: 'Cremin',
            email: 'delaney.cremin@email.com'
        },
        receiver: {
            id: '5e1a44c9df0e9100044ce4cd',
            firstName: 'Nader',
            lastName: 'Debbabi',
            email: 'nader.debbabi.30@gmail.com'
        },
        subject: 'Incididunt aliqua et aliquip aliquip do enim',
        content: 'Quis ea ex irure exercitation excepteur do enim anim ipsum aliquip. Fugiat veniam in adipisicing officia Lorem deserunt aliquip sunt aliquip proident non. Voluptate est esse anim exercitation proident veniam amet aute qui duis veniam esse officia. Quis excepteur mollit excepteur Lorem. Ex et incididunt in ipsum commodo ullamco amet do sint elit. Elit enim est aute velit velit ad anim. Nisi culpa commodo veniam culpa. Velit anim fugiat culpa dolore est non do qui occaecat officia veniam est. Consequat id sint ipsum nisi fugiat est. Ad aliqua sint cupidatat fugiat dolor ad culpa velit tempor anim culpa aliquip. Sint do id quis incididunt qui.',
        sentDate: '2020-01-12 16:34:20'
    },
    {
        id: 'R008',
        sender: {
            id: 'U008',
            firstName: 'Terrence',
            lastName: 'Streich',
            email: 'terrence.streich@email.com'
        },
        receiver: {
            id: '5e1a44c9df0e9100044ce4cd',
            firstName: 'Nader',
            lastName: 'Debbabi',
            email: 'nader.debbabi.30@gmail.com'
        },
        subject: 'Veniam quis non esse velit qui ullamco tempor aute reprehenderit tempor labore',
        content: 'Anim dolor nostrud commodo ullamco magna ut aliquip ipsum mollit irure. Veniam velit enim deserunt sint culpa esse ea magna fugiat. Eu laboris eiusmod irure ex amet laboris mollit qui. Nisi nostrud velit duis dolore. Fugiat cupidatat pariatur proident cupidatat. Ea enim irure sunt exercitation consequat reprehenderit quis occaecat tempor deserunt do. Id est occaecat veniam exercitation Lorem tempor aliquip commodo et deserunt dolore. Eu labore consectetur occaecat mollit aliquip Lorem adipisicing labore reprehenderit deserunt. Fugiat anim incididunt ad voluptate. Aliqua est consectetur est ut laboris sit do non labore qui minim nulla do consequat.',
        sentDate: '2020-01-06 19:10:22'
    },
    {
        id: 'R009',
        sender: {
            id: 'U009',
            firstName: 'Marisa',
            lastName: 'Harvey',
            email: 'marisa.harvey@email.com'
        },
        receiver: {
            id: '5e1a44c9df0e9100044ce4cd',
            firstName: 'Nader',
            lastName: 'Debbabi',
            email: 'nader.debbabi.30@gmail.com'
        },
        subject: 'Veniam proident fugiat Lorem commodo duis',
        content: 'Reprehenderit ex magna non ullamco culpa amet sint sint mollit. Minim laboris nostrud proident dolore ad tempor in ut tempor culpa incididunt nisi. Velit culpa proident ullamco ut elit elit elit dolore reprehenderit aute ut. Nulla officia esse ad consequat fugiat qui commodo fugiat veniam fugiat enim ullamco. Culpa nulla aliqua id aliqua. Culpa reprehenderit labore officia non ad elit aliqua. Magna tempor quis labore velit irure elit eu nulla sint pariatur. Nisi excepteur minim amet qui et culpa consectetur ex reprehenderit. Aute ea incididunt deserunt sint non officia et nostrud mollit. Lorem anim dolore proident reprehenderit ullamco dolore culpa et proident culpa nisi. Consequat nostrud dolor velit incididunt.',
        sentDate: '2020-01-01 00:09:27'
    },
    {
        id: 'R010',
        sender: {
            id: 'U010',
            firstName: 'Tamia',
            lastName: 'Quigley',
            email: 'tamia.quigley@email.com'
        },
        receiver: {
            id: '5e1a44c9df0e9100044ce4cd',
            firstName: 'Nader',
            lastName: 'Debbabi',
            email: 'nader.debbabi.30@gmail.com'
        },
        subject: 'Ut irure ipsum sunt non adipisicing',
        content: 'Duis cillum veniam tempor dolore. Dolor magna aute velit amet reprehenderit qui proident labore. Eu id Lorem culpa do. Commodo duis nisi ex voluptate velit labore voluptate. Exercitation reprehenderit proident ex ipsum irure sit amet veniam proident et ullamco. Ut officia et eiusmod Lorem ad ad do. Qui do deserunt et aute minim qui amet cupidatat sunt mollit est culpa. Excepteur laboris irure et anim.',
        sentDate: '2020-01-12 17:20:03'
    }
];

const SENT_EMAILS = [];

export default class Emails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emails: [],
            selectedEmail: null,
            newEmailModalVisibility: false
        };
    }

    componentDidMount() {
        this.setState({
            emails: RECEIVED_EMAILS.slice(0)
        })
    }

    onEmailsSelectorChange = (event) => {
        this.setState({
            selectedEmail: null
        })
        if (event.target.value === 'RECEIVED_EMAILS') {
            this.setState({
                emails: RECEIVED_EMAILS.slice(0)
            })
        } else if (event.target.value === 'SENT_EMAILS') {
            this.setState({
                emails: SENT_EMAILS.slice(0)
            })
        }
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
                console.log(values);
                this.hideNewEmailModal();
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
                                emails.sort((a, b) => moment(a.sentDate, 'YYYY-MM-DD HH:mm:ss').isSameOrBefore(b.sentDate, 'YYYY-MM-DD HH:mm:ss') ? 1 : -1).map(
                                    (email, index) => {
                                        return (
                                            <div key={email.id} className={(selectedEmail && selectedEmail.id === email.id) ? "email-item-container selected-email" : "email-item-container"} onClick={() => this.onEmailSelection(email)}>
                                                <div className={(index % 2 === 0) ? "email-item even" : "email-item odd"}>
                                                    <div className="row">
                                                        <div className="subject">
                                                            <h4>{email.subject}</h4>
                                                        </div>
                                                        <div className="sent-date">{moment(email.sentDate, 'YYYY-MM-DD HH:mm:ss').format('D MMM, YYYY - HH:mm')}</div>
                                                    </div>
                                                    <div className="sender">{email.sender.firstName + ' ' + email.sender.lastName}</div>
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
                                    <div className="sender">From {selectedEmail && selectedEmail.sender.firstName}</div>
                                    <div className="sent-date">{selectedEmail && moment(selectedEmail.sentDate, 'YYYY-MM-DD HH:mm:ss').format('D MMM, YYYY - HH:mm')}</div>
                                </div>
                                <div className="content">{selectedEmail && selectedEmail.content}</div>
                            </div>
                        </div>
                        <Button className="btn-secondary-solid btn-circle btn-fab" shape="circle" icon="plus" onClick={this.showNewEmailModal} />
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
