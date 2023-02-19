import { Request, Response, NextFunction } from "express";
import { format } from "date-fns";
import Card from "../models/card";

export function logCardUpdates() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const currentTime = new Date();
    const card = await Card.findOne({where: {id: req.params.id}});

    next();
    
    if(res.statusCode === 200){
      console.log(`${format(currentTime, "dd/MM/yyyy HH:mm:ss")} - Card ${card?.id} - ${card?.titulo} - ${req.method === "PUT" ? "Alterar" : "Remover"}`);
    }
  };
}