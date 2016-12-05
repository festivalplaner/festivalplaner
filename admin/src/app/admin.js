angular.module('FestivalPlanerAdmin', ['ng-admin', 'angular-jwt', 'satellizer'])
.constant('Config', {
  ENV: {
    'SERVER_URL': 'http://localhost:3001',
    'GITHUB_CLIENT_ID': 'd18c2369e262ab59c975'
  }
});
