const suggestionsRouter = require('express').Router()
const Suggestion = require('../models/suggestion.js')

suggestionsRouter.get('/', async (request, response) => {
    const user = request.user
    if (!user) {
        return response.status(401).json({ error: 'not authorized' })
    }
    const suggestions = await Suggestion.find({})
    response.json(suggestions)
})

suggestionsRouter.post('/', async (request, response) => {
    const body = request.body

    const suggestion = new Suggestion({
        word: body.word,
        translation: body.translation,
        usage: body.usage || ''
    })

    const savedSuggestion = await suggestion.save()
    response.status(201).json(savedSuggestion)
})

suggestionsRouter.delete('/:id', async (request, response) => {
    const user = request.user
    if (!user) {
        return response.status(401).json({ error: 'not authorized' })
    }

    const suggestion = await Suggestion.findById(request.params.id)
    if (!suggestion) {
        return response.status(404).json({ error: 'suggestion not found' })
    }

    await Suggestion.findByIdAndDelete(request.params.id)
    return response.status(204).end()
})

module.exports = suggestionsRouter