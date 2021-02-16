import Cards from './Model';

export default function cardsGetAll(req, res) {
  Cards.find()
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Cards get all error');
    });
}
