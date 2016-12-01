'use strict';

angular.module('FestivalPlanerAdmin')
.controller('LoginController', function($auth) {
  var vm = this;
  vm.authenticate = function(provider) {
    $auth.authenticate(provider);
  };
  vm.logout = function() {
    localStorage.removeItem('satellizer_token');
  };
  vm.loggedIn = $auth.isAuthenticated();

});
