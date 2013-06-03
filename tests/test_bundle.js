emberTestModule("Application");

test("/", function() {
  return visit("/").then(function() {
    ok(exists("h1:contains(Application)"), "The App title was rendered");
    return ok(exists("h3:contains(application#index)"), "The the index template was rendered");
  });
});

emberTestModule("Users");

test("/users", function() {
  return visit("/users").then(function() {
    ok(exists("h1:contains(Users)"), "The users title was rendered");
    return ok(exists("h3:contains(users#index)"), "The users index template was rendered");
  });
});
