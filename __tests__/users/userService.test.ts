import { Server } from "http";
import request from "supertest";
import app from "../../app";

 describe("Authentication", () => {

  let server:Server;
  beforeAll((done) => {
    done();
    server = app.listen(4000);
    
  })

  afterAll((done)=>{
    server.close();
    done();
    }
  ) 

  let token;

  it("should return a denied access", async () => {
      const login = {
            email: "engrtorres@outlook.com",
            password: "wrongpassword"
      }
      const response = await request(server).post("/api/users/login")
      .send(login)
      expect(response.status).toBe(412);
      
  });

  it("should return a token", async () => {
      const login = {
            email: "engrtorres@outlook.com",
            password: "Naribao1"
      }
      const response = await request(server).post("/api/users/login").send(login);

      token = response.body.token;

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    })
  }
  );

