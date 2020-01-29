import axios from "axios";
import { BASE_URL } from "../const";
import moment from 'moment';

export const getAllEvents = async () => {
    return await axios.get(BASE_URL + 'api/v1/events');
}

export const getEventById = async (id) => {
    return await axios.get(BASE_URL + 'api/v1/events/' + id);
}

export const studentCancelParticipation = async (eventId, userId) => {
    return await axios.delete(BASE_URL + 'api/v1/events/participate', {
        data: { eventId: eventId, userId: userId },
        headers: {
            'Content-Type': 'application/json',
        }
    }
    );
}

export const addStudentParticipation = async (eventId, userId) => {
    return await axios.post(BASE_URL + 'api/v1/events/participate', { eventId: eventId, userId: userId });
}

export const addEvent = async (values, clubId) => {
    const body = {
        Name: values.name,
        BeginDate: moment(values.dateTime[0]).toISOString(),
        EndDate: moment(values.dateTime[1]).toISOString(),
        price: values.price,
        Photo: values.photo,
        Description: values.description,
        Location: values.location,
        Domain: values.domain,
        Club: clubId,
        Institute: values.institute,
        NumberParticipation: Number(values.NumberParticipation)
    }
    console.log("Add Body", body);
    return await axios.post(BASE_URL + 'api/v1/events', body);
}

export const updateEvent = async (values, eventId) => {
    const body = {
        Id : eventId,
        Name: values.name,
        BeginDate: moment(values.dateTime[0]).toISOString(),
        EndDate: moment(values.dateTime[1]).toISOString(),
        price: values.price,
        Photo: values.photo,
        Description: values.description,
        Location: values.location,
        Domain: values.domain,
        Institute: values.institute,
        NumberParticipation: Number(values.NumberParticipation)
    }
    console.log("body for update : ",body);
    return await axios.put(BASE_URL + 'api/v1/events', body);
}

export const getEventByClubId = async (id) => {
    return await axios.get(BASE_URL + `api/v1/events/club/${id}`)
}

export const getListParticipators = async (idEvent) => {
    return await axios.get(BASE_URL + `api/v1/events/participationEvent/${idEvent}`);
}

export const deleteEvent = async (idEvent) =>{
    return await axios.delete(BASE_URL + `api/v1/events/${idEvent}`);
}