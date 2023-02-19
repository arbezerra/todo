import { Request, Response } from "express";
import Card from "../models/card";

export default class Controller {
  static validate(payload: any, properties: string[]){
    for (const property of properties) {
      if (!payload[property].trim()) {
        return "Algum campo obrigatório vazio.";
      }
    }
    return null
  }
}
