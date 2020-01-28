import axios from "axios";
import { BASE_URL } from "../const";

export const getAllClubs = async () => {
    return await axios.get(BASE_URL + '/api/v1/clubs');
}
export const getClubById = async (id) => {
    return await axios.get(BASE_URL + 'api/v1/clubs/' + id);
}
export const getClubByUserId = (id)=>{
    return axios.get(BASE_URL + `api/v1/clubs/user/${id}`) ;
}
