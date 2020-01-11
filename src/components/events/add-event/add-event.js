import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon, Upload } from 'antd';

const { Option } = Select;

class AddEvent extends Component {



    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div>
                <Button className="btn-secondary-solid" onClick={this.showDrawer}>
                    <Icon type="plus" /> New event
        </Button>
                <Drawer
                    title="Create a new event"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Name">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Please enter event name' }],
                                    })(<Input placeholder="Please enter event name" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="DateTime">
                                    {getFieldDecorator('dateTime', {
                                        rules: [{ required: true, message: 'Please choose the dateTime' }],
                                    })(
                                        <DatePicker.RangePicker
                                            style={{ width: '100%' }}
                                            getPopupContainer={trigger => trigger.parentNode}
                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Price">
                                    {getFieldDecorator('price', {
                                        rules: [{ required: true, message: 'Please enter event price' }],
                                    })(<Input placeholder="Please enter event price" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Domain">
                                    {getFieldDecorator('domain', {
                                        rules: [{ required: true, message: 'Please enter event domain' }],
                                    })(<Select placeholder="Please enter event domain">
                                        <Option value="xiao">it</Option>
                                        <Option value="mao">marketing</Option>
                                        <Option value="xiao">music</Option>

                                    </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Institute">
                                    {getFieldDecorator('institute', {
                                        rules: [{ required: true, message: 'Please select an institute' }],
                                    })(
                                        <Select placeholder="Please select an institute">
                                            <Option value="xiao">isamm</Option>
                                            <Option value="mao">ensi</Option>
                                            <Option value="mao">ensen</Option>
                                            <Option value="mao">esc</Option>
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Location">
                                    {getFieldDecorator('location', {
                                        rules: [{ required: true, message: 'Please select a location' }],
                                    })(
                                        <Select placeholder="Please select an institute">
                                            <Option value="xiao">isamm</Option>
                                            <Option value="mao">ensi</Option>
                                            <Option value="mao">ensen</Option>
                                            <Option value="mao">esc</Option>
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>

                                <Form.Item label="Upload picture" >
                                    {getFieldDecorator('upload', {
                                        valuePropName: 'fileList',
                                        getValueFromEvent: this.normFile,
                                    })(
                                        <Upload name="logo" action="/upload.do" listType="picture">
                                            <Button>
                                                <Icon type="upload" /> Click to upload
                            </Button>
                                        </Upload>,
                                    )}
                                </Form.Item>

                            </Col>



                        </Row>

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="Description">
                                    {getFieldDecorator('description', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'please enter url description',
                                            },
                                        ],
                                    })(<Input.TextArea rows={4} placeholder="please enter url description" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                            Cancel
            </Button>
                        <Button onClick={this.onClose} className="btn-secondary-solid">
                            Submit
            </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}
export default Form.create()(AddEvent);