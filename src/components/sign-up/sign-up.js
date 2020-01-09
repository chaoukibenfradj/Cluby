import React, { Component } from 'react';

import { Form, Input, Button /*, Select*/ } from 'antd';

import axios from 'axios';

import './sign-up.scss';
import { publishCurrentUserUpdate } from '../app/app.js';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

// const { Option } = Select;

// const UNIVERSITIES = [
//     {
//         id: 'U001',
//         name: 'Université de la Manouba',
//         abbreviation: 'UMA',
//         location: 'Manouba',
//         institutions: [
//             {
//                 id: 'I001',
//                 name: 'Ecole Nationale des Sciences de l\'Informatique',
//                 abbreviation: 'ENSI',
//                 location: 'Manouba'
//             },
//             {
//                 id: 'I002',
//                 name: 'Institut Supérieur de Comptabilité et d\'Administration des Entreprises',
//                 abbreviation: 'ISCAE',
//                 location: 'Manouba'
//             },
//             {
//                 id: 'I003',
//                 name: 'Ecole Supérieure de Commerce',
//                 abbreviation: 'ESC',
//                 location: 'Manouba'
//             },
//             {
//                 id: 'I004',
//                 name: 'Institut Supérieur des Arts Multimédia de la Manouba',
//                 abbreviation: 'ISAMM',
//                 location: 'Manouba'
//             }
//         ]
//     },
//     {
//         id: 'U002',
//         name: 'Université de Tunis El Manar',
//         abbreviation: 'UTM',
//         location: 'Tunis',
//         institutions: [
//             {
//                 id: 'I005',
//                 name: 'Institut Préparatoire aux Eudes d\'Ingénieurs el Manar',
//                 abbreviation: 'IPEIEM',
//                 location: 'Tunis'
//             },
//             {
//                 id: 'I006',
//                 name: 'Institut Supérieur des Sciences Biologiques Appliquées de Tunis',
//                 abbreviation: 'ISSBAT',
//                 location: 'Tunis'
//             },
//             {
//                 id: 'I007',
//                 name: 'Faculté de Droit et des Sciences Politiques de Tunis',
//                 abbreviation: 'FDSPT',
//                 location: 'Tunis'
//             }
//         ]
//     }
// ];

// const ORGANIZATION_TYPES = [
//     {
//         id: '',
//         label: ''
//     }
// ];

// const ACTIVITY_DOMAINS = [
//     {
//         id: '',
//         label: ''
//     }
// ];

