'use strict';

var apiConfig = window.apiConfig || {};

apiConfig.API_ROOT= '/api/v1';

apiConfig.USERS = apiConfig.API_ROOT + '/users';
apiConfig.USER = apiConfig.API_ROOT + '/user';

window.apiConfig = apiConfig;
