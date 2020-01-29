import React, { Component } from 'react';

import { Modal, Form, Input, Button } from 'antd';

const { TextArea } = Input;

export default class NewEmailModal extends Component {

    render() {
        const { visible, onSend, onCancel, receiverEmailAddress, form } = this.props;
        const { getFieldDecorator } = form;

        return(
            <Modal 
                visible={visible} 
                footer={null} 
                closable={false}
            >
                <Form layout="vertical">
                    <Form.Item>
                        {
                            getFieldDecorator(
                                'Receiver',
                                {
                                    initialValue: receiverEmailAddress,
                                    rules: [
                                        { required: true, message: 'This field is required' },
                                        { type: 'email', message: 'Invalid email address' }
                                    ]
                                }
                            )(
                                <Input placeholder="Receiver email address" disabled={ (receiverEmailAddress) ? true : false } />,
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator(
                                'Subject',
                                {
                                    rules: [
                                        { required: true, message: 'This field is required' }
                                    ]
                                }
                            )(
                                <Input placeholder="Subject" />,
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator(
                                'Content',
                                {
                                    rules: [
                                        { required: true, message: 'This field is required' }
                                    ]
                                }
                            )(
                                <TextArea placeholder="Content" rows={12} />,
                            )
                        }
                    </Form.Item>
                    <div className="modal-actions-container">
                        <Button className="btn-secondary-outlined" onClick={onCancel}>Cancel</Button>
                        <Button className="btn-secondary-solid" onClick={onSend}>Send</Button>
                    </div>
                </Form>
            </Modal>
        )
    }

}
