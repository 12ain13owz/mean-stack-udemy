const { z } = require("zod");

const body = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const userValidate = z.object({
  body: body,
});

module.exports = userValidate;
