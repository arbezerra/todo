import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { VerifiedCallback } from "passport-jwt";
import { verify, hash } from "../lib/hash";

interface User {
  login: string;
  password: string;
}

export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
    const user: User = {
      login: process.env.LOGIN!,
      password: await hash(process.env.PASSWORD!),
    }
    try {
      if (user.login === req.body.login && await verify(req.body.senha, user.password!)) {
        req.login(user, { session: false }, (err) => {
          /* istanbul ignore next */
          if (err) return next(err);
          const token = jwt.sign(
            { sub: user.login },
            process.env.JWT_SECRET!,
            {
              expiresIn: "8h",
              issuer: "todo.local"
            }
          );
          return res.json(token);
        });
      } else {
        return res.status(401).json({ message: "Email e/ou senha inválidos" });
      }
    } catch (e) /* istanbul ignore next */ {
      console.error(e);
      return res.status(500).json({ message: "Ocorreu um erro inesperado." });
    }
  },
  verify_jwt: async (jwt: any, done: VerifiedCallback) => {
    try {
      const user: User = {
        login: process.env.LOGIN!,
        password: await hash(process.env.PASSWORD!),
      }
      if (user.login !== jwt.sub) {
        return done(null, false);
      }
      done(null, user);
    } catch (e) /* istanbul ignore next */ {
      return done(e, false);
    }
  },
};