import request from "supertest";
import app from "../app";
import jwt from "jsonwebtoken";

let token = "";

beforeAll(async () => {
  const response = await request(app)
    .post("/login")
    .send({ login: process.env.LOGIN, senha: process.env.PASSWORD });
  token = response.body;
});

describe("Test auth", () => {
  test("Should login", async () => {
    return request(app)
      .post("/login")
      .send({ login: process.env.LOGIN, senha: process.env.PASSWORD })
      .expect(200);
  });
  test("Should login test", async () => {
    return request(app)
      .get("/login")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
  test("Should fail login, incorrect password", async () => {
    return request(app)
      .post("/login")
      .send({ login: process.env.LOGIN, senha: "123" })
      .expect(401);
  });
  test("Should fail login, user doesn't exist", async () => {
    return request(app)
      .post("/login")
      .send({ login: "wrong_login", senha: process.env.PASSWORD })
      .expect(401);
  });
  test("Should fail authorization, empty token", async () => {
    return request(app).get("/login").expect(401);
  });
  test("Should fail authorization, invalid token ", async () => {
    const token = jwt.sign({ sub: "wrong_user" }, process.env.JWT_SECRET!, {
      expiresIn: "8h",
      issuer: "todo.local",
    });
    return request(app)
      .get("/login")
      .set("Authorization", `Bearer ${token}`)
      .expect(401);
  });
  test("Should fail authorization, expired token ", async () => {
    const token = jwt.sign({ sub: process.env.LOGIN }, process.env.JWT_SECRET!, {
      expiresIn: "0s",
      issuer: "todo.local",
    });
    return request(app)
      .get("/login")
      .set("Authorization", `Bearer ${token}`)
      .expect(401);
  });
});
