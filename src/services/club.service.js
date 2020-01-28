import axios from "axios";
import { BASE_URL } from "../const";

export const getClubByUserId = (id)=>{
    return axios.get(BASE_URL + `api/v1/clubs/user/${id}`) ;
}