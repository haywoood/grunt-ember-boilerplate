App = require './app'

App.Router.map ->
  @route 'index', { path: '/' }
  @resource 'users', { path: 'users' }, ->
    @route 'index', { path: '/' }
