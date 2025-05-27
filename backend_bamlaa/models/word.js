const mongoose = require('mongoose')

const wordSchema = mongoose.Schema({
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

wordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Word = mongoose.model('Word', wordSchema)

module.exports = Word