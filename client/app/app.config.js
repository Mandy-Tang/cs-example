'use strict';

var apiConfig = window.apiConfig || {};

apiConfig.API_ROOT= '/api/v1';

apiConfig.USERS = apiConfig.API_ROOT + '/users';
apiConfig.USER = apiConfig.API_ROOT + '/user';

// Get the roles list
apiConfig.ROLES = apiConfig.API_ROOT + '/roles';

window.apiConfig = apiConfig;
