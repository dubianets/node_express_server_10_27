// eslint-disable-next-line no-undef
import express from 'express';
const app = express();
const PORT = 5000;

app.get('/', home);
app.get('/info', info);
app.use(apiNotFound);

function home(req, res) {
  res.status(200).json({ name: 'Vadim dyrak', age: 5 });
}

function info(req, res) {
  const a = 123;
  const b = Math.random();
  const c = a + b;
  res.send('Info is here' + c);
}

function apiNotFound(req, res) {
  res.status(400).send('API not Found');
}

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
