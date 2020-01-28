import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon, Upload, InputNumber } from 'antd';
import moment from 'moment';
import { addEvent } from '../../../services/event.service';
import { getAllInstitutes } from '../../../services/institute.service';
import { getAllDomains } from '../../../services/domain.service';
import { uploadEventCover } from '../../../services/firebase.service';

const { Option } = Select;

function hasErrors(fieldsError) {
    console.log(fieldsError);
    console.log("Error=>", Object.keys(fieldsError).some(field => fieldsError[field]));
    return Object.keys(fieldsError).some(field => fieldsError[field]);

}

class AddEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            clubId: localStorage.getItem('clubId'),
            listInstitutes: [],
            listDomains: [],
            isLoading: false
        };
    }

    componentDidMount() {
        getAllInstitutes().then(data => {
            this.setState({ listInstitutes: data.data })
        }).catch(err => {
            console.log(err);
        })
        this.setState({
            listDomains: getAllDomains()
        })
    }

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

    onAddEvent = (event) => {
        this.setState({
            isLoading: true
        })
        event.preventDefault();
        console.log("Adding event");
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                uploadEventCover(values.upload[0].originFileObj)
                    .then(snapshot => snapshot.ref.getDownloadURL())
                    .then((url) => {
                        values.photo = url;
                        addEvent(values, this.state.clubId).then(data => {
                            console.log(data);
                            console.log('Added successfully');
                        }).catch(err => {
                            console.log(err);
                        });
                    }).catch(err => {
                        console.log(err);
                    })
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div>
                <Button style={{ float: 'right' }} className="btn-secondary-solid" onClick={this.showDrawer}>
                    <Icon type="plus" /> New Event
                </Button>
                <Drawer
                    title="Create a new event"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form layout="vertical" hideRequiredMark onSubmit={this.onAddEvent}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item validateStatus={(isFieldTouched('name') && getFieldError('name')) ? 'error' : ''} help={(isFieldTouched('name') && getFieldError('name')) || ''} label="Name">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, whitespace: true, message: 'Please enter the event name' }],
                                    })(<Input disabled={this.state.isLoading} placeholder="Event name" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item validateStatus={(isFieldTouched('dateTime') && getFieldError('dateTime')) ? 'error' : ''} help={(isFieldTouched('dateTime') && getFieldError('dateTime')) || ''} label="Date">
                                    {getFieldDecorator('dateTime', {
                                        rules: [{ required: true, whitespace: true, message: 'Please choose the dateTime' }],
                                    })(
                                        <DatePicker.RangePicker
                                            disabled={this.state.isLoading}
                                            style={{
                                                width: '100%',
                                            }}
                                            showTime={{ format: 'HH:mm' }}
                                            format="YYYY-MM-DD HH:mm"
                                            defaultValue={[moment(new Date().toISOString(), 'YYYY-MM-DD'), moment(new Date().toISOString(), 'YYYY-MM-DD')]}
                                            getPopupContainer={trigger => trigger.parentNode}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item validateStatus={(isFieldTouched('price') && getFieldError('price')) ? 'error' : ''} help={(isFieldTouched('price') && getFieldError('price')) || ''} label="Price" style={{ width: '15vw' }}>
                                    {getFieldDecorator('price', {
                                        rules: [{ required: true, whitespace: true, message: 'Please enter event price' }],
                                    })(<Input disabled={this.state.isLoading} min={0} placeholder="Price" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item validateStatus={(isFieldTouched('domain') && getFieldError('domain')) ? 'error' : ''} help={(isFieldTouched('domain') && getFieldError('domain')) || ''} label="Domain">
                                    {getFieldDecorator('domain', {
                                        rules: [{ required: true, whitespace: true, message: 'Please enter the event Domain' }],
                                    })(<Select disabled={this.state.isLoading} placeholder="Please enter the event Domain">
                                        {
                                            this.state.listDomains.map(element => {
                                                return (
                                                    <Option value={element.id}>{element.Name}</Option>
                                                )
                                            })
                                        }
                                    </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item validateStatus={(isFieldTouched('institute') && getFieldError('institute')) ? 'error' : ''} help={(isFieldTouched('institute') && getFieldError('institute')) || ''} label="Institute">
                                    {getFieldDecorator('institute', {
                                        rules: [{ required: true, whitespace: true, message: 'Please select an Institute' }],
                                    })(
                                        <Select disabled={this.state.isLoading} placeholder="Institute">
                                            {this.state.listInstitutes.map(element => {
                                                return (
                                                    <Option value={element.id}>{element.name}</Option>
                                                )
                                            })}
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item validateStatus={(isFieldTouched('location') && getFieldError('location')) ? 'error' : ''} help={(isFieldTouched('location') && getFieldError('location')) || ''} label="Location">
                                    {getFieldDecorator('location', {
                                        rules: [{ required: true, whitespace: true, message: 'Please select a location' }],
                                    })(
                                        <Input disabled={this.state.isLoading} placeholder="Location" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item validateStatus={(isFieldTouched('upload') && getFieldError('upload')) ? 'error' : ''} help={(isFieldTouched('upload') && getFieldError('upload')) || ''} label="Upload picture" >
                                    {getFieldDecorator('upload', {
                                        valuePropName: 'fileList',
                                        getValueFromEvent: this.normFile,
                                    })(
                                        <Upload disabled={this.state.isLoading} name="logo" listType="picture">
                                            <Button disabled={this.state.isLoading}>
                                                <Icon type="upload" /> Click to upload
                                            </Button>
                                        </Upload>,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item validateStatus={(isFieldTouched('description') && getFieldError('description')) ? 'error' : ''} help={(isFieldTouched('description') && getFieldError('description')) || ''} label="Description">
                                    {getFieldDecorator('description', {
                                        rules: [
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: 'Please enter the event description !',
                                            },
                                        ],
                                    })(<Input.TextArea disabled={this.state.isLoading} rows={4} placeholder="Description ..." />)}
                                </Form.Item>
                            </Col>
                        </Row>
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
                            <Button className="btn-secondary-solid" htmlType="submit" loading={this.state.isLoading} disabled={hasErrors(getFieldsError())}>
                                Submit
                        </Button>
                        </div>
                    </Form>
                </Drawer>
            </div>
        );
    }
}
export default Form.create()(AddEvent);