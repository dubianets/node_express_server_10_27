import Cards from './Model';

export default function cardDeleteById(req, res) {
  const cardId = req.params.cardId;

  Cards.deleteOne({ _id: cardId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Card delete error');
    });
}
