const { User } = require("../../models/user");
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");
require("dotenv").config();

describe("auth middleware", () => {
  let OLD_ENV;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });
  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });
  OLD_ENV = process.env;
  it("should populate req.user with the payload of valid JWT", () => {
    const user = {
      _id: mongoose.Types.ObjectId().toString(),
      isAdmin: true,
    };
    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();
    auth(req, res, next);
    expect(req.user).toMatchObject(user);
  });
});
