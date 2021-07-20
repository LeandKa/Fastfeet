import * as yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User';


class SessionController{
  async loginStore(req, res) {
    const schema = yup.object().shape({
      email: yup.string().required(),
      password: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Error: 'Validation fail.' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found ' });
    } else {
      const check = await user.checkPassword(password);
      if (!check) {
        return res.status(400).json({ message: 'Password not match' });
      } else {
        const { id, name, email } = user;
        return res.status(200).json({
          id,
          name,
          email,
          token: jwt.sign(
            {
              id: id,
            },
            process.env.TOKEN_SECRET,
            { expiresIn: '7d' }
          ),
        });
      }
    }
  }
};


export default new SessionController();
