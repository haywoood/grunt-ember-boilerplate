module("Application", {
  setup: function() {
    Ember.run(App, App.advanceReadiness);
  },
  teardown: function() {
    App.reset();
  }
});

test("/", function() {
  visit("/").then(function() {
    ok(exists("h1:contains(Application)"), "The App title was rendered");
    ok(exists("h3:contains(application#index)"), "The the index template was rendered");
  });
});
