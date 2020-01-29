export const BASE_URL = 'https://cors-any-chaouki.herokuapp.com/https://cluby1.herokuapp.com/';
export const firebaseConfig = {
    apiKey: "AIzaSyAM78zG2ciOXV0a4CexJCcyvMGLCyDzLWs",
    authDomain: "platedetectorproject.firebaseapp.com",
    databaseURL: "https://platedetectorproject.firebaseio.com",
    projectId: "platedetectorproject",
    storageBucket: "platedetectorproject.appspot.com",
    messagingSenderId: "824986743444",
    appId: "1:824986743444:web:4a85c0f9a3b30f0072ba81"
};

export function checkChangedValues(obj1, obj2) {
    const result = {};
    if (Object.is(obj1, obj2)) {
        return undefined;
    }
    if (!obj2 || typeof obj2 !== 'object') {
        return obj2;
    }
    Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
        if(obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
            result[key] = obj2[key];
        }
        if(typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
            const value = checkChangedValues(obj1[key], obj2[key]);
            if (value !== undefined) {
                result[key] = value;
            }
        }
    });
    return result;
}