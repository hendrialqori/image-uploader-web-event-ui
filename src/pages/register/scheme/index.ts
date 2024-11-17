import { z } from "zod";

export const registerScheme = z.object({
    username: z.string().min(6, { message: "Require 6 characters(s)" })
        .max(20, { message: "Max only 20 character(s)" })
        .regex(/^\S*$/, { message: "Whitespace not allowed" }),
    password: z.string().min(6, { message: "Require 6 characters(s)" })
        .max(225, { message: "Max only 225 character(s)" }),
    confirmPassword: z.string()
})

export type RegisterSchemeType = z.infer<typeof registerScheme>