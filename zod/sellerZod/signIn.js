const zod = require("zod");

const signIn = zod
  .object({
    email: zod.email().optional(),
    username: zod.string().optional(),
    phoneNo: zod.number().optional(),
    password: zod.string().min(6),
  })
  .refine(
    (data) => {
      // Count how many identifiers are provided
      const provided = [data.email, data.username, data.phoneNo].filter(Boolean);
      return provided.length === 1;
    },
    {
      message: "You must provide exactly one of email, username, or phoneNo.",
      path: ["identifier"], // virtual field for cleaner error message
    }
  );



module.exports = signIn;