const request = require("supertest");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");
let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await server.close();
    // await Genre.remove({});
  });
  describe("GET /", () => {
    it("shout return all genres", async () => {
      // await Genre.collection.insertMany([
      //   { name: "genre1" },
      //   { name: "genre2" },
      // ]);

      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      // await Genre.remove({});
      // expect(res.body.length).toBe(2);
    });
  });
  describe("GET /:id", () => {
    it("should return a genre if pass valid id", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
    });

    it("should return 404 vi invalid id", async () => {
      const res = await request(server).get("/api/genres/1");
      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    it("should return 401 if user not logging in", async () => {
      const res = await request(server)
        .post("/api/genres")
        .send({ name: "genre1" });

      expect(res.status).toBe(401);
    });

    it("should return 400 user log in send invalid genre less than 5 characters ", async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .post("/api/genres")
        .set("x-token-auth", token)
        .send({ name: "1234" });

      expect(res.status).toBe(400);
    });

    it("should return 400 user log in send invalid genre greate than 50 characters ", async () => {
      const token = new User().generateAuthToken();
      const name = new Array(52).join("a");
      const res = await request(server)
        .post("/api/genres")
        .set("x-token-auth", token)
        .send({ name: name });

      expect(res.status).toBe(400);
    });

    it("should save genre if genra valid ", async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .post("/api/genres")
        .set("x-token-auth", token)
        .send({ name: "romantic" });

      const genre = await Genre.find({ name: "romantic" });
      expect(genre).not.toBeNull();
    });

    it("should return genre if genra valid ", async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .post("/api/genres")
        .set("x-token-auth", token)
        .send({ name: "romantic" });

      expect(res.body).toMatchObject({ name: "romantic" });
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "romantic");
    });
  });
});
