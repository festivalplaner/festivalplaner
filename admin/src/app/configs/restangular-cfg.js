'use strict';

angular.module('FestivalPlanerAdmin')
.config(function(RestangularProvider) {
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
});
