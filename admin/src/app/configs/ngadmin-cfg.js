'use strict';

angular.module('FestivalPlanerAdmin')
.config(function(NgAdminConfigurationProvider, Config) {
  var nga = NgAdminConfigurationProvider;
  // create an admin application
  var admin = nga.application('Festival Planer Admin')
      .baseApiUrl(Config.ENV.SERVER_URL + '/');

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
});
