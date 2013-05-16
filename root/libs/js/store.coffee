serializer = DS.JSONSerializer.create()

RestAdapter = DS.RESTAdapter.extend
  serializer: serializer

Store = DS.Store.extend
  adapter: RestAdapter,
  revision: 12

module.exports = Store
