// eslint-disable-next-line no-undef
import express from 'express';
import home from './home';
import info from './info';
import errorHandler from './errorHandler';

const app = express();
const PORT = 5000;

app.get('/', home);
app.get('/info', info);

errorHandler(app);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
