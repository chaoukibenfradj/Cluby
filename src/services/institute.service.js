import axios from 'axios' ; 
import { BASE_URL } from '../const';

export const getAllInstitutes = async ()=>{
    return await axios.get(BASE_URL + '/api/v1/institutes') ;
}