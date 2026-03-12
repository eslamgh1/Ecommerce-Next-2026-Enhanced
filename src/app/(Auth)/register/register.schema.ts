
import * as zod from "zod";

// zod.object : create object schema called schema or any name you want
export const schema = zod.object({
    name: zod
        .string()
        .min(5, "name must be at least 5 characters.")
        .max(32, "name must be at most 32 characters."),
    email: zod
        .email("Email isn't valid"),
    password: zod
        .string()
        .nonempty("Password is required")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one uppercase letter, one number and one special character"),
    rePassword: zod
        .string(),
    phone: zod
        .string()
        .nonempty("Phone is required")
        .regex(/^\d{11}$/, "Phone must be 11 digits")

}).refine(function (object) {
    return object.password === object.rePassword
}, { path: ["rePassword"], error: "Passwords do not match" })

