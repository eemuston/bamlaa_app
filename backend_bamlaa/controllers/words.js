const wordsRouter = require('express').Router()
const Word = require('../models/word.js')
const WordOfTheDay = require('../models/wordoftheday.js')

wordsRouter.get('/', async (request, response) => {
  const words = await Word.find({})
  response.json(words)
})

wordsRouter.get('/wordOfTheDay', async (req, res) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let wordOfTheDay = await WordOfTheDay.findOne({ date: today }).populate('wordId')

  if (wordOfTheDay && wordOfTheDay.wordId) {
    return res.json(wordOfTheDay.wordId)
  }

  const [word] = await Word.aggregate([{ $match: { usage: { $exists: true, $ne: '' } } }, { $sample: { size: 1 } }])
  if (!word) {
    return res.status(404).json({ error: 'word not found' })
  }

  await WordOfTheDay.findOneAndUpdate(
    { date: today },
    { wordId: word._id, date: today },
    { upsert: true }
  )

  res.json(word)
})

wordsRouter.get('/:id', async (request, response) => {
  const word = await Word.findById(request.params.id)
  if (!word) {
    return response.status(404).json({error: 'word not found'})
  }
  response.json(word)
})

wordsRouter.post('/', async (request, response) => {
    const user = request.user
    if (!user) {
        return response.status(401).json({ error: 'not authorized' })
    }
    const body = request.body

    const word = new Word({
        word: body.word,
        translation: body.translation,
        usage: body.usage || ''
    })

    const savedWord = await word.save()
    response.status(201).json(savedWord)
})

wordsRouter.delete('/:id', async (request, response) => {
    const user = request.user
    if (!user) {
        return response.status(401).json({ error: 'not authorized' })
    }

    const word = await Word.findById(request.params.id)
    if (!word) {
        return response.status(404).json({ error: 'word not found' })
    }

    await Word.findByIdAndDelete(request.params.id)
    return response.status(204).end()
})


module.exports = wordsRouter