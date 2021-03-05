import app from './src/app.js';
import { logger } from './src/utils/logger.js';

const PORT = app.get('port');

app.listen(PORT, () => {
    logger.success(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
