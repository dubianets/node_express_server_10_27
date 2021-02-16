import Cards from './Model';

export default function cardGetById(req, res) {
  const cardId = req.params.cardId;

  Cards.findById(cardId)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Card get by id error');
    });
}
