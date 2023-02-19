import express, {Request, Response} from "express";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import AuthController from "../controllers/auth";

const router = express.Router();

passport.use(
  new Strategy(
    {
      secretOrKey: process.env.JWT_SECRET! ,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: "todo.local",
    },
    AuthController.verify_jwt
  )
);

router.post("/", AuthController.login);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    res.status(200).json({ message: "ok" });
  }
);

export default router;