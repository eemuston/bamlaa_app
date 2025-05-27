const mongoose = require('mongoose')

const suggestionSchema = mongoose.Schema({
  word: {
    type: String,
    minlength: 2,
    required: true,
  },
  translation: {
    type: String,
    minlength: 2,
    required: true,
  },
  usage: String
})

suggestionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Suggestion = mongoose.model('Suggestion', suggestionSchema)

module.exports = Suggestion