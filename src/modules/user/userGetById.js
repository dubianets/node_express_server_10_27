import User from './Model';

export default function userGetById(req, res) {
  const userId = req.params.userId;
  //const email = get(req, 'body.email', '').trim().toLowerCase();

  User.findById(userId)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('User get all error');
    });
}
