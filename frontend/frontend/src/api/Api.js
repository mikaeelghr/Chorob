import axios from 'axios';
import {baseURL} from '../Env'
// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: 'http://localhost:8086'
});

// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
instance.defaults.headers.common['Content-Type'] =  'application/json;charset=UTF-8';
// instance.defaults.headers.common['Bypass-Tunnel-Reminder'] = 'Bypass-Tunnel-Reminder';


// Also add/ configure interceptors && all the other cool stuff
// instance.interceptors.request...

export default instance;