"use strict";

const server = require("../server");
const supertest = require("supertest");
const { db } = require("../model/index.js");

const request = supertest(server.app);
beforeAll(async () => {
  await db.sync();
  await db.models.Todos.create({ name: "test" });
});
afterAll(async () => {
  await db.drop();
});

describe("testing api for reading todo resources", () => {
  test("read todos at /todos", async () => {
    let response = await request.get("/todos");

    expect(response.body).toBeTruthy();

    expect(response.status).toBe(200);

    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(1);
  });

  test("testing for CREATE todos at /todos", async () => {
    let response = await request.post("/todos");
  });

  test("testing for UPDATE todos at /todos/:id", async () => {
    let response = await request.put(`/todos/`);
  });

  test("testing for DELEETE todos at /todos/:id", async () => {
    let response = await request.delete(`/todos/`);
  });

  test("testing for a register a user", async () => {
    let response = await request.post("/signup").send({
      username: "TekJones",
      password: "test",
    });

    expect(response.body.user.username).toEqual("TekJones");
  });

  test("testing to be able to login a user", async () => {
    let response = await request.post("/signin").auth("TekJones", "test");

    expect(response.body.user.username).toEqual("TekJones");
  });
});
