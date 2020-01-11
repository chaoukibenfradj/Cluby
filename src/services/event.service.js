import axios from "axios";
import { BASE_URL } from "../const";

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