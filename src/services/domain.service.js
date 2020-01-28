import axios from 'axios';
import { BASE_URL } from '../const';

export const getAllDomains = () => {
    //return await axios.get(BASE_URL + '/api/v1/institutes') ;
    const res = [{
        "id": "5e1ee342ed89bc1bcf2783b2",
        "Name": "it"
    }]
    return res;

}
