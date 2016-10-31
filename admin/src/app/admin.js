angular.module('FestivalPlanerAdmin', ['ng-admin', 'angular-jwt', 'satellizer'])
.constant('Config', {
  ENV: {
    'SERVER_URL': 'http://localhost:3001',
    'GITHUB_CLIENT_ID': 'd18c2369e262ab59c975'
  }
})
.config(['RestangularProvider', function(RestangularProvider) {
  RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
    if (operation == 'getList') {
      var sortPrefix = params._sortDir == 'DESC' ? '-' : '';
      params.sort = sortPrefix + params._sortField;
      params.offset = (params._page - 1) * params._perPage;
      params.limit = params._perPage;

      delete params._page;
      delete params._sortField;
      delete params._sortDir;
      delete params._perPage;
    }
    return { params: params };
  });
  RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
    if (operation == 'getList') {
      // loading count the hacky way while waiting for https://github.com/mgonto/restangular/issues/1153
      var request = new XMLHttpRequest();
      request.open('GET', url + '/count', false);
      request.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('satellizer_token'));
      request.send(null);
      if (request.status === 200) {
        response.totalCount = JSON.parse(request.responseText).count;
      }
    }
    return data;
  });
}])
.config(['$authProvider', 'jwtInterceptorProvider', 'Config', function($authProvider, jwtInterceptorProvider, Config) {
  $authProvider.github({
    url: Config.ENV.SERVER_URL + '/auth/github',
    clientId: Config.ENV.GITHUB_CLIENT_ID
  });
  jwtInterceptorProvider.tokenGetter = ['$localStorage', function () {
    return localStorage.getItem('satellizer_token');
  }];
}])
.config(['NgAdminConfigurationProvider', '$authProvider', 'jwtInterceptorProvider', 'Config', function(NgAdminConfigurationProvider, $authProvider, jwtInterceptorProvider, Config) {
  var nga = NgAdminConfigurationProvider;
  // create an admin application
  var admin = nga.application('Festival Planer Admin')
      .baseApiUrl('http://localhost:3001/');

  // artist service
  var artists = nga.entity('artist')
    .identifier(nga.field('_id'));
  artists.listView()
    .fields([
      nga.field('_id'),
      nga.field('name', 'string'),
      nga.field('url'),
      nga.field('text'),
   ]);
   admin.addEntity(artists);

  // users service
  var users = nga.entity('users')
    .identifier(nga.field('_id'));
  users.listView()
    .perPage(10)
    .fields([
      nga.field('_id'),
    ])
    .listActions(['show', 'edit', 'delete']);
  users.creationView()
    .fields([
      nga.field('githubId')
    ]);
  users.editionView()
    .fields([
      nga.field('githubId')
    ]);
  users.showView()
    .fields([
      nga.field('_id'),
      users.editionView().fields()
    ]);
  admin.addEntity(users);

  // attach the admin application to the DOM and run it
  nga.configure(admin);
}])
.controller('LoginCtrl', function($scope, $auth) {

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider);
  };
  $scope.logout = function() {
    localStorage.removeItem('satellizer_token');
  };
  $scope.loggedIn = $auth.isAuthenticated();

});
