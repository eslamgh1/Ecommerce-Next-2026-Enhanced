import * as zod from "zod";
import { schema } from "./login.schema";

export type LoginFormType = {

  email: string;
  password: string;

}
// To long story shot:
// export type RegisterFormType = zod.infer<typeof schema>;

