import supertest from "supertest";
import express from "express";
import { Auth } from "../src/api/middleware/auth";

const app = express();
app.use(Auth);

describe("This is a TRYME test case!", () => {
  it("should pass the test :)", () => {
    expect(true).toBe(true);
  });
});

describe("Authenticating a user", () => {
  it("should return a 401 status code when unauthenticated", async () => {
    await supertest(app).get("http://localhost:8000/user/test").expect(401);
  });
});