/*

    Student                 |       Club                    |       Sponsor
-------------------------------------------------------------------------------------------
    FirstName               |       FirstName               |       FirstName
    LastName                |       LastName                |       LastName
    Email                   |       Email                   |       Email
    Password                |       Password                |       Password

    university              |       clubName                |       organizationName
    institution             |       university              |       organizationType
                            |       institution             |       activityDomain

*/

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedProfileType: '',
            // institutions: []
        };
    }

    onProfileTypeSelection(selectedProfileType) {
        this.setState({
            selectedProfileType: selectedProfileType
        })
    }    

    confirmPassword = (rule, value, callback) => {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('Password')) {
            callback('Password is not confirmed');
        }
        callback();
    }

    // onUniversitySelectionChange = (universityId) => {
    //     const university = UNIVERSITIES.find((university) => university.id === universityId);
    //     if (university) {
    //         this.setState({
    //             institutions: university.institutions
    //         });
    //         const { resetFields } = this.props.form;
    //         resetFields('institution');
    //     }
    // }

    onSignUp = (event) => {
        event.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                const user = {
                    Role: this.state.selectedProfileType,
                    FirstName: values.FirstName,
                    LastName: values.LastName,
                    Email: values.Email,
                    Password: values.Password
                };
                axios.post('https://cors-anywhere.herokuapp.com/https://cluby1.herokuapp.com/api/v1/users/register', user).then(
                    () => {
                        const credentials = {
                            Email: values.Email,
                            Password: values.Password
                        };
                        axios.post('https://cors-anywhere.herokuapp.com/https://cluby1.herokuapp.com/api/v1/users/authentificate', credentials).then(
                            (response) => {
                                publishCurrentUserUpdate(response.data);
                                this.props.history.push('/');
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                            }
                        );
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
        const selectedProfileType = this.state.selectedProfileType;
        // const universities = UNIVERSITIES.slice(0);
        // const institutions = this.state.institutions;
        // const organizationTypes = ORGANIZATION_TYPES.slice(0);
        // const activityDomains = ACTIVITY_DOMAINS.slice(0);
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        return (
            <div className="two-columns-container">
                <div className="column left-column">
                    <div className="website-layout-column-content-container">
                        <h1>Students events and clubs platform</h1>
                    </div>
                </div>
                <div className="column right-column">
                    <div className="website-layout-column-content-container">
                        {
                            selectedProfileType.length <= 0 && 
                            <>
                                <h2>You are?</h2>
                                <Button className="btn-secondary-outlined" block onClick={() => this.onProfileTypeSelection('Student')}>Student</Button>
                                <Button className="btn-secondary-outlined" block onClick={() => this.onProfileTypeSelection('Club')}>Club</Button>
                                <Button className="btn-secondary-outlined" block onClick={() => this.onProfileTypeSelection('Sponsor')}>Sponsor</Button>
                            </>
                        }
                        {
                            selectedProfileType.length > 0 && 
                            <>
                                <h2>Create your account</h2>
                                <Form layout="vertical" onSubmit={this.onSignUp}>
                                    <Form.Item validateStatus={(isFieldTouched('FirstName') && getFieldError('FirstName')) ? 'error' : ''} help={(isFieldTouched('FirstName') && getFieldError('FirstName')) || ''}>
                                    {
                                        getFieldDecorator(
                                            'FirstName', 
                                            {
                                                rules: [
                                                    { required: true, whitespace: true, message: 'This field is required' }
                                                ]
                                            }
                                        )(
                                            <Input placeholder="First name" />,
                                        )
                                    }
                                    </Form.Item>
                                    <Form.Item validateStatus={(isFieldTouched('LastName') && getFieldError('LastName')) ? 'error' : ''} help={(isFieldTouched('LastName') && getFieldError('LastName')) || ''}>
                                    {
                                        getFieldDecorator(
                                            'LastName', 
                                            {
                                                rules: [
                                                    { required: true, whitespace: true, message: 'This field is required' }
                                                ]
                                            }
                                        )(
                                            <Input placeholder="Last name" />,
                                        )
                                    }
                                    </Form.Item>
                                    <Form.Item validateStatus={(isFieldTouched('Email') && getFieldError('Email')) ? 'error' : ''} help={(isFieldTouched('Email') && getFieldError('Email')) || ''}>
                                    {
                                        getFieldDecorator(
                                            'Email', 
                                            {
                                                rules: [
                                                    { required: true, message: 'This field is required' },
                                                    { type: 'email', message: 'Invalid email address' }
                                                ]
                                            }
                                        )(
                                            <Input placeholder="Email address" />,
                                        )
                                    }
                                    </Form.Item>
                                    <Form.Item validateStatus={(isFieldTouched('Password') && getFieldError('Password')) ? 'error' : ''} help={(isFieldTouched('Password') && getFieldError('Password')) || ''}>
                                    {
                                        getFieldDecorator(
                                            'Password', 
                                            {
                                                rules: [
                                                    { required: true, message: 'This field is required' },
                                                    { pattern: /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g, message: 'Weak password' }
                                                ]
                                            }
                                        )(
                                            <Input placeholder="Password" type="password" />,
                                        )
                                    }
                                    </Form.Item>
                                    <Form.Item validateStatus={(isFieldTouched('PasswordConfirmation') && getFieldError('PasswordConfirmation')) ? 'error' : ''} help={(isFieldTouched('PasswordConfirmation') && getFieldError('PasswordConfirmation')) || ''}>
                                    {
                                        getFieldDecorator(
                                            'PasswordConfirmation', 
                                            {
                                                rules: [
                                                    { required: true, message: 'This field is required' },
                                                    { validator: this.confirmPassword }
                                                ]
                                            }
                                        )(
                                            <Input placeholder="Password confirmation" type="password" />,
                                        )
                                    }
                                    </Form.Item>
                                    {/* {
                                        (selectedProfileType === 'Club') && 
                                        <Form.Item validateStatus={(isFieldTouched('clubName') && getFieldError('clubName')) ? 'error' : ''} help={(isFieldTouched('clubName') && getFieldError('clubName')) || ''}>
                                        {
                                            getFieldDecorator(
                                                'clubName', 
                                                {
                                                    rules: [
                                                        { required: true, whitespace: true, message: 'This field is required' }
                                                    ]
                                                }
                                            )(
                                                <Input placeholder="Club name" />,
                                            )
                                        }
                                        </Form.Item>
                                    } */}
                                    {/* {
                                        (selectedProfileType === 'Student' || selectedProfileType === 'Club') && 
                                        <>
                                            <Form.Item validateStatus={(isFieldTouched('university') && getFieldError('university')) ? 'error' : ''} help={(isFieldTouched('university') && getFieldError('university')) || ''}>
                                            {
                                                getFieldDecorator(
                                                    'university', 
                                                    {
                                                        rules: [
                                                            { required: true, whitespace: true, message: 'This field is required' }
                                                        ]
                                                    }
                                                )(
                                                    <Select
                                                        placeholder="University" 
                                                        showSearch 
                                                        optionFilterProp="children" 
                                                        filterOption={(input, option) =>
                                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                        onChange={this.onUniversitySelectionChange}
                                                    >
                                                    {
                                                        universities.map(
                                                            (university) => {
                                                                return (
                                                                    <Option key={university.id} value={university.id}>{university.name}</Option>
                                                                );
                                                            }
                                                        )
                                                    }
                                                    </Select>,
                                                )
                                            }
                                            </Form.Item>
                                            {
                                                (institutions && institutions.length > 0) && 
                                                <Form.Item validateStatus={(isFieldTouched('institution') && getFieldError('institution')) ? 'error' : ''} help={(isFieldTouched('institution') && getFieldError('institution')) || ''}>
                                                {
                                                    getFieldDecorator(
                                                        'institution', 
                                                        {
                                                            rules: [
                                                                { required: true, whitespace: true, message: 'This field is required' }
                                                            ]
                                                        }
                                                    )(
                                                        <Select
                                                            placeholder="Institution" 
                                                            showSearch 
                                                            optionFilterProp="children" 
                                                            filterOption={(input, option) =>
                                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                            }
                                                        >
                                                        {
                                                            institutions.map(
                                                                (institution) => {
                                                                    return (
                                                                        <Option key={institution.id} value={institution.id}>{institution.name}</Option>
                                                                    );
                                                                }
                                                            )
                                                        }
                                                        </Select>,
                                                    )
                                                }
                                                </Form.Item>
                                            }
                                        </>
                                    } */}
                                    {/* {
                                        (selectedProfileType === 'Sponsor') && 
                                        <>
                                            <Form.Item validateStatus={(isFieldTouched('organizationName') && getFieldError('organizationName')) ? 'error' : ''} help={(isFieldTouched('organizationName') && getFieldError('organizationName')) || ''}>
                                            {
                                                getFieldDecorator(
                                                    'organizationName', 
                                                    {
                                                        rules: [
                                                            { required: true, whitespace: true, message: 'This field is required' }
                                                        ]
                                                    }
                                                )(
                                                    <Input placeholder="Organization name" />,
                                                )
                                            }
                                            </Form.Item>
                                            <Form.Item validateStatus={(isFieldTouched('organizationType') && getFieldError('organizationType')) ? 'error' : ''} help={(isFieldTouched('organizationType') && getFieldError('organizationType')) || ''}>
                                            {
                                                getFieldDecorator(
                                                    'organizationType', 
                                                    {
                                                        rules: [
                                                            { required: true, whitespace: true, message: 'This field is required' }
                                                        ]
                                                    }
                                                )(
                                                    <Select
                                                        placeholder="Organization type" 
                                                        showSearch 
                                                        optionFilterProp="children" 
                                                        filterOption={(input, option) =>
                                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                    {
                                                        organizationTypes.map(
                                                            (organizationType) => {
                                                                return (
                                                                    <Option key={organizationType.id} value={organizationType.id}>{organizationType.label}</Option>
                                                                );
                                                            }
                                                        )
                                                    }
                                                    </Select>,
                                                )
                                            }
                                            </Form.Item>
                                            <Form.Item validateStatus={(isFieldTouched('activityDomain') && getFieldError('activityDomain')) ? 'error' : ''} help={(isFieldTouched('activityDomain') && getFieldError('activityDomain')) || ''}>
                                            {
                                                getFieldDecorator(
                                                    'activityDomain', 
                                                    {
                                                        rules: [
                                                            { required: true, whitespace: true, message: 'This field is required' }
                                                        ]
                                                    }
                                                )(
                                                    <Select
                                                        placeholder="Activity domain" 
                                                        showSearch 
                                                        optionFilterProp="children" 
                                                        filterOption={(input, option) =>
                                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                    {
                                                        activityDomains.map(
                                                            (activityDomain) => {
                                                                return (
                                                                    <Option key={activityDomain.id} value={activityDomain.id}>{activityDomain.label}</Option>
                                                                );
                                                            }
                                                        )
                                                    }
                                                    </Select>,
                                                )
                                            }
                                            </Form.Item>
                                        </>
                                    } */}
                                    <Form.Item>
                                        <Button className="btn-secondary-solid" block htmlType="submit" disabled={hasErrors(getFieldsError())}>Sign up</Button>
                                    </Form.Item>
                                </Form>
                            </>
                        }
                    </div>
                </div>
            </div>
        )
    }

}
