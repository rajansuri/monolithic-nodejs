const request = require("supertest");

const server = require("../index");

beforeAll((done) => done());
afterAll((done) => {
  server.close();
  done();
});

describe("Auth Service Tests", () => {
  it("Check if token size Less than 3 characters", async () => {
    const res = await request(server).get("/auth").set({ Authorization: "as" });
    expect(res.statusCode).toBe(401);
  });

  it("Check if token size Greater than 6 characters", async () => {
    const res = await request(server)
      .get("/auth")
      .set({ Authorization: "asdfghjk" });
    expect(res.statusCode).toBe(401);
  });

  it("Check for valid token response", async () => {
    const res = await request(server)
      .get("/auth")
      .set({ Authorization: "asdf" });
    expect(res.statusCode).toBe(200);
  });

  it("Check Health Api", async () => {
    const res = await request(server).get("/");
    expect(res.statusCode).toBe(200);
  });
});
