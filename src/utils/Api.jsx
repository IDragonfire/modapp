import JsonApi from 'devour-client';
import axios from 'axios';

import Config from './Config.jsx';

const apiUrl = Config.getApiBaseUrl();
let jsonApi = new JsonApi({
    apiUrl: `${apiUrl}/data`,
    pluralize: false
});

jsonApi.define('avatar', {
    tooltip: '',
    url: ''
});


export default {
    json() {
        return jsonApi;
    }
};
