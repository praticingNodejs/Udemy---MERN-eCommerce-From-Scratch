import { notFound, errorHandler } from './error-handler.js';
import morgan from 'morgan';

export default (app) => {
    app.use(notFound);
    app.use(errorHandler);
}
