module("Users", {
  setup: function() {
    Ember.run(App, App.advanceReadiness);
  },
  teardown: function() {
    App.reset();
  }
});

test("/users", function() {
  visit("/users").then(function() {
    ok(exists("h1:contains(Users)"), "The users title was rendered");
    ok(exists("h3:contains(users#index)"), "The users index template was rendered");
  });
});
