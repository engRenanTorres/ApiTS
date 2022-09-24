import { Server } from "http";
import request from "supertest";
import { UserBase } from "../../api/interfaces/user";
import app from "../../app";

let token:string;
let server:Server;
let userID:number;

describe("Users CRUD", () => {
  describe("Authentication", () => {
  
    beforeAll((done) => {
      done();
      server = app.listen(4000);
      
    });
  
    afterAll((done)=>{
      server.close();
      done();
      
    });
  
  
    it("should return a denied access", async () => {
        const login = {
              login: "engrtorres@outlook.com",
              password: "wrongpassword"
        }
        const response = await request(server).post("/api/users/login")
          .send(login)
          expect(response.status).toBe(412);
        
    });
  
    it("should return a token", async () => {
        const login = {
              login: "engrtorres@outlook.com",
              password: "Naribao1"
        }
        const response = await request(server)
          .post("/api/users/login")
          .send(login);
  
        token = response.body.token;
  
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
      })
    }
  );
  
  describe("User creator", () => {
  
    beforeAll((done) => {
      done();
      server = app.listen(4000);
      
    });
  
    afterAll((done)=>{
      server.close();
      done();
      }
    );
  
    it("should create a new user", async () => {
      const newUser:UserBase = {
        firstName:"Alfredo",
        familyName:"Dos Anjos",
        email: "alfredim@outlook.com",
        password: "123456",
        login: "alfsantos",
        hierarchy:0
      }
      const response = await request(server)
        .post("/api/users")
        .send(newUser)
        .set('Authorization', `Bearer ${token}`);
  
      expect(response.body.success).toBe(1);
      expect(response.body.data.affectedRows).toBe(1);
    });

    it("should not create an existing user", async () => {
      const newUser:UserBase = {
        firstName:"Alfredo",
        familyName:"Dos Anjos",
        email: "alfredim@outlook.com",
        password: "123456",
        login: "alfsantos",
        hierarchy:0
      }
      const response = await request(server)
        .post("/api/users")
        .send(newUser)
        .set('Authorization', `Bearer ${token}`);
  
      expect(response.body.sqlMessage)
        .toContain("Duplicate entry 'alfsantos' for key 'users.login_UNIQUE'");
    });

    it("should find the created user in bd", async () => {
      const response = await request(server)
        .get("/api/users/alfsantos")
        .set('Authorization', `Bearer ${token}`);

      userID = response.body.data.id;
      
      expect(response.body.data.first_name).toBe("Alfredo");
    });

    it("should delete an existing user", async () => {
      
      const response = await request(server)
        .delete(`/api/users`)
        .send({ id : userID })
        .set('Authorization', `Bearer ${token}`);
  
      expect(response.body.success).toBe(1);
      expect(response.body.message).toBe("User deleted successfully");
      
    });
  
  });

});

