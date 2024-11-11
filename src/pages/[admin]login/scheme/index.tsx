import { z } from "zod";

export const loginScheme = z.object({
    username: z.string().min(1, { message: "Required" })
        .max(20, { message: "Max only 20 character(s)" })
        .regex(/^\S*$/, { message: "Whitespace not allowed" }),
    password: z.string().min(1, { message: "Required" }).max(225, { message: "Max only 225 character(s)" })
})

export type LoginSchemeType = z.infer<typeof loginScheme>