import * as z from "zod";

const AlienSchema = z
    .object({
        name: z.string().min(1),
        tech: z.string().min(1),
        age: z.number().gte(0),
        sub: z.boolean().default(false)
    })
    .strict();

export { AlienSchema };
