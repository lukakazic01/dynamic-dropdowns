import axios from 'axios';

// For the purposes of easier testing, this is here, but on real project I would put this inside .env
const http = axios.create({
    baseURL: 'https://new.api.nexusautotransport.com'
});

http.defaults.headers.common['Accept'] = 'application/json';
http.defaults.headers.common['Content-Type'] = 'application/json';

export default http;