function apiNotFound(req, res) {
  res.status(400).send('API not Found');
}

export default function errorHandler(app) {
  app.use(apiNotFound);
};