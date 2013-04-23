test("Homepage should say Application", function() {
  shouldHaveElement('body', 'Application');
});

test("navigating to /users shows the header on the users template", function() {
  navigateTo('users', function() {
    shouldHaveElement('h1', 'Users');
  });
  test("navigating to /users renders the content on the users/index template", function() {
    navigateTo('users', function() {
      shouldHaveElement('h2', 'users#index');
    });
  })
});


test("navigating to the homepage renders the index template", function() {
  navigateTo('/', function() {
    shouldHaveElement('h3', 'application#index')
  });
})

