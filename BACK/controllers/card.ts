import { Request, Response } from "express";
import Card from "../models/card";
import Controller from "./controller";

export default class CardController extends Controller {
  static async index(req: Request, res: Response) {
    try {
      const cards = await Card.findAll();
      return res.status(200).json(cards);
    } catch (e) /* istanbul ignore next */{
      console.error(e);
      return res.status(500).json({ message: "Ocorreu um erro inesperado." });
    }
  }
  static async show(req: Request, res: Response) {
    try {
      const card = await Card.findOne({
        where: { id: req.params.id },
      });
      if (!card) {
        return res.status(404).json({ message: "Card não encontrado" });
      }
      return res.status(200).json(card);
    } catch (e) /* istanbul ignore next */ {
      console.error(e);
      return res.status(500).json({ message: "Ocorreu um erro inesperado." });
    }
  }
  static async store(req: Request, res: Response) {
    try {
      const payload = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        lista: req.body.lista,
      };

      if (CardController.validate(payload, ["titulo", "conteudo", "lista"])) {
        return res
          .status(400)
          .json({ message: "Algum campo obrigatório vazio." });
      }

      const card = await Card.create(payload);
      return res.status(201).json(card);
    } catch (e) /* istanbul ignore next */ {
      console.error(e);
      return res.status(500).json({ message: "Ocorreu um erro inesperado." });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const payload = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        lista: req.body.lista,
      };

      if (CardController.validate(payload, ["titulo", "conteudo", "lista"])) {
        return res
          .status(400)
          .json({ message: "Algum campo obrigatório vazio." });
      }

      const [rows] = await Card.update(payload, {
        where: { id: req.params.id },
      });

      if (rows === 0) {
        return res.status(404).json({ message: "Card não encontrado." });
      }

      return CardController.show(req, res);
    } catch (e) /* istanbul ignore next */ {
      console.error(e);
      return res.status(500).json({ message: "Ocorreu um erro inesperado." });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const rows = await Card.destroy({
        where: { id: req.params.id },
      });

      if (rows === 0) {
        return res.status(404).json({ message: "Card não encontrado." });
      }
      
      return CardController.index(req, res);
    } catch (e) /* istanbul ignore next */ {
      console.error(e);
      return res.status(500).json({ message: "Ocorreu um erro inesperado." });
    }
  }
}
