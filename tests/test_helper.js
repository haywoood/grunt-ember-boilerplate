document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');
document.write('<style>#ember-testing-container { position: absolute; background: white; bottom: 0; right: 0; width: 640px; height: 384px; overflow: auto; z-index: 9999; border: 1px solid #ccc; } #ember-testing { zoom: 50%; }</style>');

require('index')
App.rootElement = '#ember-testing';
App.setupForTesting();
App.injectTestHelpers();

function exists(selector) {
  return !!find(selector).length;
}

function emberTestModule(name, testEnvironment ) {
  return module(name, $.extend(testEnvironment || {}, {
	  setup: function() {
	  	return Ember.run(App, App.advanceReadiness);
	  },
	  teardown: function() {
	    return App.reset();
	  }
  }));
}