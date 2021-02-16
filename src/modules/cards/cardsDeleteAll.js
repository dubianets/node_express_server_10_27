import Cards from './Model';

export default function cardsDeleteAll(req, res) {
  Cards.deleteMany()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Cards delete all error');
    });
}
