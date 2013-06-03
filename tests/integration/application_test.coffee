emberTestModule "Application"


test "/", ->
  visit("/").then ->
    ok exists("h1:contains(Application)"), "The App title was rendered"
    ok exists("h3:contains(application#index)"), "The the index template was rendered"