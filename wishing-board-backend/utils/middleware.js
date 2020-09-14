const logger = require('./logger')

const unknownEnpoint = (req, res) => {
	res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: 'missing title or content' })
	}

	logger.error(error.message)
	next(error)
}

module.exports = { unknownEnpoint, errorHandler }