import 'dotenv/config';
import { PassportStatic } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import User from '../models/User';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.KEY,
};

export const passportStatic = (passport: PassportStatic) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.uId);
        if (user) {
          done(null, { uId: user.id, email: user.email });
        } else {
          done(null, false);
        }
      } catch (e) {
        done(e, false);
      }
    }),
  );
};
