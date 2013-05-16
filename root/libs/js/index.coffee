## This file is your main application file
## You will require all parts of your application here

window.App = require './app'

require './store'

##
# Sample setup
##

# App.ThreadEditController = require('./controllers/thread/edit_controller')
# App.ThreadIndexController = require('./controllers/thread/index_controller')
# App.ThreadNewController = require('./controllers/thread/new_controller')
#
# App.User = require('./models/user')
#
# App.ThreadEditRoute = require('./routes/thread/edit_route')
# App.ThreadIndexRoute = require('./routes/thread/index_route')
# App.ThreadNewRoute = require('./routes/thread/new_route')

require('./routes')
