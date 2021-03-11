import { notFound, errorHandler } from './error-handler.js';

export default (app) => {
    app.use(notFound);
    app.use(errorHandler);
}
