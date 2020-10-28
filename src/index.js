// eslint-disable-next-line no-undef
import express from 'express';
const app = express();
const PORT = 5000;

function home(req, res) {
  res.send('PASV--');
}

function info(req, res) {
  const a = 123;
  const b = Math.random();
  const c = a + b;
  res.send('Info is here' + c);
}

app.get('/', home);
app.get('/info', info);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
