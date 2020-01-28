import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon, Upload, Calendar, Modal, Badge } from 'antd';
import moment from 'moment';
import { addEvent, getAllEvents, getEventById } from '../../../services/event.service';
import { getAllInstitutes } from '../../../services/institute.service';
import { getAllDomains } from '../../../services/domain.service';
import { uploadEventCover } from '../../../services/firebase.service';
import './add-event.scss';

const { Option } = Select;

function hasErrors(fieldsError) {
    console.log(fieldsError);
    console.log("Error=>", Object.keys(fieldsError).some(field => fieldsError[field]));
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddEvent extends Component {

    constructor(props) {
        super(props);
        console.log("Add Event props :",props);
        this.state = {
            visible: false,
            clubId: localStorage.getItem('clubId'),
            listInstitutes: [],
            eventsInSameDate: [],
            isUpdate: (this.props.isUpdate && this.props.isUpdate==='true') ? true:false,
            listEvents: [],
            listDomains: [],
            selectedEvent : {},
            isLoading: false
        };
    }

    componentDidMount() {
        if(this.props.isUpdate){
            getEventById(this.props.eventId)
            .then(data=>{
                this.setState({
                    selectedEvent : data.data
                })
                console.log("Update component for event " , this.state.selectedEvent );
                this.props.form.setFieldsValue({
                    
                })
            }).catch(err=>{
                console.log('Error', err);
            });
        }
        getAllInstitutes().then(data => {
            this.setState({ listInstitutes: data.data })
        }).catch(err => {
            console.log(err);
        })
        this.setState({
            listDomains: getAllDomains()
        })
        getAllEvents().then(data => {
            console.log('List Events => ', data);
            this.setState({ listEvents: data.data });
        }).catch(err => {
            console.log(err);
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
                            this.setState({
                                visible: false,
                                isLoading: false,
                            });
                        }).catch(err => {
                            console.log(err);
                        });
                    }).catch(err => {
                        console.log(err);
                    })
            }
        });
    };

    checkEventsSameDate() {
        console.log("Check events in the same date");
        this.props.form.validateFields((errors, values) => {
            console.log("Selected date :", moment(values.dateTime[0]).toISOString());
            let eventsInSameDate = this.state.listEvents.filter(element => {
                return moment(element.beginDate).format('DD/MM/YYYY') === moment(values.dateTime[0]).format('DD/MM/YYYY')
            });
            this.setState({ eventsInSameDate: eventsInSameDate });
        })
    }

    dateCellRender(listEvents, value) {
        const listData = listEvents.filter(element => {
            return moment(element.beginDate).format('DD/MM/YYYY') === moment(value).format('DD/MM/YYYY')
        });
        console.log("Data cell rendrer", value);
        console.log(listData.length);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.id}>
                        <Badge status="warning" text={item.name} />
                    </li>
                ))}
            </ul>
        );
    }

    openCalendar() {
        Modal.confirm({
            icon:'',
            title:'Event Calendar Briefing',
            width: '70vw',
            content: (
                <div>
                    <Calendar fullscreen={false} mode="month" dateCellRender={(value) => { return this.dateCellRender(this.state.listEvents, value) }} />
                </div>
            ),
            onOk() {
            },
            onCancel() {
            },
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div>
                <Button style={{ float: 'right', right:'5.5%' }} className="btn-secondary-solid" onClick={this.showDrawer}>
                    {(this.state.isUpdate) 
                    ? <div><Icon type="edit" /> Update Event</div>
                    : 
                    <div><Icon type="plus" /> New Event</div>
                    }
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
                                    {getFieldDecorator('name',{
                                        rules: [{ required: true, whitespace: true, message: 'Please enter the event name' }],
                                    }
                                    )(<Input disabled={this.state.isLoading} placeholder="Event name" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item validateStatus={(isFieldTouched('dateTime') && getFieldError('dateTime')) ? 'error' : ''} help={(isFieldTouched('dateTime') && getFieldError('dateTime')) || ''} label={
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>Date</span>
                                        <span style={{ color: '#ff4d4f', fontSize: 'smaller' }}>
                                            <a onClick={() => { this.openCalendar() }}>
                                                {this.state.eventsInSameDate.length} events in the same date
                                            </a>
                                        </span>
                                    </div>
                                }>
                                    {getFieldDecorator('dateTime', {
                                        rules: [{ required: true, message: 'Please choose the dateTime' }],
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
                                            onOk={() => { this.checkEventsSameDate() }}
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