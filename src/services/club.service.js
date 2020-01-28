import axios from "axios";
import { BASE_URL } from "../const";

export const getAllClubs = async () => {
    return await axios.get(BASE_URL + '/api/v1/clubs');
}

