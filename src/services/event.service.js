import axios from "axios";
import { BASE_URL } from "../const";

export const getAllEvents = async () => {
    return await axios.get(BASE_URL + 'api/v1/events');
}

export const getEventById = async (id) => {
    return await axios.get(BASE_URL + 'api/v1/events/' + id);
}