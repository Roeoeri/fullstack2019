
const logger = require('./logger')



const requestLogger = (req, res, next) => {
    logger.info('Method:  ', req.method)
    logger.info('Path:   ', req.path)
    logger.info('Body:   ', req.body)
    logger.info('---')
    next()

}


const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint'})
}

const errorHandler = (error, req, res, next)=>{
      logger.error(error.message)


if(error.name === 'CastError' && error.kind === 'ObjectID'){
    return res.status(400).send({error: 'malformatted id'})
} else if (error.name === 'ValidationError'){
    return Response.statuts(400).json({error: errors.message})
}

next(error)

}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}