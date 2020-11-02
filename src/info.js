export default function info(req, res) {
  const a = req.body.name;
  const b = req.body.status;
  res.send('Info is here' + a + b);
}