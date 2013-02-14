Participant = require('./participant')

participants = []

for participant in ['lsdafjklsd', 'jim', 'donna', 'michael', 'ruby', 'schmidt']
  participants.push new Participant { name: participant }

$ ->
  $('.app').html tpl.participant({participants: participants})
