import app from './src/app.js';
import { success } from './src/utils/log-message.js';

const PORT = app.get('port');

app.listen(PORT, () => {
    const message = success(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
    console.log(message);
});
