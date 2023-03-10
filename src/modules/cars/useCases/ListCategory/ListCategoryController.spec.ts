import request from "supertest";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

let connection: Connection;

describe("List Category Controller", () => {
  beforeAll(async () => {
    const password = await hash("admin", 8);
    connection = await createConnection();
    await connection.runMigrations();
    const id = uuidV4();

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXXXXXX')
      `,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to list categories", async () => {
    const responseToken = await request(app)
      .post("/session")
      .send({ email: "admin@rentx.com.br", password: "admin" });

    const { refresh_token } = responseToken.body;

    const request2 = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({ Authorization: `Bearer ${refresh_token}` });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe("Category Supertest");
    expect(response.body[0].description).toBe("Category Supertest");
  });
});
