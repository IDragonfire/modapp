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

jsonApi.define('banInfo', {
    expiresAt: '',
    reason: '',
    player: {
        jsonApi: 'hasOne',
        type: 'player'
    },
});

jsonApi.define('player', {
    login: '',
    eMail: '',
    userAgent: ''
    //Bug in Devour: https://github.com/twg/devour/issues/47
    // clanMemberships: {
    //     jsonApi: 'hasMany',
    //     type: 'clanMembership'
    // }
});


export default {
    json() {
        return jsonApi;
    }
};
