let count = [];

export default function info(req, res) {
  const b = req.body.status;
  count.push(req.body.name)
  res.status(200).json('Info is here' + b + ' ' + count);
}