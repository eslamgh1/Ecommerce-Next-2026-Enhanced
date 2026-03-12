import * as zod from "zod";
import { schema } from "./register.schema";

export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

// To long story shot:
// export type RegisterFormType = zod.infer<typeof schema>;

