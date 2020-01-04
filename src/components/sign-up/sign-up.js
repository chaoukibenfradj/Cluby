import React, { Component } from 'react';

import { Form, Input, Button, Select } from 'antd';

import './sign-up.scss';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const { Option } = Select;

const UNIVERSITIES = [
    {
        id: 'U001',
        name: 'Université de la Manouba',
        abbreviation: 'UMA',
        location: 'Manouba',
        institutions: [
            {
                id: 'I001',
                name: 'Ecole Nationale des Sciences de l\'Informatique',
                abbreviation: 'ENSI',
                location: 'Manouba'
            },
            {
                id: 'I002',
                name: 'Institut Supérieur de Comptabilité et d\'Administration des Entreprises',
                abbreviation: 'ISCAE',
                location: 'Manouba'
            },
            {
                id: 'I003',
                name: 'Ecole Supérieure de Commerce',
                abbreviation: 'ESC',
                location: 'Manouba'
            },
            {
                id: 'I004',
                name: 'Institut Supérieur des Arts Multimédia de la Manouba',
                abbreviation: 'ISAMM',
                location: 'Manouba'
            }
        ]
    },
    {
        id: 'U002',
        name: 'Université de Tunis El Manar',
        abbreviation: 'UTM',
        location: 'Tunis',
        institutions: [
            {
                id: 'I005',
                name: 'Institut Préparatoire aux Eudes d\'Ingénieurs el Manar',
                abbreviation: 'IPEIEM',
                location: 'Tunis'
            },
            {
                id: 'I006',
                name: 'Institut Supérieur des Sciences Biologiques Appliquées de Tunis',
                abbreviation: 'ISSBAT',
                location: 'Tunis'
            },
            {
                id: 'I007',
                name: 'Faculté de Droit et des Sciences Politiques de Tunis',
                abbreviation: 'FDSPT',
                location: 'Tunis'
            }
        ]
    }
];

const ORGANIZATION_TYPES = [
    {
        id: '',
        label: ''
    }
];

const ACTIVITY_DOMAINS = [
    {
        id: '',
        label: ''
    }
];

/*

    STUDENT                 |       CLUB                    |       SPONSOR
-------------------------------------------------------------------------------------------
    firstName               |       firstName               |       firstName
    lastName                |       lastName                |       lastName
    email                   |       email                   |       email
    password                |       password                |       password
    passwordConfirmation    |       passwordConfirmation    |       passwordConfirmation

    university              |       clubName                |       organizationName
    institution             |       university              |       organizationType
                            |       institution             |       activityDomain

*/

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedProfileType: '',
            institutions: [],
            isAccountCreated: false
        };
    }

    onProfileTypeSelection(selectedProfileType) {
        this.setState({
            selectedProfileType: selectedProfileType
        })
    }    

    confirmPassword = (rule, value, callback) => {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('password')) {
            callback('Password is not confirmed');
        }
        callback();
    }

    onUniversitySelectionChange = (universityId) => {
        const university = UNIVERSITIES.find((university) => university.id === universityId);
        if (university) {
            this.setState({
                institutions: university.institutions
            });
            const { resetFields } = this.props.form;
            resetFields('institution');
        }
    }

    onSignUp = (event) => {
        event.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                this.setState({
                    isAccountCreated: true
                });
                console.log(values);
            }
        });
    }

    render() {
        const selectedProfileType = this.state.selectedProfileType;
        const isAccountCreated = this.state.isAccountCreated;
        const universities = UNIVERSITIES.slice(0);
        const institutions = this.state.institutions;
        const organizationTypes = ORGANIZATION_TYPES.slice(0);
        const activityDomains = ACTIVITY_DOMAINS.slice(0);
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
                            (selectedProfileType.length <= 0 && !isAccountCreated) && 
                            <>
                                <h2>You are?</h2>
                                <Button className="btn-secondary-outlined" block onClick={() => this.onProfileTypeSelection('STUDENT')}>Student</Button>
                                <Button className="btn-secondary-outlined" block onClick={() => this.onProfileTypeSelection('CLUB')}>Club</Button>
                                <Button className="btn-secondary-outlined" block onClick={() => this.onProfileTypeSelection('SPONSOR')}>Sponsor</Button>
                            </>
                        }
                        {
                            (selectedProfileType.length > 0 && !isAccountCreated) && 
                            <>
                                <h2>Create your account</h2>
                                <Form layout="vertical" onSubmit={this.onSignUp}>
                                    <Form.Item validateStatus={(isFieldTouched('firstName') && getFieldError('firstName')) ? 'error' : ''} help={(isFieldTouched('firstName') && getFieldError('firstName')) || ''}>
                                    {
                                        getFieldDecorator(
                                            'firstName', 
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
                                    <Form.Item validateStatus={(isFieldTouched('lastName') && getFieldError('lastName')) ? 'error' : ''} help={(isFieldTouched('lastName') && getFieldError('lastName')) || ''}>
                                    {
                                        getFieldDecorator(
                                            'lastName', 
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
                                    <Form.Item validateStatus={(isFieldTouched('email') && getFieldError('email')) ? 'error' : ''} help={(isFieldTouched('email') && getFieldError('email')) || ''}>
                                    {
                                        getFieldDecorator(
                                            'email', 
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
                                    <Form.Item validateStatus={(isFieldTouched('password') && getFieldError('password')) ? 'error' : ''} help={(isFieldTouched('password') && getFieldError('password')) || ''}>
                                    {
                                        getFieldDecorator(
                                            'password', 
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
                                    <Form.Item validateStatus={(isFieldTouched('passwordConfirmation') && getFieldError('passwordConfirmation')) ? 'error' : ''} help={(isFieldTouched('passwordConfirmation') && getFieldError('passwordConfirmation')) || ''}>
                                    {
                                        getFieldDecorator(
                                            'passwordConfirmation', 
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
                                    {
                                        (selectedProfileType === 'CLUB') && 
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
                                    }
                                    {
                                        (selectedProfileType === 'STUDENT' || selectedProfileType === 'CLUB') && 
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
                                    }
                                    {
                                        (selectedProfileType === 'SPONSOR') && 
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
                                    }
                                    <Form.Item>
                                        <Button className="btn-secondary-solid" block htmlType="submit" disabled={hasErrors(getFieldsError())}>Sign up</Button>
                                    </Form.Item>
                                </Form>
                            </>
                        }
                        { isAccountCreated && <h2>Welcome to Cluby!</h2> }
                    </div>
                </div>
            </div>
        )
    }

}
