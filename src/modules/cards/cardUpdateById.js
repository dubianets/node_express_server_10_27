import Cards from './Model';

export default function cardUpdateById(req, res) {
  const cardId = req.params.cardId;

  delete req.body.password;

  Cards.updateOne({ _id: cardId }, req.body)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Card update error');
    });
}
