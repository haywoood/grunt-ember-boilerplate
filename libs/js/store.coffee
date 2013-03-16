App = require './app'

##
# Sample, works with rails JSON Serializers
##
#
# serializer = DS.JSONSerializer.create()
#
# serializer.configure 'App.User',
#   sideloadAs: 'users'
# 
# 
# RestAdapter = DS.RESTAdapter.extend
#   serializer: serializer
# 
# RestAdapter.configure('plurals',
#   reply: 'replies'
# 
# 
# App.store = DS.Store.extend(
#   adapter: RestAdapter,
#   revision: 12
# ).create()
