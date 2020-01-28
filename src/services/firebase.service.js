import firebase from 'firebase';
import { firebaseConfig } from '../const';

export const uploadEventCover= async (file) => {
    var blob = new Blob([file], { type: "image/jpeg" });
    firebase.initializeApp(firebaseConfig);
    const ref = firebase.storage().ref('/events/');
    const name = (new Date().valueOf()) + '-' + file.name;
    return await ref.child(name).put(blob);
}