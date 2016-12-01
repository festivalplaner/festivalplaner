'use strict';

angular.module('FestivalPlanerAdmin')
.config(function($authProvider, jwtInterceptorProvider, Config) {
  $authProvider.github({
    url: Config.ENV.SERVER_URL + '/auth/github',
    clientId: Config.ENV.GITHUB_CLIENT_ID
  });
  jwtInterceptorProvider.tokenGetter = ['$localStorage', function () {
    return localStorage.getItem('satellizer_token');
  }];
});
