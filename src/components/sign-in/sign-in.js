import React, { Component } from 'react';

import { Form, Input, Button } from 'antd';

import axios from 'axios';

import './sign-in.scss';
import { publishCurrentUserUpdate } from '../app/app.js';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


export default class SignIn extends Component {

    componentDidMount() {
        this.props.form.validateFields();
    }

    onSignIn = (event) => {
        event.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                axios.post('https://cors-anywhere.herokuapp.com/https://cluby1.herokuapp.com/api/v1/users/authentificate', values).then(
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
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const emailError = isFieldTouched('Email') && getFieldError('Email');
        const passwordError = isFieldTouched('Password') && getFieldError('Password');

        return (
            <div className="two-columns-container">
                <div className="column left-column">
                    <div className="website-layout-column-content-container">
                        <h1>Students events and clubs platform</h1>
                    </div>
                </div>
                <div className="column right-column">
                    <div className="website-layout-column-content-container">
                        <h2>Sign in to your account</h2>
                        <Form layout="vertical" onSubmit={this.onSignIn}>
                            <Form.Item validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
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
                            <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                            {
                                getFieldDecorator(
                                    'Password', 
                                    {
                                        rules: [{ required: true, message: 'This field is required' }]
                                    }
                                )(
                                    <Input placeholder="Password" type="password" />,
                                )
                            }
                            </Form.Item>
                            <Form.Item>
                                <Button className="btn-secondary-solid" block htmlType="submit" disabled={hasErrors(getFieldsError())}>Sign in</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }

}
