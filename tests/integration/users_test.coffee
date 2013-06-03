emberTestModule "Users"


test "/users", ->
  visit("/users").then ->
    ok exists("h1:contains(Users)"), "The users title was rendered"
    ok exists("h3:contains(users#index)"), "The users index template was rendered"

