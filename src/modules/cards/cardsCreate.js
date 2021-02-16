import Cards from './Model';

export default function cardsCreate(req, res) {
  const newCards = new Cards({
    title: req.body.title,
    status: req.body.status,
    description: req.body.description,
    priority: req.body.priority,
  });

  newCards
    .save()
    .then(() => {
      res.status(200).json('Card created');
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Card not created');
    })
    .finally(() => {
      console.log('End');
    });
}
