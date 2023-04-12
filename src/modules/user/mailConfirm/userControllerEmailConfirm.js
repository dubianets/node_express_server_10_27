import User from '../Model';
import message from '../../utils/messages';
// This controller confirms email.
// 1. It changes "emailConfirmation.confirmed: false" to "emailConfirmation.confirmed: true" in the DB

const userEmailConfirm = (req, res) => {
  const { userId, hash } = req.params;

  User.findById(userId)
    .select('+emailConfirmation.hash')
    .exec()
    .then((user) => {
      if (user) {
        if (user.emailConfirmation.hash === hash) {
          // Receiving data to send a notification
          const email = user.email;

          // It updates the user and sends a notification to the email
          setUserEmailConfirmed(req, res, userId, email);
        } else {
          const reason = 'Invalid hash';
          const analyticsId = {
            req,
            user: userId,
            reason,
          };

          res.status(400).json(message.fail('Email not confirmed', analyticsId));
        }
      } else {
        const reason = 'User not found';
        const analyticsId = {
          reason,
          hash,
          req,
        };

        res.status(400).json(message.fail(reason, analyticsId));
      }
    })
    .catch((error) => {
      const analyticsId = {
        error,
        req,
        hash: hash,
        controller: 'userEmailConfirm',
      };

      res.status(400).json(message.fail('Email not confirmed', analyticsId));
    });
};
export default userEmailConfirm;
function setUserEmailConfirmed(req, res, userId, email) {
  let updateBody = { 'emailConfirmation.confirmed': true };

  return User.updateOne({ _id: userId }, { $set: updateBody }, { runValidators: true })
    .exec()
    .then((user) => {
      if (user.n) {
        res.status(200).json(message.success('Email confirmed. Success'));
      } else {
        const reason = 'User not found';
        const analyticsId = {
          reason,
          req,
        };
        res.status(400).json(message.fail(analyticsId));
      }
    })
    .catch((error) => {
      //
      const analyticsId = {
        error,
        req,
        controller: 'userEmailConfirm',
      };

      res.status(400).json(message.fail('Email not confirmed', analyticsId));
    });
}
