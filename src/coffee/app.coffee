Participant = require('./participant')

participant = new Participant
  name: 'LSDAFJKLSD'

$ ->
  $('.app').html JST['participant.hbs']({participant: participant})
