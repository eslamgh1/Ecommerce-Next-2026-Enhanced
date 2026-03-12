
import * as zod from "zod";

// zod.object : create object schema called schema or any name you want
export const schema = zod.object({

    email: zod
        .email("Email isn't valid"),
    password: zod
        .string()
        .nonempty("Password is required")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one uppercase letter, one number and one special character"),


})

