let counts = [];

export default function info(req, res) {
  //const b = req.body.status;
  const b = 15;
  counts.push(req.body.name)
  res.status(200).json('Info is here' + b + ' ' + counts);
}