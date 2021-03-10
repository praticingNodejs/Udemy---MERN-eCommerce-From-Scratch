import { logger } from '../utils/logger.js';
import createErrors from 'http-errors';

export const notFound = (_req, _res, next) => next(createErrors(404));

export const errorHandler = (err, req, res, _next) => {
    logger.fail(err.message);
    logger.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : '';

    res.status(err.status || 500).send({ state: false, msg: err.stack });
};
