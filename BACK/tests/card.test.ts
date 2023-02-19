import request from "supertest";
import app from "../app";
import Card from "../models/card";

let token = "";
const card = {
  id: "4bb8de52-ce35-439f-8a0b-aae214b4a24f",
  titulo: "Título",
  conteudo: "Conteúdo",
  lista: "ToDo",
};

beforeAll(async () => {
  const response = await request(app)
    .post("/login")
    .send({ login: process.env.LOGIN, senha: process.env.PASSWORD });
  token = response.body;
});

beforeEach(async () => {
  await Card.create(card);
});

afterEach(async () => {
  await Card.destroy({
    truncate: true,
  });
});

describe("Test card", () => {
  test("Should list all cards", async () => {
    return request(app)
      .get("/cards")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(1);

        expect(response.body[0].id).toBe(card.id);
        expect(response.body[0].titulo).toBe(card.titulo);
        expect(response.body[0].conteudo).toBe(card.conteudo);
        expect(response.body[0].lista).toBe(card.lista);
      });
  });

  test("Should show a specific card", async () => {
    return request(app)
      .get(`/cards/${card.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(card.id);
        expect(response.body.titulo).toBe(card.titulo);
        expect(response.body.conteudo).toBe(card.conteudo);
        expect(response.body.lista).toBe(card.lista);
      });
  });

  test("Should fail to show a card, id not found", async () => {
    return request(app)
      .get(`/cards/123`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("Should create a card", async () => {
    const newCard = {
      titulo: "Título 2",
      conteudo: "Conteúdo 2",
      lista: "ToDo",
    }

    return request(app)
      .post("/cards")
      .set("Authorization", `Bearer ${token}`)
      .send(newCard)
      .expect(201)
      .then((response) => {
        expect(response.body.titulo).toBe(newCard.titulo);
        expect(response.body.conteudo).toBe(newCard.conteudo);
        expect(response.body.lista).toBe(newCard.lista);
      });
  });

  test("Should fail to create a card, empty property", async () => {
    const newCard = {
      titulo: "",
      conteudo: "Conteúdo",
      lista: "ToDo",
    }

    return request(app)
      .post("/cards")
      .set("Authorization", `Bearer ${token}`)
      .send(newCard)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe("Algum campo obrigatório vazio.");
      });
  });

  test("Should update a card", async () => {
    const createdCard = await Card.create({
      titulo: "Título 2",
      conteudo: "Conteúdo 2",
      lista: "ToDo",
    })

    const newData = {
      titulo: "Novo Título",
      conteudo: "Novo Conteúdo",
      lista: "Doing",
    }

    return request(app)
      .put(`/cards/${createdCard.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newData)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(createdCard.id);
        expect(response.body.titulo).toBe(newData.titulo);
        expect(response.body.conteudo).toBe(newData.conteudo);
        expect(response.body.lista).toBe(newData.lista);
      });
  });

  test("Should fail to update a card, not found", async () => {
    const newData = {
      titulo: "Novo Título",
      conteudo: "Novo Conteúdo",
      lista: "Doing",
    }

    return request(app)
      .put(`/cards/123`)
      .set("Authorization", `Bearer ${token}`)
      .send(newData)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Card não encontrado.");
      });
  });

  test("Should fail to update a card, empty property", async () => {
    const createdCard = await Card.create({
      titulo: "Título 2",
      conteudo: "Conteúdo 2",
      lista: "ToDo",
    })

    const newData = {
      titulo: "",
      conteudo: "Novo Conteúdo",
      lista: "Doing",
    }

    return request(app)
      .put(`/cards/${createdCard.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newData)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe("Algum campo obrigatório vazio.");
      });
  });

  test("Should delete a card", async () => {

    return request(app)
      .delete(`/cards/${card.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(0);
      });
  });

  test("Should fail to delete a card, not found", async () => {

    return request(app)
      .delete(`/cards/123`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Card não encontrado.");
      });
  });
});
