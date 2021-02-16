export default function home(req, res) {
  res.status(200).json({ name: 'Vadim', age: 5 });
}
