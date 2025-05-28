const wordsRouter = require('express').Router()
const Word = require('../models/word.js')

wordsRouter.get('/', async (request, response) => {
  const words = await Word.find({})
  response.json(words)
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