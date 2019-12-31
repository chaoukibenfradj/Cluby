import React, { Component } from 'react';

import { Form, Input, Button } from 'antd';

import './sign-in.scss';


export default class SignIn extends Component {

    render() {
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
                        <Form layout="vertical">
                            <Form.Item>
                                <Input placeholder="Email address" />
                            </Form.Item>
                            <Form.Item>
                                <Input placeholder="Password" />
                            </Form.Item>
                            <Form.Item>
                                <Button className="btn-secondary-solid" block>Sign in</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }

}
