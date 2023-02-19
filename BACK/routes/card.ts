import express, { Request, Response } from "express";
import {isAuthenticated} from "../middlewares/auth";
import {logCardUpdates} from "../middlewares/log";

import CardController from "../controllers/card";

const router = express.Router();

router.use(isAuthenticated());

router.get(
  "/",
  CardController.index
);
router.get(
  "/:id",
  CardController.show
);
router.post(
  "/",
  CardController.store
);
router.put(
  "/:id",
  logCardUpdates(),
  CardController.update
);
router.delete(
  "/:id",
  logCardUpdates(),
  CardController.delete
);

export default router;