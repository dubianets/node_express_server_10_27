// eslint-disable-next-line no-undef
import express from 'express';
import errorHandler from './modules/core/errorHandler';
import logger from './modules/core/logger';
import parseResponse from './modules/core/bodyParser';
import cors from './modules/core/cors';
import routes from './modules/core/routes';
import dbConnect from './modules/core/db';

const app = express();
const PORT = 5000;

dbConnect();
logger(app);
parseResponse(app);
cors(app);
routes(app);
// app.get('/', home);
// app.post('/info', info);
errorHandler(app);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
