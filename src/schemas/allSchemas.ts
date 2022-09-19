import { userSchema, newUserSchema } from "./userSchema";
import { testSchema } from "./testSchema";

export default {
  signup: newUserSchema,
  signin: userSchema,
  newTest: testSchema,
};
