'use strict';

angular.module('FestivalPlanerAdmin')
.config(function(NgAdminConfigurationProvider, Config) {
  var nga = NgAdminConfigurationProvider;
  // create an admin application
  var admin = nga.application('Festival Planer Admin')
      .baseApiUrl(Config.ENV.SERVER_URL + '/');

    // users service
  var users = nga.entity('users')
    .identifier(nga.field('_id'));
  users.listView()
    .perPage(10)
    .fields([
      nga.field('_id'),
      nga.field('github.username').label('GitHub')
    ])
    .listActions(['show', 'edit', 'delete']);
  users.creationView()
    .fields([
      nga.field('githubId')
    ]);
  users.editionView()
    .fields([
      nga.field('active', 'boolean').validation({ required: true }).label('Active?'),
      nga.field('admin', 'boolean').validation({ required: true }).label('Admin?'),
      nga.field('github.id').editable(false).label('GitHub ID'),
      nga.field('github.username').editable(false).label('GitHub Username'),
      nga.field('github.url').editable(false).label('GitHub URL')
    ]);
  users.showView()
    .fields([
      nga.field('_id'),
      users.editionView().fields()
    ]);
  admin.addEntity(users);

// artist service
  var artists = nga.entity('artists')
    .identifier(nga.field('_id'));
  artists.listView()
    .fields([
      nga.field('_id'),
      nga.field('name', 'string'),
      nga.field('url'),
      nga.field('text'),
   ]);
   admin.addEntity(artists);

  // attach the admin application to the DOM and run it
  nga.configure(admin);
});
