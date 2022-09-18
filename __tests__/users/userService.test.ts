import request from "supertest";
import app from "../../app";

describe("Authentication", () => {
  let token;

  it("should return a token", async () => {
      const login = {
            email: "engrtorres@outlook.com",
            password: "Naribao1"
      }
      const response = await request(app).post("/api/users/login").send(login);

      token = response.body.token;

      expect(response.status).toBe(200);
    })
  }
);

