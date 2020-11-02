// eslint-disable-next-line no-undef
import express from 'express';
import home from './home';
import info from './info';
import errorHandler from './errorHandler';
import logger from './logger';
import parseResponse from './bodyParser';
import cors from './cors';

const app = express();
const PORT = 5000;

logger(app);
parseResponse(app);
cors(app);
app.get('/', home);
app.post('/info', info);
errorHandler(app);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
