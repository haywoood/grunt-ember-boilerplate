App = require './app'

App.Router.map ->
  @resource 'users', { path: 'users' }, ->
    @route 'index', { path: '/' }
