const mongoose = require('mongoose')

const WordOfTheDaySchema = new mongoose.Schema({
  wordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Word' },
  date: { type: Date, required: true },
})

WordOfTheDaySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const WordOfTheDay = mongoose.model('WordOfTheDay', WordOfTheDaySchema)

module.exports = WordOfTheDay